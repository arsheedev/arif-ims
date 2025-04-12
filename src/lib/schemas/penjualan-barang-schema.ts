import { z } from 'zod'

const PenjualanBarangSchema = z.object({
	idPenjualan: z.string().min(1, 'ID penjualan diperlukan!'),
	kodeTransaksiPenjualan: z.string().min(1, 'Kode transaksi penjualan diperlukan!'),
	namaBarangId: z.coerce.number({ message: 'ID nama barang diperlukan!' }),
	tanggalPenjualan: z.coerce.date({ message: 'Tanggal penjualan diperlukan!' }),
	jumlah: z.coerce.number({ message: 'Jumlah penjualan barang diperlukan!' })
})

export default PenjualanBarangSchema
