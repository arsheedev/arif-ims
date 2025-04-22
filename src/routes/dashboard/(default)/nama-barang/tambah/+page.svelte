<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import FormTambah from './FormTambah.svelte'

	export let data: PageData
	export let form: ActionData
</script>

<div class="flex justify-center">
	<FormTambah data={data.form} message={form?.message} />
</div>
