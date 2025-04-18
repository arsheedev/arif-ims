<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { Input } from '$lib/components/ui/input'
	import * as Table from '$lib/components/ui/table'
	import Plus from 'lucide-svelte/icons/plus'
	import { enhance } from '$app/forms'
	import type { PageData } from './$types'
	import type { PenjualanBarang, NamaBarang, SupplierBarang } from '@prisma/client'

	let { data }: { data: PageData } = $props()
	let search = $state<string>('')
</script>

<div class="container">
	<h2 class="title">Data Penjualan Barang</h2>

	<div class="table-header">
		<div class="left-toolbar">
			<Button href="/dashboard/penjualan-barang/tambah">
				<Plus class="icon" />
				<span>Tambah Penjualan</span>
			</Button>
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
