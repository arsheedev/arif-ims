<script lang="ts">
	import type { PageData } from './$types'
	import FormEdit from './FormEditBarang.svelte'

	export let data: PageData

	// Isi form data jika ada namaBarang
	if (data.namaBarang) {
		data.form.data.idDaftarBarang = data.namaBarang.idDaftarBarang
		data.form.data.namaBarang = data.namaBarang.namaBarang
	}
</script>

{#if !data.namaBarang}
	<p>Data barang tidak ditemukan</p>
{:else}
	<div class="flex justify-center">
		<FormEdit data={data.form} id={data.namaBarang.id} />
	</div>
{/if}
