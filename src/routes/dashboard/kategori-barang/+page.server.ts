import db from '$lib/server/db'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const kategoriBarang = await db.kategoriBarang.findMany()

	return { kategoriBarang }
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const id = Number(formData.get('id'))

		await db.kategoriBarang.delete({ where: { id } })

		return { message: 'Kategori barang berhasil dihapus!' }
	}
}
