import SupplierBarangSchema from '$lib/schemas/supplier-barang-schema'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(SupplierBarangSchema)) }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(SupplierBarangSchema))

		if (!form.valid) {
			fail(400, {
				form,
				message: ''
			})
		}

		const { alamat, idSupplier, nama, noTelepon, email, noFax } = form.data

		try {
			await db.supplierBarang.create({
				data: { alamat, idSupplier, nama, noTelepon, email, noFax }
			})

			redirect(303, '/dashboard/supplier-barang')
		} catch {
			fail(500, {
				form,
				message: 'Something went wrong!'
			})
		}
	}
}
