/**
 * Represents the data structure for the history dashboard, typically containing aggregated data
 * for the last three months.
 */
export interface HistoryDashboardDto {
	lastThreeMonths: Record<string, any>[]
}