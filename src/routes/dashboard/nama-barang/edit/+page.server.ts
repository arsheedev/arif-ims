import NamaBarangSchema from '$lib/schemas/nama-barang-schema'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const id = Number(url.searchParams.get('id'))
	const namaBarang = await db.namaBarang.findUnique({ where: { id } })

	return { namaBarang, form: await superValidate(zod(NamaBarangSchema)) }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(NamaBarangSchema))

		if (!form.valid) {
			fail(400, {
				form,
				message: ''
			})
		}

		const id = Number(event.url.searchParams.get('id'))
		const { idDaftarBarang, namaBarang } = form.data

		try {
			await db.namaBarang.update({ where: { id }, data: { idDaftarBarang, namaBarang } })

			redirect(303, '/dashboard/nama-barang')
		} catch {
			fail(500, {
				form,
				message: 'Something went wrong!'
			})
		}
	}
}
