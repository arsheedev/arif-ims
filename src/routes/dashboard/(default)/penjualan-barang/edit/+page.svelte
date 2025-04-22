<script lang="ts">
	import type { PageData } from './$types'
	import FormEditPenjualan from './FormEditPenjualan.svelte'

	export let data: PageData

	if (data.penjualanBarang) {
		data.form.data = {
			idPenjualan: data.penjualanBarang.idPenjualan,
			kodeTransaksiPenjualan: data.penjualanBarang.kodeTransaksiPenjualan,
			tanggalPenjualan: data.penjualanBarang.tanggalPenjualan,
			namaBarangId: data.penjualanBarang.namaBarangId,
			jumlah: data.penjualanBarang.jumlah
		}
	}
</script>

{#if !data.penjualanBarang}
	<p class="p-4 text-red-600">Data produk tidak ditemukan</p>
{:else}
	<div class="flex justify-center p-4">
		<FormEditPenjualan data={data.form} namaBarang={data.namaBarang} message={data.message} />
	</div>
{/if}
