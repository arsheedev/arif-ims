import KategoriBarangSchema from '$lib/schemas/kategori-barang-schema'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const id = Number(url.searchParams.get('id'))
	const kategoriBarang = await db.kategoriBarang.findUnique({ where: { id } })

	return { kategoriBarang, form: await superValidate(zod(KategoriBarangSchema)) }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(KategoriBarangSchema))

		if (!form.valid) {
			fail(400, {
				form,
				message: ''
			})
		}

		const id = Number(event.url.searchParams.get('id'))
		const { idKategori, namaKategori } = form.data

		try {
			await db.kategoriBarang.update({ where: { id }, data: { idKategori, namaKategori } })

			redirect(303, '/dashboard/kategori-barang')
		} catch {
			fail(500, {
				form,
				message: 'Something went wrong!'
			})
		}
	}
}
