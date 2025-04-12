import { z } from 'zod'

const KategoriBarangSchema = z.object({
	idKategori: z.string().min(1, 'ID nama barang diperlukan!'),
	namaKategori: z.string().min(1, 'Nama barang diperlukan!')
})

export default KategoriBarangSchema
