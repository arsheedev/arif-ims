<script lang="ts">
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import { Button } from '$lib/components/ui/button'
	import { Input } from '$lib/components/ui/input'
	import * as Popover from '$lib/components/ui/popover'
	import { RangeCalendar } from '$lib/components/ui/range-calendar'
	import * as Table from '$lib/components/ui/table'
	import { getLocalTimeZone, today } from '@internationalized/date'
	import Plus from 'lucide-svelte/icons/plus'
	import Printer from 'lucide-svelte/icons/printer'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	let search = $state<string>('')

	const start = today(getLocalTimeZone())
	const end = start.add({})

	let dateRange = $state({
		start,
		end
	})

	function handlePrint() {
		goto(`/dashboard/penjualan-barang/cetak?dateStart=${dateRange.start}&dateEnd=${dateRange.end}`)
	}
</script>

<div class="container">
	<h2 class="title">Data Penjualan Barang</h2>

	<div class="table-header">
		<div class="left-toolbar">
			<Button href="/dashboard/penjualan-barang/tambah">
				<Plus class="icon" />
				<span>Tambah Penjualan</span>
			</Button>

			<Popover.Root>
				<Popover.Trigger>
					<Button variant="outline">
						<Printer class="icon" />
						<span>Cetak Laporan</span>
					</Button>
				</Popover.Trigger>
				<Popover.Content class="w-auto p-4" align="start">
					<div class="flex flex-col gap-4">
						<h3 class="font-medium">Pilih Periode Laporan</h3>

						<RangeCalendar bind:value={dateRange} class="rounded-md border" />

						<div class="flex justify-end gap-2">
							<Popover.Close>
								<Button variant="outline">Batal</Button>
							</Popover.Close>
							<Button onclick={handlePrint}>Cetak</Button>
						</div>
					</div>
				</Popover.Content>
			</Popover.Root>
		</div>
		<div class="right-search">
			<Input type="text" placeholder="Cari kode transaksi" bind:value={search} />
		</div>
	</div>

	<div class="table-wrapper">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Kode Transaksi</Table.Head>
					<Table.Head>Nama Barang</Table.Head>
					<Table.Head>Tanggal Penjualan</Table.Head>
					<Table.Head>Jumlah</Table.Head>
					<Table.Head>Aksi</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if data.penjualanBarang.length > 0}
					{#each data.penjualanBarang.filter((item) => item.kodeTransaksiPenjualan
								.toLowerCase()
								.includes(search.toLowerCase()) || (item.namaBarang?.namaBarang && item.namaBarang?.namaBarang
									.toLowerCase()
									.includes(search.toLowerCase()))) as item (item.kodeTransaksiPenjualan)}
						<Table.Row>
							<Table.Cell>{item.kodeTransaksiPenjualan}</Table.Cell>
							<Table.Cell>{item.namaBarang?.namaBarang}</Table.Cell>
							<Table.Cell>{item.tanggalPenjualan?.toLocaleDateString('id-ID') || '-'}</Table.Cell>
							<Table.Cell>{item.jumlah}</Table.Cell>

							<Table.Cell>
								<div class="actions">
									<Button
										size="sm"
										variant="outline"
										href={`/dashboard/penjualan-barang/edit?id=${item.id}`}
									>
										Edit
									</Button>
									<form method="POST" action="?/default" use:enhance>
										<input type="hidden" name="id" value={item.id} />
										<Button type="submit" size="sm" variant="destructive">Hapus</Button>
									</form>
								</div>
							</Table.Cell>
						</Table.Row>
					{/each}
				{:else}
					<Table.Row>
						<Table.Cell colspan={8} class="no-data">Belum ada data pembelian</Table.Cell>
					</Table.Row>
				{/if}
			</Table.Body>
		</Table.Root>
	</div>
</div>

<style>
	.container {
		font-family: 'Poppins', sans-serif;
		padding: 1rem;
	}

	.title {
		margin-bottom: 0.5rem;
		font-size: 1.2rem;
	}

	.table-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.right-search {
		display: flex;
		align-items: center;
	}

	.table-wrapper {
		overflow-x: auto;
	}

	.actions {
		display: flex;
		gap: 0.5rem;
	}

	@media (max-width: 768px) {
		.table-wrapper {
			overflow-x: auto;
		}
	}
</style>
