import KategoriBarangSchema from '$lib/schemas/kategori-barang-schema'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(KategoriBarangSchema)) }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(KategoriBarangSchema))

		if (!form.valid) {
			return fail(400, {
				form,
				message: ''
			})
		}

		const { idKategori, namaKategori } = form.data

		await db.kategoriBarang.create({ data: { idKategori, namaKategori } })

		redirect(303, '/dashboard/kategori-barang')
	}
}
