<script lang="ts">
	import * as Form from '$lib/components/ui/form'
	import * as Select from '$lib/components/ui/select'
	import ConfirmPaymentSchema from '$lib/schemas/confirm-payment'
	import { toast } from 'svelte-sonner'
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'

	let { data }: { data: SuperValidated<Infer<typeof ConfirmPaymentSchema>> } = $props()

	let loading = $state(false)

	const form = superForm(data, {
		validators: zodClient(ConfirmPaymentSchema),
		onSubmit() {
			loading = true
		},
		onResult({ result }) {
			loading = false

			if (result.type === 'failure') {
				return toast.error(result.data?.message || 'Semething went wrong!')
			}

			if (result.type === 'redirect') {
				return toast.success('Pembayaran telah dikonfirmasi!')
			}
		},
		onError() {
			loading = false

			return toast.error('Internal error!')
		}
	})

	const { form: formData, enhance } = form
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="status">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Status</Form.Label>
				<Select.Root type="single" bind:value={$formData.status} name={props.name}>
					<Select.Trigger {...props}>
						{$formData.status ? $formData.status : 'Select a status'}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="DIPROSES" label="DIPROSES" />
						<Select.Item value="DIBAYAR" label="DIBAYAR" />
						<Select.Item value="GAGAL" label="GAGAL" />
						<Select.Item value="DIBATALKAN" label="DIBATALKAN" />
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
