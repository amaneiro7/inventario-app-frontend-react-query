export interface DeviceMonitoringDashboardByLocationDto {
	name: string
	sites: Site[]
}

export interface Site {
	name: string
	locations: Locations[]
	total: number
	onlineCount: number
	offlineCount: number
}

export interface Locations {
	name: string
	total: number
	onlineCount: number
	offlineCount: number
}
