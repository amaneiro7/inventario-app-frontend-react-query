import type { EvaluationHardwareDashboardResponse } from '../dto/EvaluationHardwareDashboard.dto'

export abstract class HardwareEvaluationRepository {
	abstract findPendingDevices(queryParams?: string): Promise<EvaluationHardwareDashboardResponse>
}
