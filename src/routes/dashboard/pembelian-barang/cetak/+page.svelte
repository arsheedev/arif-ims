<script lang="ts">
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import * as Table from '$lib/components/ui/table'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	onMount(() => {
		window.print()
		goto('/dashboard/pembelian-barang')
	})
</script>

<div class="font-poppins print:px-4 print:py-2">
	<div class="mb-6 text-center print:mb-4">
		<h1 class="mb-1 text-xl font-semibold print:text-lg print:font-bold">Toko Barokah</h1>
		<h2 class="mb-2 text-lg font-medium print:text-base print:font-semibold">
			Laporan Pembelian Barang
		</h2>
		{#if data.pembelianBarang.length > 0}
			<p class="text-sm text-gray-600 print:text-xs">
				Periode: {new Date(data.pembelianBarang[0].tanggalPembelian).toLocaleDateString('id-ID')} -
				{new Date(
					data.pembelianBarang[data.pembelianBarang.length - 1].tanggalPembelian
				).toLocaleDateString('id-ID')}
			</p>
		{/if}
	</div>

	<div class="overflow-x-auto print:overflow-visible">
		<Table.Root class="w-full text-sm print:text-xs">
			<Table.Header>
				<Table.Row class="print:text-xs">
					<Table.Head class="print:px-2 print:py-1">Kode</Table.Head>
					<Table.Head class="print:px-2 print:py-1">Barang</Table.Head>
					<Table.Head class="print:px-2 print:py-1">Supplier</Table.Head>
					<Table.Head class="print:px-2 print:py-1">Tgl. Pembuatan</Table.Head>
					<Table.Head class="print:px-2 print:py-1">Tgl. Pembelian</Table.Head>
					<Table.Head class="print:px-2 print:py-1">Jumlah</Table.Head>
					<Table.Head class="print:px-2 print:py-1">Biaya Pesan</Table.Head>
					<Table.Head class="print:px-2 print:py-1">Biaya Simpan</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if data.pembelianBarang.length > 0}
					{#each data.pembelianBarang as item (item.idPembelian)}
						<Table.Row class="print:text-xs">
							<Table.Cell class="print:px-2 print:py-1">{item.kodeTransaksiPembelian}</Table.Cell>
							<Table.Cell class="print:px-2 print:py-1"
								>{item.namaBarang?.namaBarang || '-'}</Table.Cell
							>
							<Table.Cell class="print:px-2 print:py-1">{item.supplier?.nama || '-'}</Table.Cell>
							<Table.Cell class="print:px-2 print:py-1">
								{item.tanggalPembuatan?.toLocaleDateString('id-ID', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric'
								}) || '-'}
							</Table.Cell>
							<Table.Cell class="print:px-2 print:py-1">
								{item.tanggalPembelian?.toLocaleDateString('id-ID', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric'
								}) || '-'}
							</Table.Cell>
							<Table.Cell class="print:px-2 print:py-1">{item.jumlah}</Table.Cell>
							<Table.Cell class="print:px-2 print:py-1">
								{item.biayaPesan
									? new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR',
											maximumFractionDigits: 0
										}).format(item.biayaPesan)
									: '-'}
							</Table.Cell>
							<Table.Cell class="print:px-2 print:py-1">
								{item.biayaSimpan
									? new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR',
											maximumFractionDigits: 0
										}).format(item.biayaSimpan)
									: '-'}
							</Table.Cell>
						</Table.Row>
					{/each}
				{:else}
					<Table.Row>
						<Table.Cell colspan={8} class="py-4 text-center print:py-2 print:text-xs">
							Belum ada data pembelian
						</Table.Cell>
					</Table.Row>
				{/if}
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
