import { SECRET_JWT_TOKEN } from '$env/static/private'
import { redirect, type Handle } from '@sveltejs/kit'
import jwt from 'jsonwebtoken'

export const handle: Handle = async ({ event, resolve }) => {
	const authToken = event.cookies.get('authToken')

	if (!authToken) {
		event.locals.session = null

		if (event.url.pathname.startsWith('/admin') || event.url.pathname.startsWith('/dashboard')) {
			redirect(302, `/?callback=${event.url.pathname}`)
		}

		return resolve(event)
	}

	try {
		const verified = jwt.verify(authToken, SECRET_JWT_TOKEN)

		event.locals.session = verified as { id: string; username: string; role: 'ADMIN' | 'USER' }
	} catch {
		event.locals.session = null
	}

	return resolve(event)
}
