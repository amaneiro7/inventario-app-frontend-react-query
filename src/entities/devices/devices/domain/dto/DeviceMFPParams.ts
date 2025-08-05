import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DeviceParams, type DevicePrimitives } from './Device.dto'
import { type MFPIPAddress } from '../value-object/MFPIPAddress'
import { type CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'

/**
 * @typedef {Object} DeviceMFPPrimitives
 * @description Representa la forma primitiva de un dispositivo de tipo MFP (impresora multifuncional).
 * Incluye propiedades específicas de MFP además de las propiedades base de `DevicePrimitives`.
 * @property {Primitives<MFPIPAddress>} ipAddress - Dirección IP de la MFP.
 */
export type DeviceMFPPrimitives = DevicePrimitives & {
	ipAddress: Primitives<MFPIPAddress>
}

/**
 * @typedef {Object} DeviceMFPParams
 * @description Representa los parámetros para crear o actualizar un dispositivo de tipo MFP.
 * Extiende `DeviceParams` e incluye propiedades específicas de MFP.
 * @property {CategoryOptions.MFP} categoryId - Categoría del dispositivo (debe ser `MFP`).
 * @property {Primitives<MFPIPAddress>} ipAddress - Dirección IP de la MFP.
 */
export type DeviceMFPParams = DeviceParams & {
	categoryId: CategoryOptions.MFP
	ipAddress: Primitives<MFPIPAddress>
}

/**
 * @interface DeviceMFPDto
 * @description Data Transfer Object (DTO) para un dispositivo de tipo MFP.
 * Incluye las propiedades primitivas de la MFP.
 * @property {Primitives<MFPIPAddress>} ipAddress - Dirección IP de la MFP.
 */
export interface DeviceMFPDto {
	ipAddress: Primitives<MFPIPAddress>
}