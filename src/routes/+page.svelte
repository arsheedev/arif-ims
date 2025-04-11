<script lang="ts">
	import LoginForm from '$lib/components/login-form.svelte'
	import type { PageData } from './$types'
	let { data }: { data: PageData } = $props()
</script>

<div class="flex h-screen w-full items-center justify-center px-4">
	<LoginForm data={data.form} />
</div>
