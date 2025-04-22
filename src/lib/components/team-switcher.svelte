<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js'
	import GalleryVerticalEnd from 'lucide-svelte/icons/gallery-vertical-end'
	import ThemeToggle from './theme-toggle.svelte'

	// This should be `Component` after lucide-svelte updates types
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<Sidebar.MenuButton
			size="lg"
			class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
		>
			<div
				class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
			>
				<GalleryVerticalEnd class="size-4" />
			</div>
			<div class="grid flex-1 text-left text-sm leading-tight">
				<span class="truncate font-semibold"> Toko Barokah </span>
				<span class="truncate text-xs">Pengelolaan Stok Barang</span>
			</div>
			<ThemeToggle />
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
</Sidebar.Menu>
