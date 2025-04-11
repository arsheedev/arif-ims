<script lang="ts">
	import RegisterForm from '$lib/components/register-form.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<div class="flex h-screen w-full items-center justify-center px-4">
	<RegisterForm data={data.form} />
</div>
