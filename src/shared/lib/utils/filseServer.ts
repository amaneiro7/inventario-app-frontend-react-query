import { saveAs } from 'file-saver'
import { type Source } from '@/types/type'

export const fileSaver = (data: Blob | string, source: Source) => {
	const now = new Date()
	const filename = `Reporte-Inventario-${source}${now
		.toLocaleString()
		.replace(/[/:]/g, '-')}.xlsx`
	return saveAs(data, filename)
}
