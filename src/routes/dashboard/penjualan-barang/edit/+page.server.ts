import PenjualanBarangSchema from '$lib/schemas/penjualan-barang-schema'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const id = Number(url.searchParams.get('id'))
	const penjualanBarang = await db.penjualanBarang.findUnique({ where: { id } })
	const namaBarang = await db.namaBarang.findMany()

	return { penjualanBarang, namaBarang, form: await superValidate(zod(PenjualanBarangSchema)) }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(PenjualanBarangSchema))

		if (!form.valid) {
			fail(400, {
				form,
				message: ''
			})
		}

		const id = Number(event.url.searchParams.get('id'))
		const { idPenjualan, jumlah, kodeTransaksiPenjualan, namaBarangId, tanggalPenjualan } =
			form.data

		try {
			//unfinished bussiness logic keks
			await db.penjualanBarang.update({
				where: { id },
				data: { idPenjualan, jumlah, kodeTransaksiPenjualan, namaBarangId, tanggalPenjualan }
			})

			redirect(303, '/dashboard/penjualan-barang')
		} catch {
			fail(500, {
				form,
				message: 'Something went wrong!'
			})
		}
	}
}
