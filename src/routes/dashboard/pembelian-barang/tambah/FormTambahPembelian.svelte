<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Form from '$lib/components/ui/form'
	import { Input } from '$lib/components/ui/input'
	import * as Select from '$lib/components/ui/select'
	import PembelianBarangSchema from '$lib/schemas/pembelian-barang-schema'
	import type { NamaBarang, SupplierBarang } from '@prisma/client'
	import { toast } from 'svelte-sonner'
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import CalendarIcon from 'lucide-svelte/icons/hand-coins'
	import {
		CalendarDate,
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseDate,
		today
	} from '@internationalized/date'
	import { Calendar } from '$lib/components/ui/calendar'
	import * as Popover from '$lib/components/ui/popover'
	import { cn } from '$lib/utils'

	interface PropsInterface {
		data: SuperValidated<Infer<typeof PembelianBarangSchema>>
		supplierBarang: SupplierBarang[]
		namaBarang: NamaBarang[]
		message: string | undefined
	}

	let { data, supplierBarang, namaBarang, message }: PropsInterface = $props()

	const form = superForm(data, {
		validators: zodClient(PembelianBarangSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success('Data pembelian berhasil disimpan')
			} else {
				toast.error('Silakan perbaiki kesalahan dalam form')
			}
		}
	})

	const { form: formData, enhance } = form

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	})

	let tanggalValue = $state<DateValue | undefined>()

	$effect(() => {
		tanggalValue = $formData.tanggalPembelian
			? parseDate($formData.tanggalPembelian.toISOString().split('T')[0])
			: undefined
	})

	let tanggalPlaceholder = $state<DateValue>(today(getLocalTimeZone()))
</script>

<form
	method="POST"
	class="flex w-[600px] flex-col gap-4 rounded-lg bg-slate-100 p-4 dark:bg-slate-900"
	use:enhance
>
	<Form.Field {form} name="idPembelian">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>ID Pembelian</Form.Label>
				<Input {...props} bind:value={$formData.idPembelian} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="kodeTransaksiPembelian">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Kode Transaksi Pembelian</Form.Label>
				<Input {...props} bind:value={$formData.kodeTransaksiPembelian} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="tanggalPembelian">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Tanggal Pembelian</Form.Label>
				<Popover.Root>
					<Popover.Trigger
						{...props}
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'w-full justify-start pl-4 text-left font-normal',
							!tanggalValue && 'text-muted-foreground'
						)}
					>
						{tanggalValue
							? df.format(tanggalValue.toDate(getLocalTimeZone()))
							: 'Pilih tanggal pembelian...'}
						<CalendarIcon class="ml-auto size-4 opacity-50" />
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0" side="top">
						<Calendar
							type="single"
							value={tanggalValue as DateValue}
							bind:placeholder={tanggalPlaceholder}
							minValue={new CalendarDate(2000, 1, 1)}
							maxValue={today(getLocalTimeZone())}
							calendarLabel="Tanggal Pembelian"
							onValueChange={(v) => {
								if (v) {
									$formData.tanggalPembelian = new Date(v.toString())
								} else {
									$formData.tanggalPembelian = null
								}
							}}
						/>
					</Popover.Content>
				</Popover.Root>
				<Form.FieldErrors />
				<input hidden name={props.name} value={$formData.tanggalPembelian?.toISOString()} />
			{/snippet}
		</Form.Control>
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

	<Form.Field {form} name="jumlah">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Jumlah</Form.Label>
				<Input type="number" {...props} bind:value={$formData.jumlah} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="hargaBeli">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Harga Beli</Form.Label>
				<Input type="number" {...props} bind:value={$formData.hargaBeli} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="hargaJual">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Harga Jual</Form.Label>
				<Input type="number" {...props} bind:value={$formData.hargaJual} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	{#if message}
		<p class="text-red-600">{message}</p>
	{/if}

	<div class="space-x-2 self-end pt-4">
		<a href="/dashboard/pembelian-barang" class={buttonVariants({ variant: 'secondary' })}
			>Kembali</a
		>
		<Form.Button>Simpan</Form.Button>
	</div>
</form>
