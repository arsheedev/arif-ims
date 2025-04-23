<script lang="ts">
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import * as Table from '$lib/components/ui/table'
	import type { PageData } from './$types'

	export let data: PageData

	onMount(() => {
		window.print()
		setTimeout(() => goto('/dashboard/perhitungan-eoq'), 1000)
	})
</script>

<div class="font-poppins print:px-4 print:py-2">
	<div class="mb-6 text-center print:mb-4">
		<h1 class="mb-1 text-xl font-semibold print:text-lg print:font-bold">Toko Barokah</h1>
		<h2 class="mb-2 text-lg font-medium print:text-base print:font-semibold">
			Laporan Perhitungan EOQ
		</h2>
		<p class="text-sm text-gray-600 print:text-xs">
			Tanggal Cetak: {new Date().toLocaleDateString('id-ID')}
		</p>
	</div>

	<div class="mb-4 print:mb-2">
		<h3 class="text-md font-medium print:text-sm print:font-semibold">Detail Barang</h3>
		<p class="text-sm print:text-xs">Nama Barang: {data.namaBarang}</p>
	</div>

	<div class="mb-4 print:mb-2">
		<h3 class="text-md font-medium print:text-sm print:font-semibold">Parameter Input</h3>
		<div class="grid grid-cols-3 gap-4 print:grid-cols-3 print:gap-2">
			<div>
				<p class="text-sm text-gray-600 print:text-xs">Kebutuhan Maksimum</p>
				<p class="font-medium print:text-sm">{data.input.kebutuhanMax} unit/hari</p>
			</div>
			<div>
				<p class="text-sm text-gray-600 print:text-xs">Lead Time</p>
				<p class="font-medium print:text-sm">{data.input.leadTime} hari</p>
			</div>
			<div>
				<p class="text-sm text-gray-600 print:text-xs">Hari Kerja</p>
				<p class="font-medium print:text-sm">{data.input.hariKerja} hari/tahun</p>
			</div>
		</div>
	</div>

	<div class="overflow-x-auto print:overflow-visible">
		<Table.Root class="w-full text-sm print:text-xs">
			<Table.Header>
				<Table.Row class="print:text-xs">
					<Table.Head class="print:px-2 print:py-1">Parameter</Table.Head>
					<Table.Head class="text-right print:px-2 print:py-1">Nilai</Table.Head>
					<Table.Head class="text-right print:px-2 print:py-1">Satuan</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row class="print:text-xs">
					<Table.Cell class="print:px-2 print:py-1">Safety Stock</Table.Cell>
					<Table.Cell class="text-right print:px-2 print:py-1">{data.result.safetyStock}</Table.Cell
					>
					<Table.Cell class="text-right text-muted-foreground print:px-2 print:py-1"
						>unit</Table.Cell
					>
				</Table.Row>
				<Table.Row class="print:text-xs">
					<Table.Cell class="print:px-2 print:py-1">Reorder Point</Table.Cell>
					<Table.Cell class="text-right print:px-2 print:py-1"
						>{data.result.reorderPoint}</Table.Cell
					>
					<Table.Cell class="text-right text-muted-foreground print:px-2 print:py-1"
						>unit</Table.Cell
					>
				</Table.Row>
				<Table.Row class="print:text-xs">
					<Table.Cell class="print:px-2 print:py-1">EOQ</Table.Cell>
					<Table.Cell class="text-right print:px-2 print:py-1">{data.result.eoq}</Table.Cell>
					<Table.Cell class="text-right text-muted-foreground print:px-2 print:py-1"
						>unit</Table.Cell
					>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');

	@page {
		size: auto;
		margin: 10mm;
	}
</style>
