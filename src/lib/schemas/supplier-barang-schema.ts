import { z } from 'zod'

const SupplierBarangSchema = z.object({
	idSupplier: z.string().min(1, 'ID supplier diperlukan!'),
	nama: z.string().min(1, 'Nama supplier diperlukan!'),
	alamat: z.string().min(1, 'Alamat supplier diperlukan!'),
	noTelepon: z.string().min(1, 'NO telepon supplier diperlukan!'),
	noFax: z.string().optional(),
	email: z.string().email().optional()
})

export default SupplierBarangSchema
