<script lang="ts">
	import NavMain from '$lib/components/nav-main.svelte'
	import NavUser from '$lib/components/nav-user.svelte'
	import TeamSwitcher from '$lib/components/team-switcher.svelte'
	import * as Sidebar from '$lib/components/ui/sidebar/index.js'
	import { type AdminNavMenutype } from '$lib/data/navbar'
	import type { ComponentProps } from 'svelte'

	interface UserInterface {
		name: string
		username: string
		avatar: string
	}

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		user,
		navMenu,
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & {
		user: UserInterface
		navMenu: AdminNavMenutype
	} = $props()
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={navMenu} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser {user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
