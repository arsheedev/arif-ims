import BookOpen from 'lucide-svelte/icons/book-open'
import Bot from 'lucide-svelte/icons/bot'
import SquareTerminal from 'lucide-svelte/icons/square-terminal'
import Database from 'lucide-svelte/icons/database'

export type AdminNavMenutype = {
	title: string
	url: string
	icon: typeof SquareTerminal | typeof BookOpen | typeof Bot
	isActive?: boolean
	items: {
		title: string
		url: string
	}[]
}[]

export const adminNavMenu: AdminNavMenutype = [
	{
		title: 'User',
		url: '/admin/user',
		icon: SquareTerminal,
		items: [
			{
				title: 'Semua User',
				url: '/admin/user'
			},
			{
				title: 'Perlu Verifikasi',
				url: '/admin/user?verified=false'
			}
		]
	},
	{
		title: 'Pembayaran',
		url: '/admin/pembayaran',
		icon: Bot,
		items: [
			{
				title: 'Semua Pembayaran',
				url: '/admin/pembayaran'
			}
		]
	},
	{
		title: 'Pembayaran User',
		url: '/admin/pembayaran-user',
		icon: BookOpen,
		items: [
			{
				title: 'Histori Pembayaran',
				url: '/admin/pembayaran-user'
			},
			{
				title: 'Perlu Verifikasi',
				url: '/admin/pembayaran-user?verified=false'
			}
		]
	}
]

export const userNavMenu: AdminNavMenutype = [
	{
		title: 'Data Master',
		url: '/admin/data-master',
		icon: Database,
		items: [
			{
				title: 'Data Barang',
				url: '/admin/data-barang'
			},
			{
				title: 'Data Produk',
				url: '/admin/data-produk'
			},
			{
				title: 'Data Pembelian',
				url: '/admin/data-pembelian'
			},
			{
				title: 'Data Penjual',
				url: '/admin/data-penjual'
			},
			{
				title: 'Data Kategori',
				url: '/admin/data-kategori'
			},
			{
				title: 'Data Satuan',
				url: '/admin/data-satuan'
			},
			{
				title: 'Data Supplier',
				url: '/admin/data-supplier'
			}
		]
	},
	{
		title: 'Transaksi',
		url: '/admin/transaksi',
		icon: Bot,
		items: [
			{
				title: 'Pembelian',
				url: '/admin/pembelian'
			},
			{
				title: 'Penjualan',
				url: '/admin/penjualan'
			}
		]
	},
	{
		title: 'Perhitungan',
		url: '/admin/perhitungan',
		icon: BookOpen,
		items: [
			{
				title: 'Perhitungan EOQ',
				url: '/admin/perhitungan-eoq'
			}
		]
	},
	{
		title: 'Laporan',
		url: '/admin/laporan',
		icon: BookOpen,
		items: [
			{
				title: 'Stok Barang',
				url: '/admin/stok-barang'
			},
			{
				title: 'Pembelian',
				url: '/admin/pembelian'
			},
			{
				title: 'Penjualan',
				url: '/admin/penjualan'
			},
			{
				title: 'EOQ',
				url: '/admin/eoq'
			}
		]
	}
]
