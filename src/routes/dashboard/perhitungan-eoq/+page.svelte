<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import * as Select from '$lib/components/ui/select'
	import { Button } from '$lib/components/ui/button'
	import * as Table from '$lib/components/ui/table'

	export let data: PageData
	export let form: ActionData

	let selectedId = form?.namaBarangId || undefined

	// Data untuk tabel
	const tableData = form
		? [
				{ name: 'Safety Stock', value: form.safetyStock },
				{ name: 'Reorder Point', value: form.reorderPoint },
				{ name: 'EOQ', value: form.eoq },
				{ name: 'Rata Permintaan Harian', value: form.rataRataPermintaanHarian },
				{ name: 'Max Permintaan Harian', value: form.maxPermintaanHarian },
				{ name: 'Rata Lead Time', value: form.rataRataLeadTime },
				{ name: 'Max Lead Time', value: form.maxLeadTime },
				{ name: 'Permintaan Tahunan', value: form.permintaanTahunan }
			]
		: []
</script>

<div class="page-container">
	<div class="form-container">
		<form method="POST" class="flex items-center gap-2">
			<input type="hidden" name="namaBarangId" value={selectedId} />

			<Select.Root type="single" bind:value={selectedId} name="namaBarangId" class="w-[200px]">
				<Select.Trigger class="w-full truncate">
					{selectedId
						? data.namaBarang.find((n) => n.id === selectedId)?.namaBarang
						: 'Pilih barang...'}
				</Select.Trigger>
				<Select.Content class="w-[var(--radix-select-trigger-width)]">
					{#each data.namaBarang as barang}
						<Select.Item value={barang.id} label={barang.namaBarang} class="truncate" />
					{/each}
				</Select.Content>
			</Select.Root>

			<Button type="submit" size="sm" class="shrink-0">Submit</Button>
		</form>
	</div>

	{#if form}
		<div class="table-container">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[200px]">Parameter</Table.Head>
						<Table.Head class="text-right">Nilai</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each tableData as row}
						<Table.Row>
							<Table.Cell>{row.name}</Table.Cell>
							<Table.Cell class="text-right">
								{typeof row.value === 'number' ? row.value.toLocaleString() : row.value}
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	{/if}
</div>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 2rem;
		gap: 2rem;
	}

	.form-container {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.table-container {
		width: 100%;
		max-width: 400px;
		background: white;
		border-radius: 0.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		padding: 1rem;
	}
</style>
