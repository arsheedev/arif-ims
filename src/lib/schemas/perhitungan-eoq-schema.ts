import { z } from 'zod'

const PerhitunganEoqSchema = z.object({
	namaBarangId: z.coerce.number({ message: 'ID nama barang diperlukan!' })
})

export default PerhitunganEoqSchema
