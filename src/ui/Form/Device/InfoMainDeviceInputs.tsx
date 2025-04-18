import {
	type DeviceRequired,
	type DevicesDisabled,
	type Action,
	type DefaultDevice,
	type DevicesErrors
} from '@/core/devices/devices/infra/reducers/devicesFormReducer'
import { EmployeeCombobox } from '@/components/ComboBox/Asincrono/EmployeeComboBox'
import { LocationCombobox } from '@/components/ComboBox/Asincrono/LocationComboBox'
import { TypeOfSiteOptions } from '@/core/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { Input } from '@/components/Input/Input'
import { memo } from 'react'
import { type FormMode } from '@/hooks/useGetFormMode'

interface Props {
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

export const InfoMainDeviceInputs = memo(function ({
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
	handleLocation,
	handleChange
}: Props) {
	return (
		<>
			<Input
				value={serial ?? ''}
				name="serial"
				label="Serial"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('serial', e.target.value)
				}
				readOnly={mode === 'edit'}
				error={!!errorSerial}
				errorMessage={errorSerial}
				required={requiredSerial}
				disabled={disabledSerial}
			/>
			<Input
				value={activo ?? ''}
				name="activo"
				label="Activo"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('activo', e.target.value)
				}
				error={!!errorActivo}
				errorMessage={errorActivo}
				required={requiredActivo}
				disabled={disabledActivo}
			/>
			<EmployeeCombobox
				value={employeeId ?? ''}
				handleChange={(_name, value) => handleChange('employeeId', value)}
				name="employeeId"
				error={errorEmployeeId}
				required={requiredEmployeeId}
				disabled={disabledEmployeeId}
			/>
			<LocationCombobox
				value={locationId ?? ''}
				statusId={statusId}
				handleFormChange={handleLocation}
				name="locationId"
				method="form"
				error={errorLocationId}
				required={requiredLocationId}
				disabled={disabledLocationId}
			/>
			{typeOfSiteId === TypeOfSiteOptions.ALMACEN ? (
				<Input
					value={stockNumber ?? ''}
					name="stockNumber"
					label="N° de Stock"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('stockNumber', e.target.value)
					}
					error={!!errorStockNumber}
					errorMessage={errorStockNumber}
					required={requiredStockNumber}
					disabled={disabledStockNumber}
				/>
			) : null}
			<Input
				value={observation ?? ''}
				name="observation"
				label="Observación"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('observation', e.target.value)
				}
				error={!!errorObservation}
				errorMessage={errorObservation}
				required={requiredObservation}
				disabled={disabledObservation}
			/>
		</>
	)
})
