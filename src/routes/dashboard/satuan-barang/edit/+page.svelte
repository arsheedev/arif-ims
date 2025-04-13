<script lang="ts">
	import type { PageData } from './$types'
	import FormEditSatuan from './FormEditSatuan.svelte'

	export let data: PageData

	if (data.satuanBarang) {
		data.form.data.idSatuan = data.satuanBarang.idSatuan
		data.form.data.namaSatuan = data.satuanBarang.namaSatuan
	}
</script>

{#if !data.satuanBarang}
	<p>Data barang tidak ditemukan</p>
{:else}
	<div class="flex justify-center">
		<FormEditSatuan data={data.form} id={data.satuanBarang.id} />
	</div>
{/if}
