import db from '$lib/server/db'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const supplierBarang = await db.supplierBarang.findMany()

	return { supplierBarang }
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const id = Number(formData.get('id'))

		await db.supplierBarang.delete({ where: { id } })

		return { message: 'Supplier barang berhasil dihapus!' }
	}
}
