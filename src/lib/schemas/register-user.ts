import { z } from 'zod'

const RegisterUserSchema = z
	.object({
		name: z.string().min(1, 'Nama diperlukan!').max(50, 'Nama tidak boleh lebih dari 50 karakter!'),
		username: z
			.string()
			.min(1, 'Username diperlukan!')
			.max(32, 'Username tidak boleh lebih dari 32 karakter!'),
		password: z.string().min(8, 'Password membutuhkan minimal 8 karakter!'),
		confirmPassword: z.string().min(8, 'Input password ulang dibutuhkan!')
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password tidak cocok!'
	})

export default RegisterUserSchema
