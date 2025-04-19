import BookOpen from 'lucide-svelte/icons/book-open'
import Bot from 'lucide-svelte/icons/bot'
import SquareTerminal from 'lucide-svelte/icons/square-terminal'
import Database from 'lucide-svelte/icons/database'
import ListOrdered from 'lucide-svelte/icons/list-ordered'

export type AdminNavMenutype = {
	title: string
	url: string
	icon: typeof SquareTerminal | typeof BookOpen | typeof Bot | typeof Database | typeof ListOrdered
	isActive?: boolean
	items: {
		title: string
		url: string
	}[]
}[]

export const userNavMenu: AdminNavMenutype = [
	{
		title: 'Data Master',
		url: '/admin/data-master',
		icon: Database,
		items: [
			{
				title: 'Data Barang',
				url: '/dashboard/nama-barang'
			},
			{
				title: 'Data Produk',
				url: '/dashboard/produk'
			},
			{
				title: 'Data Pembelian',
				url: '/dashboard/pembelian-barang'
			},
			{
				title: 'Data Penjualan',
				url: '/dashboard/penjualan-barang'
			},
			{
				title: 'Data Kategori',
				url: '/dashboard/kategori-barang'
			},
			{
				title: 'Data Satuan',
				url: '/dashboard/satuan-barang'
			},
			{
				title: 'Data Supplier',
				url: '/dashboard/supplier-barang'
			}
		]
	},
	{
		title: 'Perhitungan',
		url: '/dashboard/perhitungan',
		icon: BookOpen,
		items: [
			{
				title: 'Perhitungan EOQ',
				url: '/dashboard/perhitungan-eoq'
			}
		]
	},
	{
		title: 'Manajemen Stok',
		url: '/dashboard/stok',
		icon: ListOrdered,
		items: [
			{
				title: 'Tabel FIFO',
				url: '/dashboard/tabel-fifo'
			}
		]
	}
]
