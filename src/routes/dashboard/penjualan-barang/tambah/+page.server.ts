import PenjualanBarangSchema from '$lib/schemas/penjualan-barang-schema'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const namaBarang = await db.namaBarang.findMany()

	return { namaBarang, form: await superValidate(zod(PenjualanBarangSchema)) }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(PenjualanBarangSchema))

		if (!form.valid) {
			return fail(400, {
				form,
				message: ''
			})
		}

		const { idPenjualan, jumlah, kodeTransaksiPenjualan, namaBarangId, tanggalPenjualan } =
			form.data

		//unfinished bussiness logic keks
		await db.penjualanBarang.create({
			data: { idPenjualan, jumlah, kodeTransaksiPenjualan, namaBarangId, tanggalPenjualan }
		})

		redirect(303, '/dashboard/penjualan-barang')
	}
}
