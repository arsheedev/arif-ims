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
	const end = start.add({ days: 7 })

	let dateRange = $state({
		start,
		end
	})

	function handlePrint() {
		goto(`/dashboard/pembelian-barang/test?dateStart=${dateRange.start}&dateEnd=${dateRange.end}`)
	}
</script>

<div class="container">
	<h2 class="title">Data Pembelian Barang</h2>

	<div class="table-header">
		<div class="left-toolbar">
			<Button href="/dashboard/pembelian-barang/tambah">
				<Plus class="icon" />
				<span>Tambah Pembelian</span>
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
					<Table.Head>Supplier</Table.Head>
					<Table.Head>Tanggal Pembuatan</Table.Head>
					<Table.Head>Tanggal Pembelian</Table.Head>
					<Table.Head>Jumlah Stok</Table.Head>
					<Table.Head>Biaya Pesan</Table.Head>
					<Table.Head>Biaya Simpan</Table.Head>
					<Table.Head>Aksi</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if data.pembelianBarang.length > 0}
					{#each data.pembelianBarang.filter((item) => item.kodeTransaksiPembelian
								.toLowerCase()
								.includes(search.toLowerCase()) || (item.namaBarang && item.namaBarang.namaBarang
									.toLowerCase()
									.includes(search.toLowerCase())) || (item.supplierBarang && item.supplierBarang.nama
									.toLowerCase()
									.includes(search.toLowerCase()))) as item (item.idPembelian)}
						<Table.Row>
							<Table.Cell>{item.kodeTransaksiPembelian}</Table.Cell>
							<Table.Cell>{item.namaBarang.namaBarang}</Table.Cell>
							<Table.Cell>{item.supplier?.nama || '-'}</Table.Cell>
							<Table.Cell>
								{item.tanggalPembuatan?.toLocaleDateString('id-ID', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric'
								}) || '-'}
							</Table.Cell>
							<Table.Cell>
								{item.tanggalPembelian?.toLocaleDateString('id-ID', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric'
								}) || '-'}
							</Table.Cell>
							<Table.Cell>{item.jumlah}</Table.Cell>
							<Table.Cell>
								{item.biayaPesan
									? new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR'
										}).format(item.biayaPesan)
									: '-'}
							</Table.Cell>
							<Table.Cell>
								{item.biayaSimpan
									? new Intl.NumberFormat('id-ID', {
											style: 'currency',
											currency: 'IDR'
										}).format(item.biayaSimpan)
									: '-'}
							</Table.Cell>
							<Table.Cell>
								<div class="actions">
									<Button
										size="sm"
										variant="outline"
										href={`/dashboard/pembelian-barang/edit?id=${item.id}`}
									>
										Edit
									</Button>
									<form method="POST" use:enhance>
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
		font-weight: 600;
	}

	.table-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.left-toolbar {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.right-search {
		display: flex;
		align-items: center;
	}

	.table-wrapper {
		overflow-x: auto;
		margin-top: 1rem;
		border-radius: 0.375rem;
	}

	.actions {
		display: flex;
		gap: 0.5rem;
	}

	@media (max-width: 768px) {
		.table-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.right-search {
			width: 100%;
		}
	}
</style>
