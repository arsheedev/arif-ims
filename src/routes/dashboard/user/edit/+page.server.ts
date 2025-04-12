import RegisterUserSchema from '$lib/schemas/register-user'
import db from '$lib/server/db'
import { hash } from '@node-rs/argon2'
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const id = Number(url.searchParams.get('id'))
	const user = await db.user.findUnique({ where: { id } })

	return { form: await superValidate(zod(RegisterUserSchema)), user }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(RegisterUserSchema))

		if (!form.valid) {
			return fail(400, { form, message: '' })
		}

		const id = Number(event.url.searchParams.get('id'))

		const existingUser = await db.user.findUnique({ where: { id } })

		if (!existingUser) {
			return fail(404, { form, message: 'User tidak ditemukan' })
		}

		const { name, username, password } = form.data

		const isUserExist = await db.user.findUnique({ where: { username } })

		if (isUserExist && existingUser.username !== username) {
			return fail(400, { form, message: 'Username telah dipakai' })
		}

		try {
			if (password === 'asdfasdf') {
				await db.user.update({
					where: { id: existingUser.id },
					data: {
						name,
						username
					}
				})
			} else {
				const hashedPassword = await hash(password, {
					// recommended minimum parameters
					memoryCost: 19456,
					timeCost: 2,
					outputLen: 32,
					parallelism: 1
				})

				await db.user.update({
					where: { id: existingUser.id },
					data: {
						name,
						username,
						password: hashedPassword
					}
				})
			}
		} catch (error) {
			console.log(error)
			return fail(400, { form, message: 'Gagal mengupdate user!' })
		}

		redirect(303, '/admin/user')
	}
}
