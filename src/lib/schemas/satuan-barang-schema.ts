import { z } from 'zod'

const SatuanBarangSchema = z.object({
	idSatuan: z.string().min(1, 'ID nama barang diperlukan!'),
	namaSatuan: z.string().min(1, 'Nama barang diperlukan!')
})

export default SatuanBarangSchema
