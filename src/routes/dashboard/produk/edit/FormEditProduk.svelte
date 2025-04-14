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

	interface Props {
		data: SuperValidated<Infer<typeof ProdukSchema>>
		supplierBarang: SupplierBarang[]
		namaBarang: NamaBarang[]
		kategoriBarang: KategoriBarang[]
		satuanBarang: SatuanBarang[]
		message?: string
	}

	const {
		data,
		supplierBarang = [],
		namaBarang = [],
		kategoriBarang = [],
		satuanBarang = [],
		message
	} = $props<Props>()

	const form = superForm(data, {
		validators: zodClient(ProdukSchema),
		resetForm: false,
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success('Data produk berhasil diperbarui')
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
			<Form.Label>ID Produk</Form.Label>
			<Input name="idProduk" bind:value={$formData.idProduk} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="supplierBarangId">
		<Form.Control>
			<Form.Label>Supplier Barang</Form.Label>
			<Select.Root type="single" bind:value={$formData.supplierBarangId} name="supplierBarangId">
				<Select.Trigger>
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
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="namaBarangId">
		<Form.Control>
			<Form.Label>Nama Barang</Form.Label>
			<Select.Root type="single" bind:value={$formData.namaBarangId} name="namaBarangId">
				<Select.Trigger>
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
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="kategoriBarangId">
		<Form.Control>
			<Form.Label>Kategori Barang</Form.Label>
			<Select.Root type="single" bind:value={$formData.kategoriBarangId} name="kategoriBarangId">
				<Select.Trigger>
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
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="satuanBarangId">
		<Form.Control>
			<Form.Label>Satuan Barang</Form.Label>
			<Select.Root type="single" bind:value={$formData.satuanBarangId} name="satuanBarangId">
				<Select.Trigger>
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
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="hargaBeli">
		<Form.Control>
			<Form.Label>Harga Beli</Form.Label>
			<Input type="number" name="hargaBeli" bind:value={$formData.hargaBeli} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="hargaJual">
		<Form.Control>
			<Form.Label>Harga Jual</Form.Label>
			<Input type="number" name="hargaJual" bind:value={$formData.hargaJual} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="keterangan">
		<Form.Control>
			<Form.Label>Keterangan (Opsional)</Form.Label>
			<Input name="keterangan" bind:value={$formData.keterangan} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	{#if message}
		<p class="text-red-600">{message}</p>
	{/if}

	<div class="space-x-2 self-end pt-4">
		<a href="/dashboard/produk" class={buttonVariants({ variant: 'secondary' })}>Kembali</a>
		<Form.Button>Simpan Perubahan</Form.Button>
	</div>
</form>
