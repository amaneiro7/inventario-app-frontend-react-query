import { ComputerDashboardDto } from '@/core/devices/dashboard/domain/dto/ComputerDashboard.dto'
import React, { memo } from 'react'

interface MemoryRamAnalysisProps {
	data: ComputerDashboardDto['memoryRamCapacity']
}

export const MemoryRamAnalysis = memo(({ data }: MemoryRamAnalysisProps) => {
	return <div>MemoryRamAnalysis</div>
})
