<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import * as Select from '$lib/components/ui/select'
	import { Button } from '$lib/components/ui/button'
	import * as Table from '$lib/components/ui/table'
	import { Input } from '$lib/components/ui/input'
	import { Label } from '$lib/components/ui/label'
	import { goto } from '$app/navigation'

	export let data: PageData
	export let form: ActionData

	let selectedId = form?.namaBarangId || undefined

	const tableData = form
		? [
				{ name: 'Safety Stock', value: form.safetyStock, unit: 'unit' },
				{ name: 'Reorder Point', value: form.reorderPoint, unit: 'unit' },
				{ name: 'EOQ (Economic Order Quantity)', value: form.eoq, unit: 'unit' }
			]
		: []

	function handlePrint() {
		if (!form || !form.safetyStock) return

		const namaBarang = data.namaBarang.find((n) => n.id === selectedId)?.namaBarang || ''

		const params = new URLSearchParams()
		params.set('namaBarang', namaBarang)
		params.set('kebutuhanMax', form.kebutuhanMax?.toString() || '')
		params.set('leadTime', form.leadTime?.toString() || '')
		params.set('hariKerja', form.hariKerja?.toString() || '')
		params.set('safetyStock', form.safetyStock.toString())
		params.set('reorderPoint', form.reorderPoint.toString())
		params.set('eoq', form.eoq.toString())

		goto(`/dashboard/perhitungan-eoq/cetak?${params.toString()}`)
	}
</script>

<div class="page-container">
	<div class="form-section">
		<h2 class="section-title">Form Perhitungan EOQ</h2>
		<form method="POST" class="form-content">
			<input type="hidden" name="namaBarangId" value={selectedId} />

			<div class="form-field">
				<Label for="namaBarang">Pilih Barang</Label>
				<Select.Root type="single" bind:value={selectedId} name="namaBarangId">
					<Select.Trigger class="w-full">
						{selectedId
							? data.namaBarang.find((n) => n.id === selectedId)?.namaBarang
							: 'Pilih barang...'}
					</Select.Trigger>
					<Select.Content>
						{#each data.namaBarang as barang}
							<Select.Item value={barang.id} label={barang.namaBarang} />
						{/each}
					</Select.Content>
				</Select.Root>
			</div>

			<div class="form-field">
				<Label for="kebutuhanMax">Kebutuhan Maksimum (unit/hari)</Label>
				<Input
					id="kebutuhanMax"
					name="kebutuhanMax"
					type="number"
					placeholder="Contoh: 100"
					required
				/>
			</div>

			<div class="form-field">
				<Label for="leadTime">Lead Time (hari)</Label>
				<Input id="leadTime" name="leadTime" type="number" placeholder="Contoh: 7" required />
			</div>

			<div class="form-field">
				<Label for="hariKerja">Hari Kerja dalam Setahun</Label>
				<Input id="hariKerja" name="hariKerja" type="number" placeholder="Contoh: 300" required />
			</div>

			<Button type="submit" class="submit-button">Hitung EOQ</Button>
		</form>
	</div>

	<div class="results-section">
		<h2 class="section-title">Hasil Perhitungan</h2>
		{#if form?.safetyStock !== undefined}
			<Button onclick={handlePrint}>Cetak</Button>
			<Table.Root class="result-table">
				<Table.Header>
					<Table.Row>
						<Table.Head class="param-col">Parameter</Table.Head>
						<Table.Head class="value-col">Nilai</Table.Head>
						<Table.Head class="unit-col">Satuan</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each tableData as row}
						<Table.Row>
							<Table.Cell>{row.name}</Table.Cell>
							<Table.Cell class="text-right">
								{row.value?.toLocaleString('id-ID')}
							</Table.Cell>
							<Table.Cell class="text-right text-muted-foreground">
								{row.unit}
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{:else}
			<div class="placeholder">
				<p class="placeholder-text">Masukkan data terlebih dahulu</p>
				<p class="placeholder-subtext">Hasil perhitungan akan muncul di sini</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.page-container {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: 2rem;
		min-height: 70vh;
		padding: 2rem;
		max-width: 2000px;
		margin: 0 auto;
		align-items: start;
	}

	.form-section {
		padding: 1.5rem;
		background: hsl(0 0% 98%);
		border-radius: 0.75rem;
		height: 100%;
		min-height: 500px;
	}

	.results-section {
		padding: 1.5rem;
		background: hsl(0 0% 100%);
		border-radius: 0.75rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		min-height: 500px;
		height: 100%;
	}

	.section-title {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1.5rem;
		color: hsl(240 10% 20%);
	}

	.form-content {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		height: calc(100% - 3rem);
	}

	.form-field {
		display: grid;
		gap: 0.5rem;
	}

	.placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 90%;
		border: 1px dashed hsl(0 0% 80%);
		border-radius: 0.5rem;
		padding: 2rem;
	}

	.placeholder-text {
		font-size: 1rem;
		color: hsl(0 0% 45%);
		margin-bottom: 0.5rem;
	}

	.placeholder-subtext {
		font-size: 0.875rem;
		color: hsl(0 0% 60%);
	}

	@media (prefers-color-scheme: dark) {
		.form-section {
			background: hsl(240 10% 10%);
		}

		.results-section {
			background: hsl(240 10% 15%);
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		}

		.section-title {
			color: hsl(0 0% 90%);
		}

		.placeholder {
			border-color: hsl(0 0% 25%);
		}

		.placeholder-text {
			color: hsl(0 0% 60%);
		}

		.placeholder-subtext {
			color: hsl(0 0% 45%);
		}

		:global(.dark) .form-section {
			background: hsl(240 10% 10%);
		}

		:global(.dark) .results-section {
			background: hsl(240 10% 15%);
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		}
	}

	@media (max-width: 768px) {
		.page-container {
			grid-template-columns: 1fr;
			min-height: auto;
		}

		.form-section,
		.results-section {
			min-height: auto;
		}
	}
</style>
