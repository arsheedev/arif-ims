<script lang="ts">
	import type { PageData } from './$types'
	import TambahPembayaranForm from './TambahPembayaranForm.svelte'

	let { data }: { data: PageData } = $props()
</script>

<div class="flex w-full justify-center">
	<TambahPembayaranForm data={data.form} />
</div>
