import { useMemo } from 'react'
import { DeviceMonitoringStatuses } from '@/entities/devices/deviceMonitoring/domain/value-object/Status'
import { type DeviceMonitoringDto } from '@/entities/devices/deviceMonitoring/domain/dto/DeviceMonitoring.dto'
import { type GenericMonitorableItem } from '@/shared/ui/GenericMonitoringList'
import { type EmployeeDto } from '@/entities/employee/employee/domain/dto/Employee.dto'

export interface DeviceMonitorings extends GenericMonitorableItem {
	employee: EmployeeDto | null
}

export const useMappedNetworkLinks = (deviceMonitorings?: DeviceMonitoringDto[]) => {
	const networkLinks: DeviceMonitorings[] = useMemo(() => {
		if (!deviceMonitorings) return []

		return deviceMonitorings
			.map(data => ({
				id: data.id,
				name: data.computerName,
				status: data.status,
				subDetail: data.ipAddress,
				employee: data?.employee
			}))
			.sort((a, b) => {
				if (
					a.status === DeviceMonitoringStatuses.ONLINE &&
					b.status === DeviceMonitoringStatuses.OFFLINE
				) {
					return 1
				}
				if (
					a.status === DeviceMonitoringStatuses.OFFLINE &&
					b.status === DeviceMonitoringStatuses.ONLINE
				) {
					return -1
				}
				return a.name.localeCompare(b.name)
			})
	}, [deviceMonitorings])

	return { networkLinks }
}
