import { z } from 'zod'

const PaymentScehama = z.object({
	name: z.string().min(1, 'Nama pembayaran diperlukan!'),
	price: z.coerce.number().min(1, 'Jumlah pembayaran diperlukan!'),
	deadline: z.string().refine((v) => v, { message: 'Tanggal deadline diperlukan.' })
})

export default PaymentScehama
