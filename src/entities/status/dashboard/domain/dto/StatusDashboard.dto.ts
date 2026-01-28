/**
 * Represents the data transfer object for the status dashboard.
 * It includes a total count and a detailed breakdown of statuses by category.
 */
export interface StatusDashboardDto {
	total: number
	status: {
		overall: Overall
		Laptops: Overall
		'Discos Duros': Overall
		Cornetas: Overall
		WebCam: Overall
		Computadoras: Overall
		Docking: Overall
		'Convertidor de VGA - HDMI': Overall
		Monitores: Overall
		'Impresoras Financieras': Overall
		Micrófono: Overall
		Mouses: Overall
		IPAD: Overall
		Celulares: Overall
		'Lapiz Optico': Overall
		Antenas: Overall
		Teclados: Overall
		Camaras: Overall
		'All in One': Overall
		BAMs: Overall
		Servidores: Overall
		'Cable USB': Overall
	}
}

/**
 * Represents a generic object mapping status names to their counts.
 */
export type Overall = Record<string, number>
