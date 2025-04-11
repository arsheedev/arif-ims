<script lang="ts">
	import { Label } from '$lib/components/ui/label'
	import type { PageData } from './$types'
	import ConfirmPaymentForm from './ConfirmPaymentForm.svelte'

	let { data }: { data: PageData } = $props()

	if (data.payment) {
		data.form.data.status = data.payment.status
	}
</script>

{#if !data.payment}
	<p>404 not found</p>
{:else}
	<div class="flex w-full justify-center">
		<div class="w-[600px]">
			<Label>Bukti Pembayaran</Label>
			<img src={data.payment.imageUrl} alt={data.payment.id} class="w-36" />
			{#if data.payment.status !== 'DIBAYAR'}
				<ConfirmPaymentForm data={data.form} />
			{/if}
		</div>
	</div>
{/if}
