<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Form from '$lib/components/ui/form'
	import { Input } from '$lib/components/ui/input'
	import * as Select from '$lib/components/ui/select'
	import PenjualanBarangSchema from '$lib/schemas/penjualan-barang-schema'
	import type { NamaBarang } from '@prisma/client'
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

	let loading = false

	interface PropsInterface {
		data: SuperValidated<Infer<typeof PenjualanBarangSchema>>
		namaBarang: NamaBarang[]
		message: string | undefined
	}

	let { data, namaBarang, message }: PropsInterface = $props()

	const form = superForm(data, {
		validators: zodClient(PenjualanBarangSchema),
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

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	})

	let tanggalValue = $state<DateValue | undefined>()

	$effect(() => {
		tanggalValue = $formData.tanggalPenjualan
			? parseDate($formData.tanggalPenjualan.toISOString().split('T')[0])
			: undefined
	})

	let tanggalPlaceholder = $state<DateValue>(today(getLocalTimeZone()))
</script>

<form
	method="POST"
	class="flex w-[600px] flex-col gap-4 rounded-lg bg-slate-100 p-4 dark:bg-slate-900"
	use:enhance
>
	<Form.Field {form} name="idPenjualan">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>ID Penjualan</Form.Label>
				<Input {...props} bind:value={$formData.idPenjualan} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="kodeTransaksiPenjualan">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Kode Transaksi Penjualan</Form.Label>
				<Input {...props} bind:value={$formData.kodeTransaksiPenjualan} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="tanggalPenjualan">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Tanggal Penjualan</Form.Label>
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
							: 'Pilih tanggal Penjualan...'}
						<CalendarIcon class="ml-auto size-4 opacity-50" />
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0" side="top">
						<Calendar
							type="single"
							value={tanggalValue as DateValue}
							bind:placeholder={tanggalPlaceholder}
							minValue={new CalendarDate(2000, 1, 1)}
							maxValue={today(getLocalTimeZone())}
							calendarLabel="Tanggal Penjualan"
							onValueChange={(v) => {
								if (v) {
									$formData.tanggalPenjualan = new Date(v.toString())
								} else {
									$formData.tanggalPenjualan = null
								}
							}}
						/>
					</Popover.Content>
				</Popover.Root>
				<Form.FieldErrors />
				<input hidden name={props.name} value={$formData.tanggalPenjualan?.toISOString()} />
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

	<Form.Field {form} name="jumlah">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Jumlah</Form.Label>
				<Input type="number" {...props} bind:value={$formData.jumlah} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	{#if message}
		<p class="text-red-600">{message}</p>
	{/if}

	<div class="space-x-2 self-end pt-4">
		<a href="/dashboard/penjualan-barang" class={buttonVariants({ variant: 'secondary' })}
			>Kembali</a
		>
		<Form.Button>Simpan</Form.Button>
	</div>
</form>
