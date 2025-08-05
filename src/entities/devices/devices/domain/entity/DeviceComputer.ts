import { StatusId } from '@/entities/status/status/domain/value-object/StatusId'
import { ComputerHDDCapacity } from '../value-object/ComputerHDDCapacity'
import { ComputerHDDType } from '../value-object/ComputerHDDType'
import { IPAddress } from '../value-object/IPAddress'
import { ComputerOs } from '../value-object/ComputerOS'
import { ComputerOsArq } from '../value-object/ComputerOSArq'
import { DeviceActivo } from '../value-object/DeviceActivo'
import { DeviceSerial } from '../value-object/DeviceSerial'
import { MACAddress } from '../value-object/MACAddress'
import { MemoryRam } from '../value-object/MemoryRam'
import { Device } from './Device'
import { CategoryId } from '@/entities/category/domain/value-object/CategoryId'
import { BrandId } from '@/entities/brand/domain/value-object/BrandId'
import { ModelId } from '@/entities/model/models/domain/value-object/ModelId'
import { DeviceEmployee } from '../value-object/DeviceEmployee'
import { DeviceLocation } from '../value-object/DeviceLocation'
import { DeviceObservation } from '../value-object/DeviceObservation'
import { DeviceStockNumber } from '../value-object/DeviceStockNumber'
import { ComputerName } from '../value-object/ComputerName'
import { ComputerProcessor } from '../value-object/ComputerProcessor'
import { MemoryRamCapacity } from '../value-object/MemoryRamCapacity'
import { CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
import { InvalidArgumentError } from '@/entities/shared/domain/value-objects/InvalidArgumentError'
import { type DeviceComputerParams, type DeviceComputerPrimitives } from '../dto/DeviceComputer.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * @class DeviceComputer
 * @extends {Device}
 * @description Entidad de dominio que representa un dispositivo de tipo computadora.
 * Extiende la entidad `Device` base y añade propiedades específicas de computadoras.
 */
export class DeviceComputer extends Device {
	/**
	 * Crea una instancia de `DeviceComputer`.
	 * @param {DeviceSerial} serial - El número de serie del dispositivo.
	 * @param {DeviceActivo} activo - El número de activo del dispositivo.
	 * @param {StatusId} statusId - El ID del estado del dispositivo.
	 * @param {CategoryId} categoryId - El ID de la categoría del dispositivo.
	 * @param {BrandId} brandId - El ID de la marca del dispositivo.
	 * @param {ModelId} modelId - El ID del modelo del dispositivo.
	 * @param {DeviceEmployee} employeeId - El ID del empleado asignado al dispositivo.
	 * @param {DeviceLocation} locationId - El ID de la ubicación del dispositivo.
	 * @param {DeviceObservation} observation - Observaciones sobre el dispositivo.
	 * @param {DeviceStockNumber} stockNumber - El número de stock del dispositivo.
	 * @param {ComputerName} computerName - El nombre del equipo.
	 * @param {ComputerProcessor} processorId - El ID del procesador.
	 * @param {MemoryRamCapacity} memoryRamCapacity - La capacidad de memoria RAM.
	 * @param {MemoryRam} memoryRam - Los módulos de memoria RAM.
	 * @param {ComputerHDDCapacity} hardDriveCapacityId - El ID de la capacidad del disco duro.
	 * @param {ComputerHDDType} hardDriveTypeId - El ID del tipo de disco duro.
	 * @param {ComputerOs} operatingSystemId - El ID del sistema operativo.
	 * @param {ComputerOsArq} operatingSystemArqId - El ID de la arquitectura del sistema operativo.
	 * @param {MACAddress} macAddress - La dirección MAC.
	 * @param {IPAddress} ipAddress - La dirección IP.
	 */	constructor(
		serial: DeviceSerial,
		activo: DeviceActivo,
		statusId: StatusId,
		categoryId: CategoryId,
		brandId: BrandId,
		modelId: ModelId,
		employeeId: DeviceEmployee,
		locationId: DeviceLocation,
		observation: DeviceObservation,
		stockNumber: DeviceStockNumber,
		private readonly computerName: ComputerName,
		private readonly processorId: ComputerProcessor,
		private readonly memoryRamCapacity: MemoryRamCapacity,
		private readonly memoryRam: MemoryRam,
		private readonly hardDriveCapacityId: ComputerHDDCapacity,
		private readonly hardDriveTypeId: ComputerHDDType,
		private readonly operatingSystemId: ComputerOs,
		private readonly operatingSystemArqId: ComputerOsArq,
		private readonly macAddress: MACAddress,
		private readonly ipAddress: IPAddress
	) {
		super(
			serial,
			activo,
			statusId,
			categoryId,
			brandId,
			modelId,
			employeeId,
			locationId,
			observation,
			stockNumber
		)
	}

	/**
	 * Verifica si una categoría dada corresponde a un tipo de dispositivo de computadora.
	 * @static
	 * @param {CategoryOptions[keyof CategoryOptions]} categoryId - El ID de la categoría a verificar.
	 * @returns {boolean} `true` si la categoría es de computadora, `false` en caso contrario.
	 */	static isComputerCategory(categoryId: (typeof CategoryOptions)[keyof typeof CategoryOptions]) {
		return categoryId === CategoryOptions.COMPUTER ||
			categoryId === CategoryOptions.ALLINONE ||
			categoryId === CategoryOptions.LAPTOP ||
			categoryId === CategoryOptions.SERVER
			? true
			: false
	}

	/**
	 * Crea una nueva instancia de `DeviceComputer` a partir de sus propiedades primitivas.
	 * @static
	 * @param {DeviceComputerParams} params - Los parámetros del dispositivo de computadora.
	 * @returns {DeviceComputer} Una nueva instancia de `DeviceComputer`.
	 * @throws {InvalidArgumentError} Si la categoría no pertenece a un tipo de computadora.
	 */	public static create(params: DeviceComputerParams) {
		if (!DeviceComputer.isComputerCategory(params.categoryId)) {
			throw new InvalidArgumentError('No pertenece a esta categoria')
		}

		return new DeviceComputer(
			new DeviceSerial(params.serial, params.genericModel),
			new DeviceActivo(params.activo),
			new StatusId(params.statusId),
			new CategoryId(params.categoryId),
			new BrandId(params.brandId),
			new ModelId(params.modelId),
			new DeviceEmployee(params.employeeId, params.statusId),
			new DeviceLocation(params.locationId, params.statusId, params.typeOfSiteId),
			new DeviceObservation(params.observation),
			new DeviceStockNumber(params.stockNumber, params.statusId),
			new ComputerName(params.computerName, params.statusId),
			new ComputerProcessor(params.processorId, params.statusId),
			new MemoryRamCapacity(params.memoryRamCapacity, params.statusId),
			MemoryRam.fromPrimitives(params.memoryRam, params.statusId),
			new ComputerHDDCapacity(params.hardDriveCapacityId, params.statusId),
			new ComputerHDDType(params.hardDriveTypeId, params.hardDriveCapacityId),
			new ComputerOs(params.operatingSystemId, params.statusId, params.hardDriveCapacityId),
			new ComputerOsArq(params.operatingSystemArqId, params.operatingSystemId),
			new MACAddress(params.macAddress),
			new IPAddress(params.ipAddress, params.statusId)
		)
	}

	/**
	 * Obtiene el valor primitivo del nombre del equipo.
	 * @type {Primitives<ComputerName>}
	 */	get computerNameValue(): Primitives<ComputerName> {
		return this.computerName.value
	}
	/**
	 * Obtiene el valor primitivo de la capacidad de memoria RAM.
	 * @type {Primitives<MemoryRamCapacity>}
	 */	get memoryRamCapacityValue(): Primitives<MemoryRamCapacity> {
		return this.memoryRamCapacity.value
	}
	/**
	 * Obtiene los valores primitivos de los módulos de memoria RAM.
	 * @type {number[]}
	 */	get memoryRamValue(): number[] {
		return this.memoryRam.toPrimitives()
	}
	/**
	 * Obtiene el valor primitivo del ID del procesador.
	 * @type {Primitives<ComputerProcessor>}
	 */	get processorValue(): Primitives<ComputerProcessor> {
		return this.processorId.value
	}
	/**
	 * Obtiene el valor primitivo del ID de la capacidad del disco duro.
	 * @type {Primitives<ComputerHDDCapacity>}
	 */	get hardDriveCapacityValue(): Primitives<ComputerHDDCapacity> {
		return this.hardDriveCapacityId.value
	}
	/**
	 * Obtiene el valor primitivo del ID del tipo de disco duro.
	 * @type {Primitives<ComputerHDDType>}
	 */	get hardDriveTypeValue(): Primitives<ComputerHDDType> {
		return this.hardDriveTypeId.value
	}
	/**
	 * Obtiene el valor primitivo del ID del sistema operativo.
	 * @type {Primitives<ComputerOs>}
	 */	get operatingSystemValue(): Primitives<ComputerOs> {
		return this.operatingSystemId.value
	}
	/**
	 * Obtiene el valor primitivo del ID de la arquitectura del sistema operativo.
	 * @type {Primitives<ComputerOsArq>}
	 */	get operatingSystemArqValue(): Primitives<ComputerOsArq> {
		return this.operatingSystemArqId.value
	}
	/**
	 * Obtiene el valor primitivo de la dirección MAC.
	 * @type {Primitives<MACAddress>}
	 */	get macAddressValue(): Primitives<MACAddress> {
		return this.macAddress.value
	}
	/**
	 * Obtiene el valor primitivo de la dirección IP.
	 * @type {Primitives<IPAddress>}
	 */	get ipAddressValue(): Primitives<IPAddress> {
		return this.ipAddress.value
	}

	/**
	 * Convierte la entidad `DeviceComputer` a su representación primitiva.
	 * @returns {DeviceComputerPrimitives} La representación primitiva del dispositivo de computadora.
	 */	toPrimitives(): DeviceComputerPrimitives {
		return {
			serial: this.serialValue,
			activo: this.activoValue,
			statusId: this.statusValue,
			modelId: this.modelValue,
			categoryId: this.categoryValue,
			brandId: this.brandValue,
			employeeId: this.employeeValue,
			locationId: this.locationValue,
			observation: this.observationValue,
			stockNumber: this.stockNumberValue,
			computerName: this.computerNameValue,
			memoryRamCapacity: this.memoryRamCapacityValue,
			memoryRam: this.memoryRamValue,
			processorId: this.processorValue,
			hardDriveCapacityId: this.hardDriveCapacityValue,
			hardDriveTypeId: this.hardDriveTypeValue,
			operatingSystemId: this.operatingSystemValue,
			operatingSystemArqId: this.operatingSystemArqValue,
			macAddress: this.macAddressValue,
			ipAddress: this.ipAddressValue
		}
	}
}