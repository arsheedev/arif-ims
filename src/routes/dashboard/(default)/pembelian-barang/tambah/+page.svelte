<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import FormTambahPembelian from './FormTambahPembelian.svelte'

	export let data: PageData
	export let form: ActionData
</script>

<div class="flex justify-center">
	<FormTambahPembelian
		data={data.form}
		namaBarang={data.namaBarang}
		supplierBarang={data.supplierBarang}
		message={form?.message}
	/>
</div>
