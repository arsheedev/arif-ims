<script lang="ts">
	import * as Table from '$lib/components/ui/table'
	import { cn, formatDate } from '$lib/utils'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<Table.Root>
	<Table.Caption>A list of user payments.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>ID</Table.Head>
			<Table.Head>Status</Table.Head>
			<Table.Head>Diterima</Table.Head>
			<Table.Head>Dibuat</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#if data.payments}
			{#each data.payments as payment}
				<Table.Row>
					<Table.Cell>{payment.id}</Table.Cell>
					<Table.Cell
						class={cn('text-yellow-400', {
							'text-green-400': payment.status === 'DIBAYAR',
							'text-orange-400': payment.status === 'DIBATALKAN',
							'text-red-400': payment.status === 'GAGAL'
						})}>{payment.status}</Table.Cell
					>
					<Table.Cell>
						{#if payment.acceptedAt}
							{formatDate.format(payment.acceptedAt)}
						{:else}
							-
						{/if}
					</Table.Cell>
					<Table.Cell>{formatDate.format(payment.createdAt)}</Table.Cell>
				</Table.Row>
			{/each}
		{/if}
	</Table.Body>
</Table.Root>
