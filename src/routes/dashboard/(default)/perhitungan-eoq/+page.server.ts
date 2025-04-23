import db from '$lib/server/db'
import { fail } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const namaBarang = await db.namaBarang.findMany()
	return { namaBarang }
}

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData()
		const namaBarangId = Number(formData.get('namaBarangId'))
		const kebutuhanMax = Number(formData.get('kebutuhanMax'))
		const leadTime = Number(formData.get('leadTime'))
		const hariKerja = Number(formData.get('hariKerja'))

		if (!namaBarangId || !kebutuhanMax || !leadTime || !hariKerja) {
			return fail(400, {
				error: 'Semua field harus diisi',
				namaBarangId,
				kebutuhanMax,
				leadTime,
				hariKerja
			})
		}

		const pembelianList = await db.pembelianBarang.findMany({
			where: { namaBarangId },
			orderBy: { tanggalPembelian: 'asc' }
		})

		const penjualanList = await db.penjualanBarang.findMany({
			where: { namaBarangId },
			orderBy: { tanggalPenjualan: 'asc' }
		})

		if (penjualanList.length < 1 || pembelianList.length < 1) {
			return fail(400, {
				error: 'Data tidak cukup untuk perhitungan',
				namaBarangId,
				kebutuhanMax,
				leadTime,
				hariKerja
			})
		}

		const lastPembelian = pembelianList[pembelianList.length - 1]
		const biayaPesan = lastPembelian.biayaPesan || 0
		const biayaSimpan = lastPembelian.biayaSimpan || 0

		const tahunIni = new Date().getFullYear()
		const permintaanTahunan =
			penjualanList
				.filter((p) => p.tanggalPenjualan.getFullYear() === tahunIni)
				.reduce((acc, cur) => acc + cur.jumlah, 0) / 12

		const safetyStock = Math.round((kebutuhanMax * 52 * leadTime) / hariKerja)
		const reorderPoint = Math.round((kebutuhanMax / 7) * leadTime + safetyStock)
		const eoq = Math.round(Math.sqrt((2 * permintaanTahunan * biayaPesan) / biayaSimpan))

		return {
			success: true,
			namaBarangId,
			kebutuhanMax,
			leadTime,
			hariKerja,
			safetyStock,
			reorderPoint,
			eoq
		}
	}
}
