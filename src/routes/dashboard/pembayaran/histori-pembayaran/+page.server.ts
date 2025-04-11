import db from '$lib/server/db'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const id = locals.session?.id
	const user = await db.user.findUnique({ where: { id }, include: { paymentReceipts: true } })

	return { payments: user?.paymentReceipts }
}
