<script lang="ts">
	import type { PageData } from './$types'
	import FormEdit from './FormEditKategori.svelte'

	export let data: PageData

	if (data.kategoriBarang) {
		data.form.data.idKategori = data.kategoriBarang.idKategori
		data.form.data.namaKategori = data.kategoriBarang.namaKategori
	}
</script>

{#if !data.kategoriBarang}
	<p>Data barang tidak ditemukan</p>
{:else}
	<div class="flex justify-center">
		<FormEdit data={data.form} id={data.namaKategori.id} />
	</div>
{/if}
