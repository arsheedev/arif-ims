import db from '$lib/server/db'
import { createId } from '@paralleldrive/cuid2'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import path from 'path'
import sharp from 'sharp'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const id = String(url.searchParams.get('id'))
	const payment = await db.payment.findUnique({ where: { id } })

	return { payment }
}

export const actions: Actions = {
	default: async ({ url, request, locals }) => {
		const formData = await request.formData()
		const id = String(url.searchParams.get('id'))

		const existingPayment = await db.payment.findUnique({
			where: { id }
		})

		if (!existingPayment) {
			return fail(404, { error: 'Pembayaran tidak ditemukan!' })
		}

		if (existingPayment.deadline < new Date(Date.now())) {
			return fail(400, { error: 'Pembayaran sudah kadaluarsa!' })
		}

		const file = formData.get('file') as File | undefined

		if (!(file instanceof File)) {
			return fail(400, { error: 'Format gambar tidak didukung!' })
		}

		if (file?.size === 0) {
			return fail(400, { error: 'Tolong input gambar!' })
		}

		if (!file.type.startsWith('image')) {
			return fail(400, { error: 'Format gambar tidak didukung!' })
		}

		const dirname = process.cwd()
		const fileName = createId() + file.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() + '.webp'
		const uploadData = await file.arrayBuffer()

		await sharp(uploadData)
			.webp()
			.toFile(path.join(dirname, 'files', 'images', fileName))

		await db.paymentReceipt.create({
			data: {
				imageUrl: `/files/images/${fileName}`,
				userId: locals.session?.id,
				paymentId: existingPayment.id
			}
		})

		redirect(303, '/dashboard/pembayaran/histori-pembayaran')
	}
}
