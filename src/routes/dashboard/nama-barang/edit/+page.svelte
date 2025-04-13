<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import NamaBarangEditForm from './FormEditBarang.svelte'

	export let data: PageData
	export let form: ActionData & { message?: string }

	if (data.namaBarang) {
		data.form.data.idDaftarBarang = data.namaBarang.idDaftarBarang
		data.form.data.namaBarang = data.namaBarang.namaBarang
	}
</script>

{#if !data.namaBarang}
	<p>Data barang tidak ditemukan</p>
{:else}
	<div class="flex justify-center">
		<NamaBarangEditForm data={data.form} message={form?.message} id={data.namaBarang.id} />
	</div>
{/if}
