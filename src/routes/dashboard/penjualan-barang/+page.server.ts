import db from '$lib/server/db'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const penjualanBarang = await db.penjualanBarang.findMany({
		include: { namaBarang: true }
	})

	return { penjualanBarang }
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const id = Number(formData.get('id'))

		try {
			await db.$transaction(async (tx) => {
				await tx.penguranganStok.deleteMany({
					where: { penjualanId: id }
				})

				await tx.penjualanBarang.delete({
					where: { id }
				})
			})

			return { message: 'Penjualan barang berhasil dihapus!' }
		} catch (error) {
			console.error(error)
			return {
				error: true,
				message: 'Terjadi kesalahan saat menghapus data penjualan.'
			}
		}
	}
}
