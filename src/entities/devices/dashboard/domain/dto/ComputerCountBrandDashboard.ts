/**
 * @interface ComputerCountBrandDashboardDto
 * @description Representa los datos de una marca en el dashboard de computadoras.
 * @property {string} name - Nombre de la marca.
 * @property {number} count - Cantidad de dispositivos de esa marca.
 * @property {Model[]} model - Modelos asociados a la marca.
 */
export interface ComputerCountBrandDashboardDto {
	// name: string
	// count: number
	// model: Model[]
	id: string
	name: string
	category: string
	brand: string
	count: number
	inUse: number
	inAlmacen: number
	status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

export interface ModelData {
	id: string
	name: string
	category: string
	brand: string
	count: number
	inUse: number
	inAlmacen: number
	status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

/**
 * @interface Model
 * @description Representa un modelo de dispositivo en el dashboard de computadoras.
 * @property {string} name - Nombre del modelo.
 * @property {string} category - Categoría del modelo.
 * @property {number} count - Cantidad de dispositivos de ese modelo.
 * @property {TypeOfSite[]} typeOfSite - Tipos de sitio asociados al modelo.
 */
export interface Model {
	name: string
	category: string
	count: number
	typeOfSite: TypeOfSite[]
}

/**
 * @interface TypeOfSite
 * @description Representa un tipo de sitio en el dashboard de computadoras.
 * @property {string} name - Nombre del tipo de sitio.
 * @property {number} count - Cantidad de dispositivos en ese tipo de sitio.
 */
interface TypeOfSite {
	name: string
	count: number
}
