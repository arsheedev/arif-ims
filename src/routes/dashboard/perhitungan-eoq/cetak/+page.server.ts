import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	return {
		namaBarang: url.searchParams.get('namaBarang') || 'Tidak Diketahui',
		input: {
			kebutuhanMax: url.searchParams.get('kebutuhanMax') || '0',
			leadTime: url.searchParams.get('leadTime') || '0',
			hariKerja: url.searchParams.get('hariKerja') || '0'
		},
		result: {
			safetyStock: url.searchParams.get('safetyStock') || '0',
			reorderPoint: url.searchParams.get('reorderPoint') || '0',
			eoq: url.searchParams.get('eoq') || '0'
		}
	}
}
