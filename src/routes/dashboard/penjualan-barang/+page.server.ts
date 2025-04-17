import db from '$lib/server/db'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const penjualanBarang = await db.penjualanBarang.findMany({
		include: { namaBarang: true }
	})

	return { penjualanBarang }
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const id = Number(formData.get('id'))

		await db.penjualanBarang.delete({ where: { id } })

		return { message: 'Pembelian barang berhasil dihapus!' }
	}
}
