import ProdukSchema from '$lib/schemas/produk-schema'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const id = Number(url.searchParams.get('id'))
	const produk = await db.produk.findUnique({ where: { id } })
	const supplierBarang = await db.supplierBarang.findMany()
	const namaBarang = await db.namaBarang.findMany()
	const kategoriBarang = await db.kategoriBarang.findMany()
	const satuanBarang = await db.satuanBarang.findMany()

	return {
		produk,
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
			return fail(400, {
				form,
				message: ''
			})
		}

		const id = Number(event.url.searchParams.get('id'))
		const existingData = await db.produk.findUnique({ where: { id } })

		if (!existingData) {
			return fail(404, {
				form,
				message: 'Data tidak ditemukan!'
			})
		}

		const {
			idProduk,
			kategoriBarangId,
			namaBarangId,
			satuanBarangId,
			supplierBarangId,
			keterangan
		} = form.data

		await db.produk.update({
			where: { id: existingData.id },
			data: {
				idProduk,
				kategoriBarangId,
				namaBarangId,
				satuanBarangId,
				supplierBarangId,
				keterangan
			}
		})

		redirect(303, '/dashboard/produk')
	}
}
