import db from '$lib/server/db'
import type { PageServerLoad } from '../../pembelian-barang/cetak/$types'

export const load: PageServerLoad = async ({ url }) => {
	const dateStart = new Date(String(url.searchParams.get('dateStart')))
	const dateEnd = new Date(String(url.searchParams.get('dateEnd')))

	const penjualanBarang = await db.penjualanBarang.findMany({
		where: {
			AND: [
				{
					tanggalPenjualan: { gte: dateStart }
				},
				{
					tanggalPenjualan: { lte: dateEnd }
				}
			]
		},
		include: {
			namaBarang: true
		}
	})

	return { penjualanBarang }
}
