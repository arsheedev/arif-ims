import { z } from 'zod'

const LoginUserSchema = z.object({
	username: z.string().min(1, 'Username dibutuhkan!'),
	password: z.string().min(1, 'Password dibutuhkan!')
})

export default LoginUserSchema
