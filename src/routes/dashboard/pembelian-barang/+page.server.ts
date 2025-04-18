import db from '$lib/server/db'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const pembelianBarang = await db.pembelianBarang.findMany({
		include: { namaBarang: true, supplier: true }
	})

	return { pembelianBarang }
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const id = Number(formData.get('id'))

		await db.$transaction(async (tx) => {
			await tx.penguranganStok.deleteMany({
				where: { pembelianId: id }
			})

			await tx.pembelianBarang.delete({
				where: { id }
			})
		})

		return { message: 'Pembelian barang berhasil dihapus!' }
	}
}
