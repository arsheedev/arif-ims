import db from '$lib/server/db'
import { fail, type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const isUserVerified = url.searchParams.get('verified')

	if (isUserVerified) {
		const users = await db.user.findMany({
			where: { NOT: { role: 'ADMIN' }, verified: false },
			include: { waliSantri: true }
		})

		return { users }
	}

	const users = await db.user.findMany({
		where: { NOT: { role: 'ADMIN' } },
		include: { waliSantri: true }
	})

	return { users }
}

export const actions: Actions = {
	verify: async ({ request }) => {
		const formData = await request.formData()
		const id = String(formData.get('id'))

		const existingUser = await db.user.findUnique({ where: { id } })

		if (!existingUser) {
			return fail(404, { message: 'User tidak ditemukan!' })
		}

		await db.user.update({
			where: { id: existingUser.id },
			data: { verified: !existingUser.verified }
		})

		return { message: 'User telah diverifikasi!' }
	},
	delete: async ({ request }) => {
		const formData = await request.formData()
		const id = String(formData.get('id'))

		await db.user.delete({ where: { id } })

		return { message: 'User berhasil dihapus!' }
	}
}
