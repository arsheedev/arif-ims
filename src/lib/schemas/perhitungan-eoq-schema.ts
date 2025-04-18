import { z } from 'zod'

const PerhitunganEoqSchema = z.object({
	namaBarangId: z.coerce.number({ message: 'ID nama barang diperlukan!' }),
	kebutuhanMax: z.coerce.number({ message: 'Kebutuhan max diperlukan!' }),
	leadTime: z.coerce.number({ message: 'Lead time diperlukan!' }),
	hariKerja: z.coerce.number({ message: 'Hari kerja dalam setahun diperlukan!' })
})

export default PerhitunganEoqSchema
