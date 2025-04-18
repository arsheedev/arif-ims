<script lang="ts">
	export let data
	let stokBarang = data.stokBarang
	let expandedBarang: string | null = null

	function toggleExpand(id: string) {
		expandedBarang = expandedBarang === id ? null : id
	}

	function formatDate(date: Date) {
		if (!date) return '-'
		return new Date(date).toLocaleDateString('id-ID', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		})
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-6 text-2xl font-bold">Manajemen Stok Barang (FIFO)</h1>

	{#if stokBarang.length === 0}
		<div class="p-4 text-center text-gray-500">Tidak ada data barang yang ditemukan</div>
	{:else}
		<div class="space-y-4">
			{#each stokBarang as barang (barang.idDaftarBarang)}
				<div class="overflow-hidden rounded-lg bg-white shadow">
					<div class="flex items-center justify-between border-b p-4">
						<div>
							<h2 class="text-lg font-semibold">{barang.namaBarang}</h2>
							<div class="mt-1 flex items-center">
								<span class="text-sm text-gray-600">Total Stok:</span>
								{#if barang.totalStok > 0}
									<span class="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
										{barang.totalStok}
									</span>
								{:else}
									<span class="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-800">
										Kosong
									</span>
								{/if}
							</div>
						</div>
						<button
							class="text-sm font-medium text-blue-500 hover:text-blue-700"
							on:click={() => toggleExpand(barang.idDaftarBarang)}
						>
							{expandedBarang === barang.idDaftarBarang ? 'Sembunyikan' : 'Lihat Detail FIFO'}
						</button>
					</div>

					{#if expandedBarang === barang.idDaftarBarang}
						<div class="overflow-x-auto">
							<table class="min-w-full">
								<thead class="bg-gray-50">
									<tr>
										<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
											>Kode</th
										>
										<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
											>Tanggal</th
										>
										<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
											>Supplier</th
										>
										<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
											>Awal</th
										>
										<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
											>Terjual</th
										>
										<th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500"
											>Sisa</th
										>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-200">
									{#each barang.pembelianDetails as detail (detail.idPembelian)}
										<tr class="hover:bg-gray-50">
											<td class="whitespace-nowrap px-4 py-2 text-sm"
												>{detail.kodeTransaksi || '-'}</td
											>
											<td class="whitespace-nowrap px-4 py-2 text-sm"
												>{formatDate(detail.tanggalPembelian)}</td
											>
											<td class="whitespace-nowrap px-4 py-2 text-right text-sm"
												>{detail.jumlahAwal}</td
											>
											<td class="whitespace-nowrap px-4 py-2 text-right text-sm"
												>{detail.jumlahTerjual}</td
											>
											<td class="whitespace-nowrap px-4 py-2 text-right text-sm">
												{#if detail.stokTersisa > 0}
													<span
														class="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
													>
														{detail.stokTersisa}
													</span>
												{:else}
													<span
														class="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800"
													>
														0
													</span>
												{/if}
											</td>
										</tr>
									{:else}
										<tr>
											<td colspan="6" class="px-4 py-2 text-center text-sm text-gray-500">
												Tidak ada data pembelian
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
