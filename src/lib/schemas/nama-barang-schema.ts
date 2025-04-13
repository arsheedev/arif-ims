import { z } from 'zod'

const NamaBarangSchema = z.object({
	idDaftarBarang: z.string().min(1, 'ID nama barang diperlukan!'),
	namaBarang: z.string().min(1, 'Nama barang diperlukan!')
})

export default NamaBarangSchema
