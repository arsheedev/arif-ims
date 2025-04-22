import db from '$lib/server/db'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const dateStart = new Date(String(url.searchParams.get('dateStart')))
	const dateEnd = new Date(String(url.searchParams.get('dateEnd')))

	const pemebelianBarang = await db.pembelianBarang.findMany({
		where: {
			AND: [
				{
					tanggalPembelian: { gte: dateStart }
				},
				{
					tanggalPembelian: { lte: dateEnd }
				}
			]
		}
	})

	return { pemebelianBarang }
}
