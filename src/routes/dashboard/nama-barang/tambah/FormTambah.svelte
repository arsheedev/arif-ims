<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Form from '$lib/components/ui/form'
	import { Input } from '$lib/components/ui/input'
	import NamaBarangSchema from '$lib/schemas/nama-barang-schema'
	import { toast } from 'svelte-sonner'
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'

	export let data: SuperValidated<Infer<typeof NamaBarangSchema>>
	export let message: string | undefined

	let loading = false

	const form = superForm(data, {
		validators: zodClient(NamaBarangSchema),
		onSubmit() {
			loading = true
		},
		onResult({ result }) {
			loading = false

			if (result.type === 'failure') {
				toast.error(result.data?.message || 'Terjadi kesalahan validasi.')
			} else if (result.type === 'redirect') {
				toast.success('Berhasil menambahkan data!')
			}
		},
		onError() {
			loading = false
			toast.error('Terjadi kesalahan internal.')
		}
	})

	const { form: formData, enhance } = form
</script>

<form
	class="flex w-[600px] flex-col rounded-lg bg-slate-100 p-4 dark:bg-slate-900"
	method="POST"
	use:enhance
>
	<Form.Field {form} name="idDaftarBarang">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Masukan ID Barang</Form.Label>
				<Input {...props} bind:value={$formData.idDaftarBarang} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="namaBarang">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Masukan Nama Barang</Form.Label>
				<Input {...props} bind:value={$formData.namaBarang} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	{#if message}
		<p class="text-red-600">{message}</p>
	{/if}

	<div class="space-x-2 self-end pt-4">
		<a href="/dashboard/nama-barang" class={buttonVariants({ variant: 'secondary' })}>Back</a>
		<Form.Button disabled={loading}>Submit</Form.Button>
	</div>
</form>
