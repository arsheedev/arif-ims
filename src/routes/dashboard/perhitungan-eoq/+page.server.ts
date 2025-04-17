import PerhitunganEoqSchema from '$lib/schemas/perhitungan-eoq-schema'
import db from '$lib/server/db'
import { fail, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const namaBarang = await db.namaBarang.findMany()

	return { namaBarang, form: superValidate(zod(PerhitunganEoqSchema)) }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(PerhitunganEoqSchema))

		if (!form.valid) {
			return fail(400, {
				form,
				message: ''
			})
		}

		const { namaBarangId } = form.data

		const pembelianList = await db.pembelianBarang.findMany({
			where: { namaBarangId },
			orderBy: { tanggalPembelian: 'asc' }
		})

		const penjualanList = await db.penjualanBarang.findMany({
			where: { namaBarangId },
			orderBy: { tanggalPenjualan: 'asc' }
		})

		if (penjualanList.length < 1 || pembelianList.length < 1) {
			throw new Error('Data tidak cukup untuk perhitungan.')
		}

		const permintaanHarian = new Map<string, number>()

		for (const p of penjualanList) {
			const tgl = p.tanggalPenjualan.toISOString().split('T')[0]
			permintaanHarian.set(tgl, (permintaanHarian.get(tgl) ?? 0) + p.jumlah)
		}

		const rataRataPermintaanHarian = Math.round(
			[...permintaanHarian.values()].reduce((a, b) => a + b, 0) / permintaanHarian.size
		)

		const maxPermintaanHarian = Math.max(...permintaanHarian.values())

		const leadTimes = pembelianList.map((pb) => {
			const now = new Date()
			const diff = Math.ceil(
				(now.getTime() - pb.tanggalPembelian.getTime()) / (1000 * 60 * 60 * 24)
			)
			return diff
		})

		const rataRataLeadTime = Math.round(leadTimes.reduce((a, b) => a + b, 0) / leadTimes.length)
		const maxLeadTime = Math.max(...leadTimes)

		const lastPembelian = pembelianList[pembelianList.length - 1]
		const biayaPesan = lastPembelian.biayaPesan
		const biayaSimpan = lastPembelian.biayaSimpan

		const tahunIni = new Date().getFullYear()
		const permintaanTahunan = penjualanList
			.filter((p) => p.tanggalPenjualan.getFullYear() === tahunIni)
			.reduce((acc, cur) => acc + cur.jumlah, 0)

		const safetyStock =
			maxPermintaanHarian * maxLeadTime - rataRataPermintaanHarian * rataRataLeadTime

		const reorderPoint = rataRataPermintaanHarian * rataRataLeadTime + safetyStock

		const eoq = Math.round(Math.sqrt((2 * permintaanTahunan * biayaPesan) / biayaSimpan))

		return {
			safetyStock,
			reorderPoint,
			eoq,
			rataRataPermintaanHarian,
			maxPermintaanHarian,
			rataRataLeadTime,
			maxLeadTime,
			permintaanTahunan
		}
	}
}
