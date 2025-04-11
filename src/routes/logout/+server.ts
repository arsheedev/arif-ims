import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ cookies, locals }) => {
	cookies.delete('authToken', { path: '/' })
	locals.session = null

	redirect(302, '/')
}
