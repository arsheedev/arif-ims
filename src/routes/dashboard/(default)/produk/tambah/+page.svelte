<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import FormTambahProduk from './FormTambahProduk.svelte'

	export let data: PageData
	export let form: ActionData
</script>

<div class="flex justify-center">
	<FormTambahProduk
		data={data.form}
		kategoriBarang={data.kategoriBarang}
		namaBarang={data.namaBarang}
		satuanBarang={data.satuanBarang}
		supplierBarang={data.supplierBarang}
		message={form?.message}
	/>
</div>
