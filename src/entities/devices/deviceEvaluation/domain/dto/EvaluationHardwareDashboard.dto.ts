import type { MigrationRuleDto } from './MigrationRule.dto'

export enum EvaluationHardwareStatus {
	APTO = 'Apto',
	NOAPTO = 'No Apto'
}

export interface EvaluationHardwareDeviceDto {
	deviceId: string
	serial: string
	location: string
	employee: string
	hardware: {
		processor: string
		ram: string
		disk: string
		computerName: string
		ipAddress: string
	}
	status: EvaluationHardwareStatus
	reasons: string[]
}

export interface EvaluationHardwareDashboardResponse {
	message?: string
	migrationRule?: MigrationRuleDto
	summary: {
		total: number
		apto: number
		noApto: number
	}
	devices: EvaluationHardwareDeviceDto[]
	info: {
		total: number
		page: number
		totalPage: number
	}
}
