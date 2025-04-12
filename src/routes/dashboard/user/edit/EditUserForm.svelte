<script lang="ts">
	import * as Form from '$lib/components/ui/form/'
	import { Input } from '$lib/components/ui/input'
	import RegisterUserSchema from '$lib/schemas/register-user'
	import { toast } from 'svelte-sonner'
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'

	let { data }: { data: SuperValidated<Infer<typeof RegisterUserSchema>> } = $props()

	let loading = $state(false)

	const form = superForm(data, {
		validators: zodClient(RegisterUserSchema),
		onSubmit() {
			loading = true
		},
		onResult({ result }) {
			loading = false

			if (result.type === 'failure') {
				return toast.error(result.data?.message || 'Semething went wrong!')
			}

			if (result.type === 'redirect') {
				return toast.success('User berhasil diupdate!')
			}
		},
		onError() {
			loading = false

			return toast.error('Internal error!')
		}
	})

	const { form: formData, enhance } = form
</script>

<form method="POST" class="w-[600px]" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Nama</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

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

	<Form.Field {form} name="confirmPassword">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Masukan ulang password</Form.Label>
				<Input {...props} type="password" bind:value={$formData.confirmPassword} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="santriName">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Nama santri</Form.Label>
				<Input {...props} bind:value={$formData.santriName} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>
