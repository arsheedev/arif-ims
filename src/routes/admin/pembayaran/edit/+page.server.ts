import PaymentScehama from '$lib/schemas/payment-scema'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const id = String(url.searchParams.get('id'))
	const payment = await db.payment.findUnique({ where: { id } })

	return { form: await superValidate(zod(PaymentScehama)), payment }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(PaymentScehama))

		if (!form.valid) {
			return fail(400, { form, message: '' })
		}

		const id = String(event.url.searchParams.get('id'))
		const existingPayment = await db.payment.findUnique({ where: { id } })

		if (!existingPayment) {
			return fail(404, { form, message: 'Pembayaran tidak ditemukan!' })
		}

		const { name, price, deadline } = form.data

		try {
			await db.payment.update({
				where: { id: existingPayment.id },
				data: { name, price, deadline: new Date(deadline) }
			})
		} catch {
			return fail(400, { form, message: 'Gagal mengupdate pembayaran!' })
		}

		redirect(303, '/admin/pembayaran')
	}
}
