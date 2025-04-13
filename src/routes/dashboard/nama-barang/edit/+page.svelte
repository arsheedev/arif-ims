<script lang="ts">
	import type { ActionData, PageData } from './$types'
	import FormEdit from './FormEditBarang.svelte'

	export let data: PageData
	export let form: ActionData
</script>

<div class="flex justify-center">
	<FormEdit data={data.form} message={form?.message} />
</div>
