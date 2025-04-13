import PembelianBarangSchema from '$lib/schemas/pembelian-barang-schema'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const namaBarang = await db.namaBarang.findMany()
	const supplierBarang = await db.supplierBarang.findMany()

	return { namaBarang, supplierBarang, form: await superValidate(zod(PembelianBarangSchema)) }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(PembelianBarangSchema))

		if (!form.valid) {
			return fail(400, {
				form,
				message: ''
			})
		}

		const {
			hargaBeli,
			hargaJual,
			idPembelian,
			jumlah,
			kodeTransaksiPembelian,
			namaBarangId,
			supplierBarangId,
			tanggalPembelian
		} = form.data

		await db.pembelianBarang.create({
			data: {
				hargaBeli,
				hargaJual,
				idPembelian,
				jumlah,
				kodeTransaksiPembelian,
				namaBarangId,
				supplierBarangId,
				tanggalPembelian
			}
		})

		redirect(303, '/dashboard/pembelian-barang')
	}
}
