<script lang="ts">
	import type { PageData } from './$types'
	import FormEditPembelian from './FormEditPembelian.svelte'

	export let data: PageData

	if (data.pembelianBarang) {
		data.form.data = {
			idPembelian: data.pembelianBarang.idPembelian,
			kodeTransaksiPembelian: data.pembelianBarang.kodeTransaksiPembelian,
			tanggalPembuatan: data.pembelianBarang.tanggalPembuatan,
			tanggalPembelian: data.pembelianBarang.tanggalPembelian,
			namaBarangId: data.pembelianBarang.namaBarangId,
			supplierBarangId: data.pembelianBarang.supplierBarangId,
			jumlah: data.pembelianBarang.jumlah,
			biayaPesan: data.pembelianBarang.biayaPesan,
			biayaSimpan: data.pembelianBarang.biayaSimpan
		}
	}
</script>

{#if !data.pembelianBarang}
	<p class="p-4 text-red-600">Data produk tidak ditemukan</p>
{:else}
	<div class="flex justify-center p-4">
		<FormEditPembelian
			data={data.form}
			supplierBarang={data.supplierBarang}
			namaBarang={data.namaBarang}
			message={data.message}
		/>
	</div>
{/if}
