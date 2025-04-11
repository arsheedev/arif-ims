<script lang="ts">
	import { enhance } from '$app/forms'
	import { Button } from '$lib/components/ui/button'
	import { Input } from '$lib/components/ui/input'
	import { Label } from '$lib/components/ui/label'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { toast } from 'svelte-sonner'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	let loading = $state(false)

	const uploadImage: SubmitFunction = () => {
		loading = true

		return async ({ update, result }) => {
			loading = false

			if (result.type === 'failure') {
				// @ts-expect-error its ok the type is there keks :v
				return toast.error(result.data.error || 'Something went wrong!')
			}

			if (result.type === 'error') {
				return toast.error('Internal error!')
			}

			if (result.type === 'redirect') {
				toast.success('Silahkan hubungi admin untuk konfirmasi pembayaran!')

				return await update()
			}
		}
	}
</script>

<div class="flex w-full justify-center">
	<form method="POST" class="w-[600px]" enctype="multipart/form-data" use:enhance={uploadImage}>
		<Label for="file">Upload bukti pembayaran</Label>
		<Input
			name="file"
			id="file"
			type="file"
			aria-label="upload images"
			accept="image/*"
			disabled={loading}
		/>
		<a href="/dashboard/pembayaran/perlu-dibayar">Cancel</a>
		<Button type="submit" disabled={loading}>Submit</Button>
	</form>
</div>
