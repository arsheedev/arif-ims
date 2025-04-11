<script lang="ts">
	import * as Form from '$lib/components/ui/form/'
	import { Input } from '$lib/components/ui/input'
	import LoginUserSchema from '$lib/schemas/login-user'
	import { toast } from 'svelte-sonner'
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'

	let { data }: { data: SuperValidated<Infer<typeof LoginUserSchema>> } = $props()

	let loading = $state(false)

	const form = superForm(data, {
		validators: zodClient(LoginUserSchema),
		onSubmit() {
			loading = true
		},
		onResult({ result }) {
			loading = false

			if (result.type === 'failure') {
				return toast.error(result.data?.message || 'Semething went wrong!')
			}

			if (result.type === 'redirect') {
				return toast.success('Berhasil login!')
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
	<Form.Field {form} name="username">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Username</Form.Label>
				<Input {...props} bind:value={$formData.username} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password</Form.Label>
				<Input {...props} type="password" bind:value={$formData.password} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>
