<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import FormTambahKategori from './FormTambah.svelte'

	export let data: PageData
	export let form: ActionData
</script>

<div class="flex justify-center">
	<FormTambahKategori data={data.form} message={form?.message} />
</div>
