<script lang="ts">
	import { page } from '$app/stores'
	import AppSidebar from '$lib/components/app-sidebar.svelte'
	import * as Breadcrumb from '$lib/components/ui/breadcrumb'
	import { Separator } from '$lib/components/ui/separator'
	import * as Sidebar from '$lib/components/ui/sidebar'
	import { adminNavMenu } from '$lib/data/navbar'
	import type { Snippet } from 'svelte'
	import type { PageData } from './$types'

	let { data, children }: { data: PageData; children: Snippet } = $props()

	const user = {
		name: data.session.username,
		username: data.session.username,
		avatar: '/favicon.png'
	}

	let url = $derived($page.url.pathname)
	let searchParams = $derived($page.url.search)
	let urlsPath = $derived(url.split('/').filter((url) => url !== ''))
</script>

<Sidebar.Provider>
	<AppSidebar {user} navMenu={adminNavMenu} />
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						{#each urlsPath as url, index}
							<Breadcrumb.Item>
								<Breadcrumb.Link
									href={urlsPath.length === index + 1
										? `/${urlsPath.slice(0, index + 1).join('/')}${searchParams}`
										: `/${urlsPath.slice(0, index + 1).join('/')}`}
									aria-label="Go to {url.toUpperCase()}"
								>
									{url}
								</Breadcrumb.Link>
							</Breadcrumb.Item>
							{#if urlsPath.length !== index + 1}
								<Breadcrumb.Separator />
							{/if}
						{/each}
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
