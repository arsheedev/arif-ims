<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import FormTambahSupplier from './FormTambahSupplier.svelte'

	export let data: PageData
	export let form: ActionData
</script>

<div class="flex justify-center">
	<FormTambahSupplier data={data.form} message={form?.message} />
</div>
