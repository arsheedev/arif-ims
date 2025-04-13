import SatuanBarangSchema from '$lib/schemas/satuan-barang-schema'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(SatuanBarangSchema)) }
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

		const { idSatuan, namaSatuan } = form.data

		try {
			await db.satuanBarang.create({ data: { idSatuan, namaSatuan } })

			redirect(303, '/dashboard/satuan-barang')
		} catch {
			fail(500, {
				form,
				message: 'Something went wrong!'
			})
		}
	}
}
