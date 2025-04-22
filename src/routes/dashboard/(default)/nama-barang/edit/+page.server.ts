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
			return fail(400, {
				form,
				message: ''
			})
		}

		const id = Number(event.url.searchParams.get('id'))
		const existingData = await db.namaBarang.findUnique({ where: { id } })

		if (!existingData) {
			return fail(404, {
				form,
				message: 'Data tidak ditemukan!'
			})
		}

		const { idDaftarBarang, namaBarang } = form.data

		await db.namaBarang.update({
			where: { id: existingData.id },
			data: { idDaftarBarang, namaBarang }
		})

		redirect(303, '/dashboard/nama-barang')
	}
}
