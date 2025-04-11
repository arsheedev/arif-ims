<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button'
	import { Calendar } from '$lib/components/ui/calendar'
	import * as Form from '$lib/components/ui/form/'
	import { Input } from '$lib/components/ui/input'
	import * as Popover from '$lib/components/ui/popover'
	import PaymentScehama from '$lib/schemas/payment-scema'
	import { cn } from '$lib/utils'
	import {
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		today,
		type DateValue
	} from '@internationalized/date'
	import CalendarIcon from 'lucide-svelte/icons/calendar'
	import { toast } from 'svelte-sonner'
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'

	let loading = $state(false)

	let { data }: { data: SuperValidated<Infer<typeof PaymentScehama>> } = $props()

	const form = superForm(data, {
		validators: zodClient(PaymentScehama),
		onSubmit() {
			loading = true
		},
		onResult({ result }) {
			loading = false

			if (result.type === 'failure') {
				return toast.error(result.data?.message || 'Semething went wrong!')
			}

			if (result.type === 'redirect') {
				return toast.success('Pembayaran berhasil ditambahkan!')
			}
		},
		onError() {
			loading = false

			return toast.error('Internal error!')
		}
	})

	const { form: formData, enhance } = form

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	})

	let value = $state<DateValue | undefined>()

	$effect(() => {
		value = $formData.deadline ? parseDate($formData.deadline) : undefined
	})

	let placeholder = $state<DateValue>(today(getLocalTimeZone()))
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

	<Form.Field {form} name="price">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Jumlah Pembayaran</Form.Label>
				<Input {...props} type="number" bind:value={$formData.price} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="deadline" class="flex flex-col">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Tanggal deadline</Form.Label>
				<Popover.Root>
					<Popover.Trigger
						{...props}
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'w-[280px] justify-start pl-4 text-left font-normal',
							!value && 'text-muted-foreground'
						)}
					>
						{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
						<CalendarIcon class="ml-auto size-4 opacity-50" />
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0" side="top">
						<Calendar
							type="single"
							value={value as DateValue}
							bind:placeholder
							minValue={today(getLocalTimeZone())}
							calendarLabel="Tanggal deadline"
							onValueChange={(v) => {
								if (v) {
									$formData.deadline = v.toString()
								} else {
									$formData.deadline = ''
								}
							}}
						/>
					</Popover.Content>
				</Popover.Root>
				<Form.FieldErrors />
				<input hidden value={$formData.deadline} name={props.name} />
			{/snippet}
		</Form.Control>
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>
