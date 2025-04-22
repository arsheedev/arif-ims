<script lang="ts">
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	onMount(() => {
		window.print()
		goto('/dashboard/pembelian-barang')
	})
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>
