import db from '$lib/server/db'
import { type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const users = await db.user.findMany({ where: { role: 'OWNER' } })

	return { users }
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const id = Number(formData.get('id'))

		await db.user.delete({ where: { id } })

		return { message: 'User berhasil dihapus!' }
	}
}
