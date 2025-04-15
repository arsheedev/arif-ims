import PembelianBarangSchema from '$lib/schemas/pembelian-barang-schema'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const id = Number(url.searchParams.get('id'))
	const pembelianBarang = await db.pembelianBarang.findUnique({ where: { id } })
	const namaBarang = await db.namaBarang.findMany()
	const supplierBarang = await db.supplierBarang.findMany()

	return {
		pembelianBarang,
		namaBarang,
		supplierBarang,
		form: await superValidate(zod(PembelianBarangSchema))
	}
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(PembelianBarangSchema))

		if (!form.valid) {
			return fail(400, {
				form,
				message: ''
			})
		}

		const id = Number(event.url.searchParams.get('id'))
		const existingData = await db.pembelianBarang.findUnique({ where: { id } })

		if (!existingData) {
			return fail(404, {
				form,
				message: 'Data tidak ditemukan!'
			})
		}

		const {
			idPembelian,
			jumlah,
			kodeTransaksiPembelian,
			namaBarangId,
			supplierBarangId,
			tanggalPembelian,
			biayaPesan,
			biayaSimpan
		} = form.data

		await db.pembelianBarang.update({
			where: { id: existingData.id },
			data: {
				biayaPesan,
				biayaSimpan,
				idPembelian,
				jumlah,
				kodeTransaksiPembelian,
				namaBarangId,
				supplierBarangId,
				tanggalPembelian
			}
		})

		redirect(303, '/dashboard/pembelian-barang')
	}
}
