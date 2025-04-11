<script lang="ts">
	import { ModeWatcher } from 'mode-watcher'
	import { Toaster } from 'svelte-sonner'
	import '../app.css'
	let { children } = $props()
</script>

{@render children()}
<ModeWatcher />
<Toaster position="top-right" richColors={true} closeButton={true} />
