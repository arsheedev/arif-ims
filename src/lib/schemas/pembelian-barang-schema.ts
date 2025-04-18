import { z } from 'zod'

const PembelianBarangSchema = z.object({
	idPembelian: z.string().min(1, 'ID pembelian diperlukan!'),
	kodeTransaksiPembelian: z.string().min(1, 'Kode transaksi pembelian diperlukan!'),
	namaBarangId: z.coerce.number({ message: 'ID nama barang diperlukan!' }),
	tanggalPembuatan: z.coerce.date({ message: 'Tanggal pembuatan diperlukan!' }),
	tanggalPembelian: z.coerce.date({ message: 'Tanggal pembelian diperlukan!' }),
	supplierBarangId: z.coerce.number({ message: 'ID supplier barang diperlukan!' }),
	jumlah: z.coerce.number({ message: 'Jumbal barang pembelian diperlukan!' }),
	biayaPesan: z.coerce.number({ message: 'Harga beli diperlukan!' }),
	biayaSimpan: z.coerce.number({ message: 'Harga jual diperlukan!' })
})

export default PembelianBarangSchema
