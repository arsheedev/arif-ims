import db from '$lib/server/db'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const produk = await db.produk.findMany({
		include: { barang: true, kategori: true, satuan: true, supplier: true }
	})

	return { produk }
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const id = Number(formData.get('id'))

		await db.produk.delete({ where: { id } })

		return { message: 'Produk berhasil dihapus!' }
	}
}
