import ConfirmPaymentSchema from '$lib/schemas/confirm-payment'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const id = String(url.searchParams.get('id'))
	const payment = await db.paymentReceipt.findUnique({ where: { id } })

	return { form: await superValidate(zod(ConfirmPaymentSchema)), payment }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(ConfirmPaymentSchema))

		if (!form.valid) {
			return fail(400, { form, message: '' })
		}

		const id = String(event.url.searchParams.get('id'))
		const existingPayment = await db.paymentReceipt.findUnique({ where: { id } })

		if (!existingPayment || !existingPayment.userId || !existingPayment.paymentId) {
			return fail(404, { form, message: 'Pembayaran user tidak ditemukan!' })
		}

		const { status } = form.data

		if (status !== 'DIBAYAR') {
			try {
				await db.paymentReceipt.update({ where: { id: existingPayment.id }, data: { status } })
			} catch {
				return fail(404, { form, message: 'Gagal mengedit pembayaran user!' })
			}

			redirect(303, '/admin/pembayaran-user')
		}

		try {
			await db.user.update({
				where: { id: existingPayment.userId },
				data: {
					needToPay: { disconnect: { id: existingPayment.paymentId } },
					hasPayed: { connect: { id: existingPayment.paymentId } }
				}
			})
			await db.paymentReceipt.update({
				where: { id: existingPayment.id },
				data: { status, acceptedAt: new Date(Date.now()) }
			})
		} catch {
			return fail(404, { form, message: 'Gagal mengedit pembayaran user!' })
		}

		redirect(303, '/admin/pembayaran-user')
	}
}
