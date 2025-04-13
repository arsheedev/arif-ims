import { z } from 'zod'

const ProdukSchema = z.object({
	idProduk: z.string().min(1, 'ID produk diperlukan!'),
	supplierBarangId: z.coerce.number({ message: 'ID supplier barang diperlukan!' }),
	namaBarangId: z.coerce.number({ message: 'ID nama barang diperlukan!' }),
	kategoriBarangId: z.coerce.number({ message: 'ID kategori barang diperlukan!' }),
	satuanBarangId: z.coerce.number({ message: 'ID satuan barang diperlukan!' }),
	hargaBeli: z.coerce.number({ message: 'Harga beli diperlukan!' }),
	hargaJual: z.coerce.number({ message: 'Harga jual diperlukan!' }),
	keterangan: z.string().optional()
})

export default ProdukSchema
