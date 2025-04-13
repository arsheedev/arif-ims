<script lang="ts">
	import type { PageData } from './$types'
	import FormEditSupplier from './FormEditSupplier.svelte'

	export let data: PageData

	if (data.supplierBarang) {
		data.form.data.idSupplier = data.supplierBarang.idSupplier
		data.form.data.nama = data.supplierBarang.nama
		data.form.data.alamat = data.supplierBarang.alamat
		data.form.data.noTelepon = data.supplierBarang.noTelepon
		data.form.data.noFax = data.supplierBarang.noFax ?? undefined
		data.form.data.email = data.supplierBarang.email ?? undefined
	}
</script>

{#if !data.supplierBarang}
	<p>Data barang tidak ditemukan</p>
{:else}
	<div class="flex justify-center">
		<FormEditSupplier data={data.form} id={data.supplierBarang.id} />
	</div>
{/if}
