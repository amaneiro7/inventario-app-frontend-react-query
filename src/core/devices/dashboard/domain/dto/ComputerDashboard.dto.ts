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
	operatingSystemByRegion: OperatingSystemSystemByRegion[]
}

export interface Brand {
	name: string
	count: number
	model: Model[]
}

export interface Status {
	name: string
	count: number
}
export interface Model {
	name: string
	category: string
	count: number
	typeOfSite: TypeOfSite[]
}
export interface TypeOfSite {
	name: string
	count: number
}

export interface Category {
	name: string
	count: number
	typeOfSite: TypeOfSite[]
}

export interface TypeOfSiteCount {
	Agencia?: number
	'Sede Administrativa'?: number
}
export interface Regions {
	name: string
	count: number
	typeOfSiteCount: TypeOfSiteCount
	regions: Region[]
}
export interface Region {
	name: string
	count: number
	typeOfSiteCount: TypeOfSiteCount
	states: State[]
}

export interface State {
	name: string
	count: number
	typeOfSiteCount: TypeOfSiteCount
	cities: City[]
}

export interface City {
	name: string
	count: number
	typeOfSiteCount: TypeOfSiteCount
	sites: Site[]
}

export interface Site {
	name: string
	count: number
	typeOfSiteCount: TypeOfSiteCount
	locations: Location[]
}
export interface Location {
	name: string
	count: number
	typeOfSite: string
}

export interface OperatingSystem {
	name: string
	count: number
	arq: OperatingSystemArq[]
}
export interface OperatingSystemArq {
	name: string
	count: number
}

export interface HardDrive {
	name: string
	count: number
	hddType: HardDriveType[]
}
export interface HardDriveType {
	name: string
	count: number
}

export interface OperatingSystemSystemByRegion {
	name: string
	count: number
	region: Region[]
}

export interface MemoryRamCapacity {
	name: string
	memoryRamTotal: MemoryRamTotal[]
}

export interface MemoryRamTotal {
	name: string
	count: number
}

export interface ModulosMemoryRam {
	name: string
	memoryRamType: MemoryRamType[]
}

export interface MemoryRamType {
	name: string
	memoryRamValues: MemoryRamValues[]
}

export interface MemoryRamValues {
	name: string
	count: number
}
