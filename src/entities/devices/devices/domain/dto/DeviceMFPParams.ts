import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DeviceParams, type DevicePrimitives } from './Device.dto'
import { type MFPIPAddress } from '../value-object/MFPIpaddress'
import { type CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'

export type DeviceMFPPrimitives = DevicePrimitives & {
	ipAddress: Primitives<MFPIPAddress>
}

export type DeviceMFPParams = DeviceParams & {
	categoryId: CategoryOptions.MFP
	ipAddress: Primitives<MFPIPAddress>
}

export interface DeviceMFPDto {
	ipAddress: Primitives<MFPIPAddress>
}
