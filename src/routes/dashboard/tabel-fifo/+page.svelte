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
	<h1 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
		Manajemen Stok Barang (FIFO)
	</h1>

	{#if stokBarang.length === 0}
		<div class="p-4 text-center text-gray-500 dark:text-gray-400">
			Tidak ada data barang yang ditemukan
		</div>
	{:else}
		<div class="space-y-4">
			{#each stokBarang as barang (barang.idDaftarBarang)}
				<div class="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
					<div class="flex items-center justify-between border-b p-4 dark:border-gray-700">
						<div>
							<h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
								{barang.namaBarang}
							</h2>
							<div class="mt-1 flex items-center">
								<span class="text-sm text-gray-600 dark:text-gray-400">Total Stok:</span>
								{#if barang.totalStok > 0}
									<span
										class="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-200"
									>
										{barang.totalStok}
									</span>
								{:else}
									<span
										class="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-800 dark:bg-red-900 dark:text-red-200"
									>
										Kosong
									</span>
								{/if}
							</div>
						</div>
						<button
							class="text-sm font-medium text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
							on:click={() => toggleExpand(barang.idDaftarBarang)}
						>
							{expandedBarang === barang.idDaftarBarang ? 'Sembunyikan' : 'Lihat Detail FIFO'}
						</button>
					</div>

					{#if expandedBarang === barang.idDaftarBarang}
						<div class="overflow-x-auto">
							<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
								<thead class="bg-gray-50 dark:bg-gray-700">
									<tr>
										<th
											class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
											>Kode Transaksi</th
										>
										<th
											class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
											>Tanggal Pembelian</th
										>
										<th
											class="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
											>Jumlah Awal</th
										>
										<th
											class="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
											>Terjual</th
										>
										<th
											class="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
											>Sisa Stok</th
										>
									</tr>
								</thead>
								<tbody
									class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800"
								>
									{#each barang.pembelianDetails as detail (detail.idPembelian)}
										<tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
											<td
												class="whitespace-nowrap px-4 py-4 text-sm text-gray-900 dark:text-gray-100"
												>{detail.kodeTransaksi || '-'}</td
											>
											<td
												class="whitespace-nowrap px-4 py-4 text-sm text-gray-900 dark:text-gray-100"
												>{formatDate(detail.tanggalPembelian)}</td
											>
											<td
												class="whitespace-nowrap px-4 py-4 text-right text-sm text-gray-900 dark:text-gray-100"
												>{detail.jumlahAwal}</td
											>
											<td
												class="whitespace-nowrap px-4 py-4 text-right text-sm text-gray-900 dark:text-gray-100"
												>{detail.jumlahTerjual}</td
											>
											<td class="whitespace-nowrap px-4 py-4 text-right text-sm">
												{#if detail.stokTersisa > 0}
													<span
														class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200"
													>
														{detail.stokTersisa}
													</span>
												{:else}
													<span
														class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
													>
														0
													</span>
												{/if}
											</td>
										</tr>
									{:else}
										<tr>
											<td
												colspan="5"
												class="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
											>
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
