import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DeviceMonitoringId } from '../value-object/DeviceMonitoringId'
import { type DeviceMonitoringStatus } from '../value-object/Status'
import { type DeviceId } from '@/entities/devices/devices/domain/value-object/DeviceId'
import { type DeviceMonitoringComputerName } from '../value-object/ComputerName'
import { type DeviceMonitoringIpAddress } from '../value-object/IPAddress'
import { type LocationDto } from '@/entities/locations/locations/domain/dto/Location.dto'
import { type DeviceMonitoringLastScan } from '../value-object/LastScan'
import { type DeviceMonitoringLastSuccess } from '../value-object/LastSuccess'
import { type DeviceMonitoringLastFailed } from '../value-object/LastFailed'
import { type EmployeeDto } from '@/entities/employee/employee/domain/dto/Employee.dto'

export interface DeviceMonitoring {
	id: Primitives<DeviceMonitoringId>
	status: Primitives<DeviceMonitoringStatus>
	deviceId: Primitives<DeviceId>
	computerName: Primitives<DeviceMonitoringComputerName>
	ipAddress: Primitives<DeviceMonitoringIpAddress>
	location: LocationDto
	employee: EmployeeDto | null
	lastScan: Primitives<DeviceMonitoringLastScan>
	lastSuccess: Primitives<DeviceMonitoringLastSuccess>
	lastFailed: Primitives<DeviceMonitoringLastFailed>
}

export type DeviceMonitoringPrimitives = Omit<DeviceMonitoring, 'id'>

export type DeviceMonitoringDto = DeviceMonitoring
