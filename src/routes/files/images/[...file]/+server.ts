import { error, type RequestHandler } from '@sveltejs/kit'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

export const GET: RequestHandler = async ({ params, url }) => {
	const width = Number(url.searchParams.get('width')) || undefined
	const height = Number(url.searchParams.get('height')) || undefined

	const dirname = process.cwd()
	const file = fs.readFileSync(path.join(dirname, 'files', 'images', params.file as string))

	try {
		if (width || height) {
			const compresedImage = await sharp(file).resize({ width: width, height }).toBuffer()

			return new Response(compresedImage, { status: 202 })
		}

		return new Response(file, { status: 202 })
	} catch (err) {
		if (err instanceof Error) {
			throw error(400, err.message)
		}

		throw error(400, 'Unknown error occured while uploading file')
	}
}
