import db from '$lib/server/db'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const satuanBarang = await db.satuanBarang.findMany()

	return { satuanBarang }
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const id = Number(formData.get('id'))

		await db.satuanBarang.delete({ where: { id } })

		return { message: 'Satuan barang berhasil dihapus!' }
	}
}
