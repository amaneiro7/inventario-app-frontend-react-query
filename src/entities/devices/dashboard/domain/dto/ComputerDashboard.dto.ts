/**
 * @interface ComputerDashboardDto
 * @description Data Transfer Object for the computer-specific dashboard.
 * Contains aggregated data about computer devices.
 */
export interface ComputerDashboardDto {
	total: number
	totalAgencies: number
	activeEmployees: number
	status: Status[]
	category: Category[]
	brand: Brand[]
	region: Regions[]
	hardDrive: HardDrive[]
	operatingSystem: OperatingSystem[]
	memoryRamCapacity: MemoryRamCapacity[]
	modulosMemoryRam: ModulosMemoryRam[]
	operatingSystemByRegion: OperatingSystemByRegion[]
}

/**
 * @interface Brand
 * @description Representa los datos de una marca en el dashboard de computadoras.
 * @property {string} name - Nombre de la marca.
 * @property {number} count - Cantidad de dispositivos de esa marca.
 * @property {Model[]} model - Modelos asociados a la marca.
 */
export interface Brand {
	name: string
	count: number
	model: Model[]
}

/**
 * @interface Status
 * @description Representa el estado de un dispositivo en el dashboard de computadoras.
 * @property {string} name - Nombre del estado.
 * @property {number} count - Cantidad de dispositivos con ese estado.
 */
