<script lang="ts">
	import { goto } from '$app/navigation'
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Form from '$lib/components/ui/form'
	import { Input } from '$lib/components/ui/input'
	import SupplierBarangSchema from '$lib/schemas/supplier-barang-schema'
	import { toast } from 'svelte-sonner'
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'

	export let data: SuperValidated<Infer<typeof SupplierBarangSchema>>
	export let message: string | undefined

	let loading = false

	const form = superForm(data, {
		validators: zodClient(SupplierBarangSchema),
		onSubmit() {
			loading = true
		},
		onResult({ result }) {
			loading = false

			if (result.type === 'failure') {
				toast.error(result.data?.message || 'Terjadi kesalahan validasi.')
			} else if (result.type === 'success') {
				toast.success('Berhasil menambahkan data!')
				goto('/dashboard/nama-barang')
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
	<Form.Field {form} name="idSupplier">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Masukan ID Supplier</Form.Label>
				<Input {...props} bind:value={$formData.idSupplier} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="nama">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Masukan Nama</Form.Label>
				<Input {...props} bind:value={$formData.nama} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="alamat">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Masukan Alamat</Form.Label>
				<Input {...props} bind:value={$formData.alamat} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="noTelepon">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Masukan Nomor Telepon</Form.Label>
				<Input {...props} bind:value={$formData.noTelepon} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="noFax">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Masukan Nomor Fax</Form.Label>
				<Input {...props} bind:value={$formData.noFax} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Masukan Email</Form.Label>
				<Input {...props} bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	{#if message}
		<p class="text-red-600">{message}</p>
	{/if}

	<div class="space-x-2 self-end pt-4">
		<a href="/dashboard/satuan-barang" class={buttonVariants({ variant: 'secondary' })}>Back</a>
		<Form.Button disabled={loading}>Submit</Form.Button>
	</div>
</form>
