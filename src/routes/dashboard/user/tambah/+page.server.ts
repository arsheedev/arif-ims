import RegisterUserSchema from '$lib/schemas/register-user'
import db from '$lib/server/db'
import { hash } from '@node-rs/argon2'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(RegisterUserSchema)) }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(RegisterUserSchema))

		if (!form.valid) {
			return fail(400, {
				form,
				message: ''
			})
		}

		const { name, username, password } = form.data

		const isUserExist = await db.user.findUnique({ where: { username } })

		if (isUserExist) {
			return fail(400, { message: 'Username telah dipakai' })
		}

		const hashedPassword = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		})

		try {
			await db.user.create({
				data: {
					name,
					username,
					password: hashedPassword
				}
			})
		} catch {
			return fail(400, { message: 'Gagal mendaftarkan user!' })
		}

		redirect(303, '/')
	}
}
