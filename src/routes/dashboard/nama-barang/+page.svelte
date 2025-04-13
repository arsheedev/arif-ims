<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { Input } from '$lib/components/ui/input'
	import * as Table from '$lib/components/ui/table'
	import Plus from 'lucide-svelte/icons/plus'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	let search = ''
</script>

<div class="container">
	<h2 class="title">Olah Data Barang</h2>

	<div class="alert">! Klik Titik Tiga Untuk Edit Salah Satu Data</div>

	<div class="table-header">
		<div class="left-toolbar">
			<Button href="/dashboard/nama-barang/tambah">
				<Plus class="icon" />
				<span>Data Baru</span>
			</Button>
		</div>
		<div class="right-search">
			<Input type="text" placeholder="Cari data barang" bind:value={search} />
		</div>
	</div>

	<div class="table-wrapper">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Nama Barang</Table.Head>
					<Table.Head>ID Daftar Barang</Table.Head>
					<Table.Head>Tanggal Dibuat</Table.Head>
					<Table.Head>Tanggal Diperbarui</Table.Head>
					<Table.Head>Aksi</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if data.namaBarang.length > 0}
					{#each data.namaBarang.filter((item) => item.namaBarang
							.toLowerCase()
							.includes(search.toLowerCase())) as item}
						<Table.Row>
							<Table.Cell>{item.namaBarang}</Table.Cell>
							<Table.Cell>{item.idDaftarBarang}</Table.Cell>
							<Table.Cell>{item.createdAt.toLocaleDateString()}</Table.Cell>
							<Table.Cell>{item.updatedAt.toLocaleDateString()}</Table.Cell>
							<Table.Cell>
								{#if data.session.role === 'ADMIN'}
									<!-- Tombol edit dan hapus -->
									<div class="actions">
										<Button
											size="sm"
											variant="outline"
											href={`/dashboard/nama-barang/edit?id=${item.id}`}
										>
											Edit
										</Button>
										<Button
											size="sm"
											variant="destructive"
											on:click={() => console.log('Delete', item.id)}>Hapus</Button
										>
									</div>
								{:else}
									<span class="no-action">-</span>
								{/if}
							</Table.Cell>
						</Table.Row>
					{/each}
				{:else}
					<Table.Row>
						<Table.Cell colspan={5} class="no-data">Data masih belum tersedia</Table.Cell>
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

	.alert {
		background-color: #ff4d4d;
		color: #fff;
		padding: 0.6rem;
		border-radius: 4px;
		margin-bottom: 1rem;
		font-weight: 500;
		font-size: 0.9rem;
		width: fit-content;
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
