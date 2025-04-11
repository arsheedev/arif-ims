import db from '$lib/server/db'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const payments = await db.payment.findMany()

	return { payments }
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const id = String(formData.get('id'))

		try {
			await db.payment.delete({ where: { id } })
		} catch {
			return { message: 'Pembayaran gagal dihapus!' }
		}

		return { message: 'Pembayaran berhasil dihapus!' }
	}
}
