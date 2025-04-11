import db from '$lib/server/db'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const isVerified = url.searchParams.get('verified')

	if (isVerified) {
		const payments = await db.paymentReceipt.findMany({
			where: { status: 'DIPROSES' },
			include: { User: true }
		})

		return { payments }
	}

	const payments = await db.paymentReceipt.findMany({ include: { User: true } })

	return { payments }
}
