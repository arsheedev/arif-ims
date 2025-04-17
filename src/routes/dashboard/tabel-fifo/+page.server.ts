import db from '$lib/server/db'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const namaBarangList = await db.namaBarang.findMany({
		include: {
			PembelianBarang: {
				include: {
					PenguranganStok: true
				}
			}
		}
	})

	const stokBarang = namaBarangList.map((barang) => {
		let totalDibeli = 0
		let totalDijual = 0

		for (const pembelian of barang.PembelianBarang) {
			totalDibeli += pembelian.jumlah
			const totalKurang = pembelian.PenguranganStok.reduce((sum, ps) => sum + ps.jumlahDiambil, 0)
			totalDijual += totalKurang
		}

		return {
			namaBarang: barang.namaBarang,
			idDaftarBarang: barang.idDaftarBarang,
			stokTersisa: totalDibeli - totalDijual
		}
	})

	return { stokBarang }
}
