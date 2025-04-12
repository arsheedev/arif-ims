import PembelianBarangSchema from '$lib/schemas/pembelian-barang-schema'
import db from '$lib/server/db'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const id = Number(url.searchParams.get('id'))
	const pembelianBarang = await db.pembelianBarang.findUnique({ where: { id } })
	const namaBarang = await db.namaBarang.findMany()
	const supplierBarang = await db.supplierBarang.findMany()

	return {
		pembelianBarang,
		namaBarang,
		supplierBarang,
		form: await superValidate(zod(PembelianBarangSchema))
	}
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(PembelianBarangSchema))

		if (!form.valid) {
			fail(400, {
				form,
				message: ''
			})
		}

		const id = Number(event.url.searchParams.get('id'))
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

		try {
			await db.pembelianBarang.update({
				where: { id },
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
		} catch {
			fail(500, {
				form,
				message: 'Something went wrong!'
			})
		}
	}
}
