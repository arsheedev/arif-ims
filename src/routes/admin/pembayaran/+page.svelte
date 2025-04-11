<script lang="ts">
	import { enhance } from '$app/forms'
	import * as Table from '$lib/components/ui/table'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<a href="/admin/pembayaran/tambah">Tambah</a>
<Table.Root>
	<Table.Caption>A list of users.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>ID</Table.Head>
			<Table.Head>Nama</Table.Head>
			<Table.Head>Jumlah</Table.Head>
			<Table.Head>Deadline</Table.Head>
			<Table.Head>Edit</Table.Head>
			<Table.Head>Hapus</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.payments as payment}
			<Table.Row>
				<Table.Cell>{payment.id}</Table.Cell>
				<Table.Cell>{payment.name}</Table.Cell>
				<Table.Cell>{payment.price}</Table.Cell>
				<Table.Cell>{payment.deadline.toDateString()}</Table.Cell>
				<Table.Cell>
					<a href="/admin/pembayaran/edit?id={payment.id}">Edit</a>
				</Table.Cell>
				<Table.Cell>
					<form method="POST" use:enhance>
						<input type="hidden" name="id" value={payment.id} />
						<button>Hapus</button>
					</form>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
