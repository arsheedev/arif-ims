<script lang="ts">
	import { enhance } from '$app/forms'
	import * as Table from '$lib/components/ui/table'
	import { cn } from '$lib/utils'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<Table.Root>
	<Table.Caption>A list of users.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>ID</Table.Head>
			<Table.Head>Nama</Table.Head>
			<Table.Head>Wali Santri</Table.Head>
			<Table.Head>Username</Table.Head>
			<Table.Head>Status</Table.Head>
			<Table.Head>Edit</Table.Head>
			<Table.Head>Hapus</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.users as user}
			<Table.Row>
				<Table.Cell>{user.id}</Table.Cell>
				<Table.Cell>{user.name}</Table.Cell>
				<Table.Cell>{user.waliSantri?.name}</Table.Cell>
				<Table.Cell>{user.username}</Table.Cell>
				<Table.Cell>
					<form method="POST" action="?/verify" use:enhance>
						<input type="hidden" name="id" value={user.id} />
						<button class={cn('text-red-400', { 'text-green-400': user.verified })}>
							{user.verified ? 'Terverifikasi' : 'Perlu Verifikasi'}
						</button>
					</form>
				</Table.Cell>
				<Table.Cell>
					<a href="/admin/user/edit?id={user.id}">Edit</a>
				</Table.Cell>
				<Table.Cell>
					<form method="POST" action="?/delete" use:enhance>
						<input type="hidden" name="id" value={user.id} />
						<button>Hapus</button>
					</form>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
