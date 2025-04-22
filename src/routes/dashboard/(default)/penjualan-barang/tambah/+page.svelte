<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import FormTambahPenjualan from './FormTambahPenjualan.svelte'

	export let data: PageData
	export let form: ActionData
</script>

<div class="flex justify-center">
	<FormTambahPenjualan data={data.form} namaBarang={data.namaBarang} message={form?.message} />
</div>
