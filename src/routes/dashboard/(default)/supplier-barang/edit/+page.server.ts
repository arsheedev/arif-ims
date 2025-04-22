import SupplierBarangSchema from '$lib/schemas/supplier-barang-schema'
import db from '$lib/server/db'
import type { Actions } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { fail, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const id = Number(url.searchParams.get('id'))
	const supplierBarang = await db.supplierBarang.findUnique({ where: { id } })

	return { supplierBarang, form: await superValidate(zod(SupplierBarangSchema)) }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(SupplierBarangSchema))

		if (!form.valid) {
			return fail(400, {
				form,
				message: ''
			})
		}

		const id = Number(event.url.searchParams.get('id'))
		const existingData = await db.supplierBarang.findUnique({ where: { id } })

		if (!existingData) {
			return fail(404, {
				form,
				message: 'Data tidak ditemukan!'
			})
		}

		const { alamat, idSupplier, nama, noTelepon, email, noFax } = form.data

		await db.supplierBarang.update({
			where: { id: existingData.id },
			data: { alamat, idSupplier, nama, noTelepon, email, noFax }
		})

		redirect(303, '/dashboard/supplier-barang')
	}
}