export interface Status {
	name: string
	count: number
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
 * @interface Category
 * @description Representa un tipo de categoria en el dashboard de computadoras.
 * @property {string} name - Nombre de la categoria
 * @property {number} count - Cantidad de dispositivos en esta categoria
 * @property {TypeOfSite[]} typeOfSite - Tipos de sitio asociados al modelo.
 */
export interface Category {
	name: string
	count: number
	typeOfSite: TypeOfSite[]
}

/**
 * @interface TypeOfSite
 * @description Representa un tipo de sitio en el dashboard de computadoras.
 * @property {string} name - Nombre del tipo de sitio.
 * @property {number} count - Cantidad de dispositivos en ese tipo de sitio.
 */
export interface TypeOfSite {
	name: string
	count: number
}

/**
 * @interface TypeOfSiteCount
 * @description Conteo de dispositivos por tipo de sitio (Agencia, Sede Administrativa).
 * @property {number} [Agencia] - Cantidad de dispositivos en agencias.
 * @property {number} ['Sede Administrativa'] - Cantidad de dispositivos en sedes administrativas.
 */
export interface TypeOfSiteCount {
	Agencia?: number
	'Sede Administrativa'?: number
}

/**
 * @interface Regions
 * @description Representa una región geográfica en el dashboard de computadoras.
 * @property {string} name - Nombre de la región.
 * @property {number} count - Cantidad total de dispositivos en la región.
 * @property {TypeOfSiteCount} typeOfSiteCount - Conteo de dispositivos por tipo de sitio dentro de la región.
 * @property {Region[]} regions - Sub-regiones dentro de esta región.
 */
export interface Regions {
	name: string
	count: number
	typeOfSiteCount: TypeOfSiteCount
	regions: Region[]
}

/**
 * @interface Region
 * @description Representa una sub-región en el dashboard de computadoras.
 * @property {string} name - Nombre de la sub-región.
 * @property {number} count - Cantidad total de dispositivos en la sub-región.
 * @property {TypeOfSiteCount} typeOfSiteCount - Conteo de dispositivos por tipo de sitio dentro de la sub-región.
 * @property {State[]} states - Estados dentro de esta sub-región.
 */
export interface Region {
	name: string
	count: number
	typeOfSiteCount: TypeOfSiteCount
	states: State[]
}

/**
 * @interface State
 * @description Representa un estado en el dashboard de computadoras.
 * @property {string} name - Nombre del estado.
 * @property {number} count - Cantidad total de dispositivos en el estado.
 * @property {TypeOfSiteCount} typeOfSiteCount - Conteo de dispositivos por tipo de sitio dentro del estado.
 * @property {City[]} cities - Ciudades dentro de este estado.
 */
export interface State {
	name: string
	count: number
	typeOfSiteCount: TypeOfSiteCount
	cities: City[]
}

/**
 * @interface City
 * @description Representa una ciudad en el dashboard de computadoras.
 * @property {string} name - Nombre de la ciudad.
 * @property {number} count - Cantidad total de dispositivos en la ciudad.
 * @property {TypeOfSiteCount} typeOfSiteCount - Conteo de dispositivos por tipo de sitio dentro de la ciudad.
 * @property {Site[]} sites - Sitios dentro de esta ciudad.
 */
export interface City {
	name: string
	count: number
	typeOfSiteCount: TypeOfSiteCount
	sites: Site[]
}

/**
 * @interface Site
 * @description Representa un sitio en el dashboard de computadoras.
 * @property {string} name - Nombre del sitio.
 * @property {number} count - Cantidad total de dispositivos en el sitio.
 * @property {TypeOfSiteCount} typeOfSiteCount - Conteo de dispositivos por tipo de sitio dentro del sitio.
 * @property {Location[]} locations - Ubicaciones dentro de este sitio.
 */
export interface Site {
	name: string
	count: number
	typeOfSiteCount: TypeOfSiteCount
	locations: Location[]
}

/**
 * @interface Location
 * @description Representa una ubicación específica en el dashboard de computadoras.
 * @property {string} name - Nombre de la ubicación.
 * @property {number} count - Cantidad de dispositivos en la ubicación.
 * @property {string} typeOfSite - Tipo de sitio de la ubicación.
 */
export interface Location {
	name: string
	count: number
	typeOfSite: string
}

/**
 * @interface OperatingSystem
 * @description Representa un sistema operativo en el dashboard de computadoras.
 * @property {string} name - Nombre del sistema operativo.
 * @property {number} count - Cantidad de dispositivos con este sistema operativo.
 * @property {OperatingSystemArq[]} arq - Arquitecturas de sistema operativo asociadas.
 */
export interface OperatingSystem {
	name: string
	count: number
	arq: OperatingSystemArq[]
}

/**
 * @interface OperatingSystemArq
 * @description Representa una arquitectura de sistema operativo en el dashboard de computadoras.
 * @property {string} name - Nombre de la arquitectura.
 * @property {number} count - Cantidad de dispositivos con esta arquitectura.
 */
export interface OperatingSystemArq {
	name: string
	count: number
}

/**
 * @interface HardDrive
 * @description Representa un disco duro en el dashboard de computadoras.
 * @property {string} name - Nombre del disco duro.
 * @property {number} count - Cantidad de discos duros.
 * @property {HardDriveType[]} hddType - Tipos de disco duro asociados.
 */
export interface HardDrive {
	name: string
	count: number
	hddType: HardDriveType[]
}

/**
 * @interface HardDriveType
 * @description Representa un tipo de disco duro en el dashboard de computadoras.
 * @property {string} name - Nombre del tipo de disco duro.
 * @property {number} count - Cantidad de discos duros de este tipo.
 */
export interface HardDriveType {
	name: string
	count: number
}

/**
 * @interface OperatingSystemByRegion
 * @description Representa el desglose de sistemas operativos por región administrativa.
 * @property {string} name - Nombre de la región administrativa.
 * @property {number} count - Cantidad total de sistemas operativos en esta región.
 * @property {TypeOfSiteCount} typeOfSiteCount - Conteo de sistemas operativos por tipo de sitio.
 * @property {Regions[]} administrativeRegion - Regiones administrativas anidadas.
 */
export interface OperatingSystemByRegion {
	name: string
	count: number
	typeOfSiteCount: TypeOfSiteCount
	administrativeRegion: Regions[]
}

/**
 * @interface MemoryRamCapacity
 * @description Representa la capacidad de memoria RAM en el dashboard de computadoras.
 * @property {string} name - Nombre de la capacidad de memoria RAM (ej. "8GB").
 * @property {MemoryRamTotal[]} memoryRamTotal - Desglose total de memoria RAM.
 */
export interface MemoryRamCapacity {
	name: string
	memoryRamTotal: MemoryRamTotal[]
}

/**
 * @interface MemoryRamTotal
 * @description Representa el total de memoria RAM por tipo en el dashboard de computadoras.
 * @property {string} name - Nombre del tipo de memoria RAM.
 * @property {number} count - Cantidad total de memoria RAM de este tipo.
 */
export interface MemoryRamTotal {
	name: string
	count: number
}

/**
 * @interface ModulosMemoryRam
 * @description Representa los módulos de memoria RAM en el dashboard de computadoras.
 * @property {string} name - Nombre del módulo de memoria RAM.
 * @property {MemoryRamType[]} memoryRamType - Tipos de memoria RAM asociados a los módulos.
 */
export interface ModulosMemoryRam {
	name: string
	memoryRamType: MemoryRamType[]
}

/**
 * @interface MemoryRamType
 * @description Representa un tipo de memoria RAM en el dashboard de computadoras.
 * @property {string} name - Nombre del tipo de memoria RAM.
 * @property {MemoryRamValues[]} memoryRamValues - Valores de memoria RAM asociados al tipo.
 */
export interface MemoryRamType {
	name: string
	memoryRamValues: MemoryRamValues[]
}

/**
 * @interface MemoryRamValues
 * @description Representa los valores de memoria RAM en el dashboard de computadoras.
 * @property {string} name - Nombre del valor de memoria RAM.
 * @property {number} count - Cantidad de memoria RAM con este valor.
 */
export interface MemoryRamValues {
	name: string
	count: number
}
