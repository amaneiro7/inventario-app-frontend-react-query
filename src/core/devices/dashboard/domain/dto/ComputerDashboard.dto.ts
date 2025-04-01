export interface ComputerDashboardDto {
	total: number
	totalAgencies: number
	activeEmployees: number
	status: Status[]
	category: Category[]
	brand: Brand[]
	region: Region[]
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

export interface Region {
	regionName: string
	count: number
	states: State[]
}

export interface State {
	stateName: string
	count: number
	cities: City[]
}

export interface City {
	cityName: string
	count: number
	sites: Site[]
}

export interface Site {
	siteName: string
	count: number
	names: Status[]
}
