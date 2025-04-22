import db from '$lib/server/db'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
	const { idDaftarBarang } = params

	const barang = await db.namaBarang.findUnique({
		where: { idDaftarBarang },
		include: {
			PembelianBarang: {
				include: {
					PenguranganStok: true,
					namaBarang: true,
					supplier: true
				},
				orderBy: {
					tanggalPembelian: 'asc'
				}
			}
		}
	})

	if (!barang) {
		throw error(404, 'Barang tidak ditemukan')
	}

	const pembelianDetails = barang.PembelianBarang.map((pembelian) => {
		const totalTerjual = pembelian.PenguranganStok.reduce((sum, ps) => sum + ps.jumlahDiambil, 0)
		const stokTersisa = pembelian.jumlah - totalTerjual

		return {
			idPembelian: pembelian.id,
			kodeTransaksi: pembelian.kodeTransaksiPembelian,
			tanggalPembuatan: pembelian.tanggalPembuatan,
			tanggalPembelian: pembelian.tanggalPembelian,
			jumlahAwal: pembelian.jumlah,
			jumlahTerjual: totalTerjual,
			stokTersisa: stokTersisa,
			biayaPesan: pembelian.biayaPesan,
			biayaSimpan: pembelian.biayaSimpan
		}
	})

	const totalStok = pembelianDetails.reduce((sum, p) => sum + p.stokTersisa, 0)
	const totalDibeli = pembelianDetails.reduce((sum, p) => sum + p.jumlahAwal, 0)
	const totalDijual = pembelianDetails.reduce((sum, p) => sum + p.jumlahTerjual, 0)

	return {
		barang: {
			idDaftarBarang: barang.idDaftarBarang,
			namaBarang: barang.namaBarang,
			stokTersisa: totalStok,
			totalStok,
			totalDibeli,
			totalDijual,
			pembelianDetails
		}
	}
}
