import ProdukSchema from '$lib/schemas/produk-schema'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const supplierBarang = await db.supplierBarang.findMany()
	const namaBarang = await db.namaBarang.findMany()
	const kategoriBarang = await db.kategoriBarang.findMany()
	const satuanBarang = await db.satuanBarang.findMany()

	return {
		supplierBarang,
		namaBarang,
		kategoriBarang,
		satuanBarang,
		form: await superValidate(zod(ProdukSchema))
	}
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(ProdukSchema))

		if (!form.valid) {
			fail(400, {
				form,
				message: ''
			})
		}

		const {
			hargaBeli,
			hargaJual,
			idProduk,
			kategoriBarangId,
			namaBarangId,
			satuanBarangId,
			supplierBarangId,
			keterangan
		} = form.data

		try {
			await db.produk.create({
				data: {
					hargaBeli,
					hargaJual,
					idProduk,
					kategoriBarangId,
					namaBarangId,
					satuanBarangId,
					supplierBarangId,
					keterangan
				}
			})

			redirect(303, '/dashboard/produk')
		} catch {
			fail(500, {
				form,
				message: 'Something went wrong!'
			})
		}
	}
}
