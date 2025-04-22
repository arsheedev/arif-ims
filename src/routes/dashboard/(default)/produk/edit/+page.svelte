<script lang="ts">
	import type { PageData } from './$types'
	import FormEditProduk from './FormEditProduk.svelte'

	export let data: PageData

	if (data.produk) {
		data.form.data = {
			idProduk: data.produk.idProduk,
			supplierBarangId: data.produk.supplierBarangId,
			namaBarangId: data.produk.namaBarangId,
			kategoriBarangId: data.produk.kategoriBarangId,
			satuanBarangId: data.produk.satuanBarangId,
			keterangan: data.produk.keterangan || undefined
		}
	}
</script>

{#if !data.produk}
	<p class="p-4 text-red-600">Data produk tidak ditemukan</p>
{:else}
	<div class="flex justify-center p-4">
		<FormEditProduk
			data={data.form}
			supplierBarang={data.supplierBarang}
			namaBarang={data.namaBarang}
			kategoriBarang={data.kategoriBarang}
			satuanBarang={data.satuanBarang}
			message={data.message}
		/>
	</div>
{/if}
