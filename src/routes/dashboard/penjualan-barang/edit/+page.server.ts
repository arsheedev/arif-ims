import PenjualanBarangSchema from '$lib/schemas/penjualan-barang-schema'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const id = Number(url.searchParams.get('id'))
	const penjualanBarang = await db.penjualanBarang.findUnique({ where: { id } })
	const namaBarang = await db.namaBarang.findMany()

	return { penjualanBarang, namaBarang, form: await superValidate(zod(PenjualanBarangSchema)) }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(PenjualanBarangSchema))

		if (!form.valid) {
			return fail(400, {
				form,
				message: ''
			})
		}

		const id = Number(event.url.searchParams.get('id'))
		const existingData = await db.penjualanBarang.findUnique({ where: { id } })

		if (!existingData) {
			return fail(404, {
				form,
				message: 'Data tidak ditemukan!'
			})
		}

		const {
			idPenjualan,
			jumlah: newJumlah,
			kodeTransaksiPenjualan,
			namaBarangId,
			tanggalPenjualan
		} = form.data

		await db.penguranganStok.deleteMany({
			where: { penjualanId: existingData.id }
		})

		const pembelianList = await db.pembelianBarang.findMany({
			where: { namaBarangId },
			include: {
				PenguranganStok: true
			},
			orderBy: { tanggalPembelian: 'asc' }
		})

		const listWithRemaining = pembelianList.map((pb) => {
			const totalUsed = pb.PenguranganStok.reduce((sum, ps) => sum + ps.jumlahDiambil, 0)
			return {
				...pb,
				sisaStok: pb.jumlah - totalUsed
			}
		})

		let remaining = newJumlah
		const stokDipakai: { pembelianId: number; jumlahDiambil: number }[] = []

		for (const item of listWithRemaining) {
			if (remaining <= 0) break
			if (item.sisaStok <= 0) continue

			const jumlahDiambil = Math.min(remaining, item.sisaStok)
			stokDipakai.push({ pembelianId: item.id, jumlahDiambil })
			remaining -= jumlahDiambil
		}

		if (remaining > 0) {
			return fail(400, {
				form,
				message: 'Stok tidak mencukupi untuk update penjualan ini.'
			})
		}

		await db.$transaction(async (tx) => {
			await tx.penjualanBarang.update({
				where: { id },
				data: {
					idPenjualan,
					jumlah: newJumlah,
					kodeTransaksiPenjualan,
					namaBarangId,
					tanggalPenjualan
				}
			})

			for (const stok of stokDipakai) {
				await tx.penguranganStok.create({
					data: {
						penjualanId: id,
						pembelianId: stok.pembelianId,
						jumlahDiambil: stok.jumlahDiambil
					}
				})
			}
		})

		redirect(303, '/dashboard/penjualan-barang')
	}
}
