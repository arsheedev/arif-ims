<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { Input } from '$lib/components/ui/input'
	import * as Table from '$lib/components/ui/table'
	import Plus from 'lucide-svelte/icons/plus'
	import { enhance } from '$app/forms'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	let search = ''
</script>

<div class="container">
	<h2 class="title">Data Produk</h2>

	<div class="table-header">
		<div class="left-toolbar">
			<Button href="/dashboard/produk/tambah">
				<Plus class="icon" />
				<span>Data Baru</span>
			</Button>
		</div>
		<div class="right-search">
			<Input type="text" placeholder="Cari nama produk" bind:value={search} />
		</div>
	</div>

	<div class="table-wrapper">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>ID Produk</Table.Head>
					<Table.Head>Nama Barang</Table.Head>
					<Table.Head>Nama Kategori</Table.Head>
					<Table.Head>Nama Satuan</Table.Head>
					<Table.Head>ID Supplier (Nama)</Table.Head>
					<Table.Head>Aksi</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if data.produk.length > 0}
					{#each data.produk.filter((item) => item.barang.namaBarang
							.toLowerCase()
							.includes(search.toLowerCase())) as item (item.id)}
						<Table.Row>
							<Table.Cell>{item.idProduk}</Table.Cell>
							<Table.Cell>{item.barang.namaBarang}</Table.Cell>
							<Table.Cell>{item.kategori.namaKategori}</Table.Cell>
							<Table.Cell>{item.satuan.namaSatuan}</Table.Cell>
							<Table.Cell>{item.supplier.idSupplier} ({item.supplier.nama})</Table.Cell>
							<Table.Cell>
								{#if data.session.role === 'ADMIN'}
									<div class="actions">
										<Button
											size="sm"
											variant="outline"
											href={`/dashboard/produk/edit?id=${item.id}`}
										>
											Edit
										</Button>
										<form method="POST" use:enhance>
											<input type="hidden" name="id" value={item.id} />
											<Button type="submit" size="sm" variant="destructive">Hapus</Button>
										</form>
									</div>
								{:else}
									<span class="no-action">-</span>
								{/if}
							</Table.Cell>
						</Table.Row>
					{/each}
				{:else}
					<Table.Row>
						<Table.Cell colspan={6} class="no-data">Data belum tersedia</Table.Cell>
					</Table.Row>
				{/if}
			</Table.Body>
		</Table.Root>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

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

	.no-action {
		color: gray;
		font-style: italic;
	}

	@media (max-width: 768px) {
		.table-wrapper {
			overflow-x: auto;
		}
	}
</style>
