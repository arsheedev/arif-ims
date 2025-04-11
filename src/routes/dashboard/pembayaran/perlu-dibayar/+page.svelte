<script lang="ts">
	import * as Table from '$lib/components/ui/table'
	import { formatDate, IDR } from '$lib/utils'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<Table.Root>
	<Table.Caption>A list of users.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>ID</Table.Head>
			<Table.Head>Pembayaran</Table.Head>
			<Table.Head>Jumlah (Rp)</Table.Head>
			<Table.Head>deadline</Table.Head>
			<Table.Head>Bayar</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		<Table.Row>
			{#if data.payments}
				{#each data.payments as payment}
					<Table.Cell>{payment.id}</Table.Cell>
					<Table.Cell>{payment.name}</Table.Cell>
					<Table.Cell>{IDR.format(payment.price)}</Table.Cell>
					<Table.Cell>{formatDate.format(payment.deadline)}</Table.Cell>
					<Table.Cell>
						<a href="/dashboard/pembayaran/perlu-dibayar/bayar?id={payment.id}">Bayar</a>
					</Table.Cell>
				{/each}
			{/if}
		</Table.Row>
	</Table.Body>
</Table.Root>
