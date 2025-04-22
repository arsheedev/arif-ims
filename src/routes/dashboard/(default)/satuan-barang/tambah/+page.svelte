<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import FormTambahSatuan from './FormTambahSatuan.svelte'

	export let data: PageData
	export let form: ActionData
</script>

<div class="flex justify-center">
	<FormTambahSatuan data={data.form} message={form?.message} />
</div>
