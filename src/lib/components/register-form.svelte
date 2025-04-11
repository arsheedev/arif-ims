<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import * as Form from '$lib/components/ui/form/'
	import { Input } from '$lib/components/ui/input'
	import RegisterUserSchema from '$lib/schemas/register-user'
	import { toast } from 'svelte-sonner'
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms'
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
				return toast.success('Silahkan hubungi admin untuk memverifikasi akun!')
			}
		},
		onError() {
			loading = false

			return toast.error('Internal error!')
		}
	})

	const { form: formData, enhance } = form
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Masukan username dan password untuk login.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid gap-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<div class="grid gap-2">
								<Form.Label>Nama</Form.Label>
								<Input {...props} bind:value={$formData.name} />
							</div>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="username">
					<Form.Control>
						{#snippet children({ props })}
							<div class="grid gap-2">
								<Form.Label>Username</Form.Label>
								<Input {...props} bind:value={$formData.username} />
							</div>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<div class="grid gap-2">
								<div class="flex items-center">
									<Form.Label>Password</Form.Label>
								</div>
								<Input {...props} type="password" bind:value={$formData.password} />
							</div>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="confirmPassword">
					<Form.Control>
						{#snippet children({ props })}
							<div class="grid gap-2">
								<div class="flex items-center">
									<Form.Label>Masukan Ulang Password</Form.Label>
								</div>
								<Input {...props} type="password" bind:value={$formData.confirmPassword} />
							</div>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="santriName">
					<Form.Control>
						{#snippet children({ props })}
							<div class="grid gap-2">
								<Form.Label>Nama santri</Form.Label>
								<Input {...props} bind:value={$formData.santriName} />
							</div>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Button class="w-full">Login</Form.Button>

				<div class="mt-4 text-center text-sm">
					Sudah punya akun?
					<a href="/" class="underline">Login</a>
				</div>
			</div>
		</form>
	</Card.Content>
</Card.Root>
