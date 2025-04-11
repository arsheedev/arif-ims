import db from '$lib/server/db'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const id = locals.session?.id
	const user = await db.user.findUnique({
		where: { id },
		include: { needToPay: true, hasPayed: true }
	})

	return { user }
}
