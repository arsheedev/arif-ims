<script lang="ts">
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()
</script>

<form method="POST">
	<select name="namaBarangId" id="namaBarangId">
		{#each data.namaBarang as barang}
			<option value={barang.id}>{barang.namaBarang}</option>
		{/each}
	</select>
	<button type="submit">Submit</button>
</form>

<pre>{JSON.stringify(form, null, 2)}</pre>
