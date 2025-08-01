import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type LocationMonitoringId } from '../value-object/LocationMonitoringId'
import { type LocationMonitoringStatus } from '../value-object/LocationMonitoringStatus'
import { type LocationId } from '@/entities/locations/locations/domain/value-object/LocationId'
import { type LocationMonitoringName } from '../value-object/LocationMonitoringName'
import { type LocationMonitoringSubnet } from '../value-object/LocationMonitoringSubnet'
import { type LocationMonitoringLastScan } from '../value-object/LocationMonitoringLastScan'
import { type LocationMonitoringLastSuccess } from '../value-object/LocationMonitoringLastSuccess'
import { type LocationMonitoringLastFailed } from '../value-object/LocationMonitoringLastFailed'
import { type SiteDto } from '@/entities/locations/site/domain/dto/Site.dto'

export interface LocationMonitoring {
	id: Primitives<LocationMonitoringId>
	status: Primitives<LocationMonitoringStatus>
	locationId: Primitives<LocationId>
	name: Primitives<LocationMonitoringName>
	subnet: Primitives<LocationMonitoringSubnet>
	site: SiteDto
	lastScan: Primitives<LocationMonitoringLastScan>
	lastSuccess: Primitives<LocationMonitoringLastSuccess>
	lastFailed: Primitives<LocationMonitoringLastFailed>
}

export type LocationMonitoringPrimitives = Omit<LocationMonitoring, 'id'>

export type LocationMonitoringDto = LocationMonitoring
