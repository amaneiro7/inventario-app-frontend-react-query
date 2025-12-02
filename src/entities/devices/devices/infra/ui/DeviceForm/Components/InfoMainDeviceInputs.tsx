import { lazy, memo } from 'react'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { Input } from '@/shared/ui/Input/Input'
import {
	type DeviceRequired,
	type DevicesDisabled,
	type Action,
	type DefaultDevice,
	type DevicesErrors
} from '@/entities/devices/devices/infra/reducers/devicesFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

const EmployeeCombobox = lazy(() =>
	import('@/entities/employee/employee/infra/ui/EmployeeComboBox').then(m => ({
		default: m.EmployeeCombobox
	}))
)
const LocationCombobox = lazy(() =>
	import('@/entities/locations/locations/infra/ui/LocationComboBox').then(m => ({
		default: m.LocationCombobox
	}))
)
const HelpTooltip = lazy(() =>
	import('@/shared/ui/HelpTooltip').then(m => ({ default: m.HelpTooltip }))
)
interface InfoMainDeviceInputsProps {
	isLoading: boolean
	canEdit: boolean
	mode: FormMode
	serial: DefaultDevice['serial']
	activo: DefaultDevice['activo']
	employeeId: DefaultDevice['employeeId']
	statusId: DefaultDevice['statusId']
	locationId: DefaultDevice['locationId']
	stockNumber: DefaultDevice['stockNumber']
	typeOfSiteId: DefaultDevice['typeOfSiteId']
	observation: DefaultDevice['observation']
	errorSerial: DevicesErrors['serial']
	errorActivo: DevicesErrors['activo']
	errorEmployeeId: DevicesErrors['employeeId']
	errorLocationId: DevicesErrors['locationId']
	errorStockNumber: DevicesErrors['stockNumber']
	errorObservation: DevicesErrors['observation']
	disabledSerial: DevicesDisabled['serial']
	disabledActivo: DevicesDisabled['activo']
	disabledEmployeeId: DevicesDisabled['employeeId']
	disabledStockNumber: DevicesDisabled['stockNumber']
	disabledLocationId: DevicesDisabled['locationId']
	disabledObservation: DevicesDisabled['observation']
	requiredSerial: DeviceRequired['serial']
	requiredActivo: DeviceRequired['activo']
	requiredEmployeeId: DeviceRequired['employeeId']
	requiredLocationId: DeviceRequired['locationId']
	requiredStockNumber: DeviceRequired['stockNumber']
	requiredObservation: DeviceRequired['observation']
	handleChange: (name: Action['type'], value: string | number | boolean) => void
	handleLocation: ({
		value,
		typeOfSiteId,
		ipAddress
	}: {
		value: string
		typeOfSiteId?: string
		ipAddress?: string | null
	}) => Promise<void>
}

export const InfoMainDeviceInputs = memo(
	({
		serial,
		activo,
		employeeId,
		statusId,
		locationId,
		stockNumber,
		typeOfSiteId,
		observation,
		errorSerial,
		errorActivo,
		errorEmployeeId,
		errorLocationId,
		errorStockNumber,
		errorObservation,
		disabledSerial,
		disabledActivo,
		disabledEmployeeId,
		disabledStockNumber,
		disabledLocationId,
		disabledObservation,
		requiredSerial,
		requiredActivo,
		requiredEmployeeId,
		requiredLocationId,
		requiredStockNumber,
		requiredObservation,
		mode,
		canEdit,
		isLoading,
		handleLocation,
		handleChange
	}: InfoMainDeviceInputsProps) => {
		return (
			<>
				<div className="flex items-start gap-2">
					<Input
						id="device-serial"
						value={serial ?? ''}
						name="serial"
						isLoading={isLoading}
						label="Serial"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('serial', e.target.value)
						}
						readOnly={mode === 'edit' || !canEdit}
						error={!!errorSerial}
						errorMessage={errorSerial}
						required={requiredSerial}
						disabled={disabledSerial}
					/>
					<HelpTooltip text="Número de serie único del fabricante, también conocido como S/N." />
				</div>
				<div className="flex items-start gap-2">
					<Input
						id="device-activo"
						value={activo ?? ''}
						name="activo"
						isLoading={isLoading}
						label="Activo"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('activo', e.target.value)
						}
						readOnly={!canEdit}
						error={!!errorActivo}
						errorMessage={errorActivo}
						required={requiredActivo}
						disabled={disabledActivo}
					/>
					<HelpTooltip text="Número de activo fijo asignado por la empresa para el seguimiento del equipo." />
				</div>

				<div className="flex items-start gap-2">
					<EmployeeCombobox
						value={employeeId ?? ''}
						handleChange={(_name, value) => handleChange('employeeId', value)}
						name="employeeId"
						isLoading={isLoading}
						readonly={!canEdit}
						error={errorEmployeeId}
						required={requiredEmployeeId}
						disabled={disabledEmployeeId}
					/>
					<HelpTooltip text="Empleado al que se le asigna el dispositivo. Si no se asigna, el equipo se considera en stock." />
				</div>

				<div className="flex items-start gap-2">
					<LocationCombobox
						value={locationId ?? ''}
						statusId={statusId}
						handleFormChange={handleLocation}
						name="locationId"
						readonly={!canEdit}
						isLoading={isLoading}
						method="form"
						error={errorLocationId}
						required={requiredLocationId}
						disabled={disabledLocationId}
					/>
					<HelpTooltip text="Ubicación física donde se encuentra el dispositivo (oficina, almacén, etc.)." />
				</div>

				{typeOfSiteId === TypeOfSiteOptions.ALMACEN ? (
					<div className="flex items-start gap-2">
						<Input
							id="device-stocknumber"
							value={stockNumber ?? ''}
							name="stockNumber"
							isLoading={isLoading}
							label="N° de Stock"
							readOnly={!canEdit}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleChange('stockNumber', e.target.value)
							}
							error={!!errorStockNumber}
							errorMessage={errorStockNumber}
							required={requiredStockNumber}
							disabled={disabledStockNumber}
						/>
						<HelpTooltip text="Número de puesto o ubicación específica dentro del almacén." />
					</div>
				) : null}
				<div className="flex items-start gap-2">
					<Input
						id="device-observation"
						value={observation ?? ''}
						name="observation"
						isLoading={isLoading}
						readOnly={!canEdit}
						label="Observación"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('observation', e.target.value)
						}
						error={!!errorObservation}
						errorMessage={errorObservation}
						required={requiredObservation}
						disabled={disabledObservation}
					/>
					<HelpTooltip text="Cualquier información adicional relevante sobre el estado o historial del dispositivo." />
				</div>
			</>
		)
	}
)
