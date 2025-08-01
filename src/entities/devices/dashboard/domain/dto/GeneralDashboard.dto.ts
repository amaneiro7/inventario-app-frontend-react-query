export interface GeneralDashboardDto {
	totalByCategory: {
		name: string
		count: number
	}[]
	totalComputer: number
	totalScreens: number
	totalPrinters: number
	totalFinantialPrinters: number
	totalActiveUsers: number
	totalAgencies: number
	totalAdministrativeSites: number
}
