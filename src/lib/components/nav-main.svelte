<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js'
	import * as Sidebar from '$lib/components/ui/sidebar/index.js'
	import type { AdminNavMenutype } from '$lib/data/navbar'
	import ChevronRight from 'lucide-svelte/icons/chevron-right'
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart'
	import HandCoins from 'lucide-svelte/icons/hand-coins'
	import { Button } from '$lib/components/ui/button/index.js'

	let {
		items
	}: {
		items: AdminNavMenutype
	} = $props()
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Main Menu</Sidebar.GroupLabel>
	<div class="mb-6 mt-4 space-y-2 px-3">
		<Button
			href="/dashboard/pembelian-barang"
			class="flex w-full items-center gap-2 bg-green-600 text-white hover:bg-green-700"
		>
			<ShoppingCart class="h-4 w-4" />
			Tambah Pembelian
		</Button>
		<Button
			href="/dashboard/penjualan-barang"
			class="flex w-full items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
		>
			<HandCoins class="h-4 w-4" />
			Tambah Penjualan
		</Button>
	</div>
	<Sidebar.Menu>
		{#each items as mainItem (mainItem.title)}
			<Collapsible.Root open={mainItem.isActive} class="group/collapsible">
				{#snippet child({ props })}
					<Sidebar.MenuItem {...props}>
						<Collapsible.Trigger>
							{#snippet child({ props })}
								<Sidebar.MenuButton {...props}>
									{#snippet tooltipContent()}
										{mainItem.title}
									{/snippet}
									{#if mainItem.icon}
										<mainItem.icon />
									{/if}
									<span>{mainItem.title}</span>
									<ChevronRight
										class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
									/>
								</Sidebar.MenuButton>
							{/snippet}
						</Collapsible.Trigger>
						<Collapsible.Content>
							{#if mainItem.items}
								<Sidebar.MenuSub>
									{#each mainItem.items as subItem (subItem.title)}
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton>
												{#snippet child({ props })}
													<a href={subItem.url} {...props}>
														<span>{subItem.title}</span>
													</a>
												{/snippet}
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									{/each}
								</Sidebar.MenuSub>
							{/if}
						</Collapsible.Content>
					</Sidebar.MenuItem>
				{/snippet}
			</Collapsible.Root>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
