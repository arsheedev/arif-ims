<script lang="ts">
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import type { PageData } from './$types'

	export let data: PageData

	onMount(() => {
		window.print()
		goto('/dashboard/tabel-fifo')
	})

	function formatDate(date: Date | null) {
		if (!date) return '-'
		return new Date(date).toLocaleDateString('id-ID', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		})
	}
</script>

<div class="font-poppins print:px-4 print:py-2">
	<div class="mb-6 text-center print:mb-4">
		<h1 class="mb-1 text-xl font-semibold print:text-lg print:font-bold">Toko Barokah</h1>
		<h2 class="mb-2 text-lg font-medium print:text-base print:font-semibold">
			Laporan FIFO - {data.barang.namaBarang}
		</h2>
		<p class="text-sm text-gray-600 print:text-xs">
			Dicetak pada: {new Date().toLocaleDateString('id-ID', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			})}
		</p>
	</div>

	<div class="mb-6 grid grid-cols-3 gap-4 print:mb-4 print:grid-cols-3 print:gap-2">
		<div class="rounded bg-gray-100 p-3 print:p-2">
			<p class="text-xs text-gray-500 print:text-xs">Total Dibeli</p>
			<p class="font-semibold print:text-sm">{data.barang.totalDibeli}</p>
		</div>
		<div class="rounded bg-gray-100 p-3 print:p-2">
			<p class="text-xs text-gray-500 print:text-xs">Total Terjual</p>
			<p class="font-semibold print:text-sm">{data.barang.totalDijual}</p>
		</div>
		<div class="rounded bg-gray-100 p-3 print:p-2">
			<p class="text-xs text-gray-500 print:text-xs">Sisa Stok</p>
			<p class="font-semibold print:text-sm">{data.barang.totalStok}</p>
		</div>
	</div>

	<div class="overflow-x-auto print:overflow-visible">
		<table class="min-w-full divide-y divide-gray-200 text-sm print:text-xs">
			<thead class="bg-gray-50">
				<tr>
					<th class="px-3 py-2 text-left font-medium text-gray-500">Kode Transaksi</th>
					<th class="px-3 py-2 text-left font-medium text-gray-500">Tgl. Pembuatan</th>
					<th class="px-3 py-2 text-left font-medium text-gray-500">Tgl. Pembelian</th>
					<th class="px-3 py-2 text-right font-medium text-gray-500">Jumlah Awal</th>
					<th class="px-3 py-2 text-right font-medium text-gray-500">Terjual</th>
					<th class="px-3 py-2 text-right font-medium text-gray-500">Sisa Stok</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200">
				{#each data.barang.pembelianDetails as detail (detail.idPembelian)}
					<tr>
						<td class="whitespace-nowrap px-3 py-2">{detail.kodeTransaksi || '-'}</td>
						<td class="whitespace-nowrap px-3 py-2">{formatDate(detail.tanggalPembuatan)}</td>
						<td class="whitespace-nowrap px-3 py-2">{formatDate(detail.tanggalPembelian)}</td>
						<td class="whitespace-nowrap px-3 py-2 text-right">{detail.jumlahAwal}</td>
						<td class="whitespace-nowrap px-3 py-2 text-right">{detail.jumlahTerjual}</td>
						<td class="whitespace-nowrap px-3 py-2 text-right">
							{#if detail.stokTersisa > 0}
								{detail.stokTersisa}
							{:else}
								0
							{/if}
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="6" class="px-3 py-2 text-center text-gray-500">
							Tidak ada data pembelian
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');

	@page {
		size: auto;
		margin: 10mm;
	}
</style>
