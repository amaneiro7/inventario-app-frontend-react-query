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

export type Overall = Record<string, number>

// export interface Overall {
// 	'En Almacen': number
// 	Desincorporado: number
// 	Disponible: number
// 	'En Uso': number
// 	'Por Desincorporar': number
// 	Contingencia: number
// 	Préstamo?: number
// 	Guardia?: number
// }
