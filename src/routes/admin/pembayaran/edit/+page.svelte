<script lang="ts">
	import type { PageData } from './$types'
	import EditPembayaranForm from './EditPembayaranForm.svelte'

	let { data }: { data: PageData } = $props()

	if (data.payment) {
		data.form.data.name = data.payment.name
		data.form.data.price = data.payment.price
	}
</script>

<div class="flex w-full justify-center">
	<EditPembayaranForm data={data.form} />
</div>
