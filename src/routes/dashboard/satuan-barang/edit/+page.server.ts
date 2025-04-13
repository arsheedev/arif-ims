import SatuanBarangSchema from '$lib/schemas/satuan-barang-schema'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const id = Number(url.searchParams.get('id'))
	const satuanBarang = await db.satuanBarang.findUnique({ where: { id } })

	return { satuanBarang, form: await superValidate(zod(SatuanBarangSchema)) }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(SatuanBarangSchema))

		if (!form.valid) {
			fail(400, {
				form,
				message: ''
			})
		}

		const id = Number(event.url.searchParams.get('id'))
		const { idSatuan, namaSatuan } = form.data

		try {
			await db.satuanBarang.update({ where: { id }, data: { idSatuan, namaSatuan } })

			redirect(303, '/dashboard/satuan-barang')
		} catch {
			fail(500, {
				form,
				message: 'Something went wrong!'
			})
		}
	}
}
