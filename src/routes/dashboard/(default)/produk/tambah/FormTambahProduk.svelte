<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Form from '$lib/components/ui/form'
	import { Input } from '$lib/components/ui/input'
	import * as Select from '$lib/components/ui/select'
	import ProdukSchema from '$lib/schemas/produk-schema'
	import type { KategoriBarang, NamaBarang, SatuanBarang, SupplierBarang } from '@prisma/client'
	import { toast } from 'svelte-sonner'
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'

	interface PropsInterface {
		data: SuperValidated<Infer<typeof ProdukSchema>>
		supplierBarang: SupplierBarang[]
		namaBarang: NamaBarang[]
		kategoriBarang: KategoriBarang[]
		satuanBarang: SatuanBarang[]
		message: string | undefined
	}

	let { data, supplierBarang, kategoriBarang, namaBarang, satuanBarang, message }: PropsInterface =
		$props()

	const form = superForm(data, {
		validators: zodClient(ProdukSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success('Data produk berhasil disimpan')
			} else {
				toast.error('Silakan perbaiki kesalahan dalam form')
			}
		}
	})

	const { form: formData, enhance } = form
</script>

<form
	method="POST"
	class="flex w-[600px] flex-col gap-4 rounded-lg bg-slate-100 p-4 dark:bg-slate-900"
	use:enhance
>
	<Form.Field {form} name="idProduk">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>ID Produk</Form.Label>
				<Input {...props} bind:value={$formData.idProduk} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="supplierBarangId">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Supplier Barang</Form.Label>
				<Select.Root type="single" bind:value={$formData.supplierBarangId} name={props.name}>
					<Select.Trigger {...props}>
						{$formData.supplierBarangId
							? supplierBarang.find((s) => s.id === $formData.supplierBarangId)?.nama
							: 'Pilih supplier...'}
					</Select.Trigger>
					<Select.Content>
						{#each supplierBarang as supplier}
							<Select.Item value={String(supplier.id)} label={supplier.nama} />
						{/each}
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="namaBarangId">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Nama Barang</Form.Label>
				<Select.Root type="single" bind:value={$formData.namaBarangId} name={props.name}>
					<Select.Trigger {...props}>
						{$formData.namaBarangId
							? namaBarang.find((n) => n.id === $formData.namaBarangId)?.namaBarang
							: 'Pilih nama barang...'}
					</Select.Trigger>
					<Select.Content>
						{#each namaBarang as barang}
							<Select.Item value={barang.id} label={barang.namaBarang} />
						{/each}
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="kategoriBarangId">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Kategori Barang</Form.Label>
				<Select.Root type="single" bind:value={$formData.kategoriBarangId} name={props.name}>
					<Select.Trigger {...props}>
						{$formData.kategoriBarangId
							? kategoriBarang.find((k) => k.id === $formData.kategoriBarangId)?.namaKategori
							: 'Pilih kategori...'}
					</Select.Trigger>
					<Select.Content>
						{#each kategoriBarang as kategori}
							<Select.Item value={kategori.id} label={kategori.namaKategori} />
						{/each}
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="satuanBarangId">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Satuan Barang</Form.Label>
				<Select.Root type="single" bind:value={$formData.satuanBarangId} name={props.name}>
					<Select.Trigger {...props}>
						{$formData.satuanBarangId
							? satuanBarang.find((s) => s.id === $formData.satuanBarangId)?.namaSatuan
							: 'Pilih satuan...'}
					</Select.Trigger>
					<Select.Content>
						{#each satuanBarang as satuan}
							<Select.Item value={satuan.id} label={satuan.namaSatuan} />
						{/each}
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="keterangan">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Keterangan (Opsional)</Form.Label>
				<Input {...props} bind:value={$formData.keterangan} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	{#if message}
		<p class="text-red-600">{message}</p>
	{/if}

	<div class="space-x-2 self-end pt-4">
		<a href="/dashboard/produk" class={buttonVariants({ variant: 'secondary' })}>Kembali</a>
		<Form.Button>Simpan</Form.Button>
	</div>
</form>
