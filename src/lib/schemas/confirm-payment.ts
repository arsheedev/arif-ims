import { z } from 'zod'

const ConfirmPaymentSchema = z.object({
	status: z.enum(['DIPROSES', 'DIBAYAR', 'GAGAL', 'DIBATALKAN'])
})

export default ConfirmPaymentSchema
