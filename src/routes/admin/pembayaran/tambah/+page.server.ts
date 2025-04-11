import PaymentScehama from '$lib/schemas/payment-scema'
import db from '$lib/server/db'
import { redirect, type Actions } from '@sveltejs/kit'
import { fail, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(PaymentScehama)) }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(PaymentScehama))

		if (!form.valid) {
			return fail(400, { form, message: '' })
		}

		const { name, price, deadline } = form.data

		try {
			const users = await db.user.findMany({ where: { NOT: { role: 'ADMIN' } } })
			await db.payment.create({
				data: { name, price, deadline: new Date(deadline), userNeedToPay: { connect: users } }
			})
		} catch {
			return fail(400, { form, message: 'Gagal membuat pembayaran!' })
		}

		redirect(303, '/admin/pembayaran')
	}
}
