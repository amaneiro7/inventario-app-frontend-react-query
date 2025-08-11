import { memo } from 'react'
import {
	type DeviceRequired,
	type DevicesDisabled,
	type Action,
	type DefaultDevice,
	type DevicesErrors
} from '@/entities/devices/devices/infra/reducers/devicesFormReducer'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { Input } from '@/shared/ui/Input/Input'
import { EmployeeCombobox } from '@/entities/employee/employee/infra/ui/EmployeeComboBox'
import { LocationCombobox } from '@/entities/locations/locations/infra/ui/LocationComboBox'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
// import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/Tooltip'
interface Props {
	isLoading: boolean
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
	isLoading,
	handleLocation,
	handleChange
}: Props) {
	return (
		<>
			<div className="flex items-center justify-center gap-2">
				<Input
					id="device-serial"
					value={serial ?? ''}
					name="serial"
					isLoading={isLoading}
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
				{/* <Tooltip>
					<TooltipTrigger>
						<div className="relative h-16 w-[30px]">
							<span className="bg-azul border-azul-900 absolute top-0.5 left-0 mb-10 rounded-full border px-2.5 py-1.5 text-white">
							?
							</span>
							</div>
					</TooltipTrigger>
					<TooltipContent side="right" align="center" sideOffset={10}>
						<p>This tooltip appears on the right</p>
					</TooltipContent>
				</Tooltip> */}
			</div>
			<Input
				id="device-activo"
				value={activo ?? ''}
				name="activo"
				isLoading={isLoading}
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
				isLoading={isLoading}
				error={errorEmployeeId}
				required={requiredEmployeeId}
				disabled={disabledEmployeeId}
			/>
			<LocationCombobox
				value={locationId ?? ''}
				statusId={statusId}
				handleFormChange={handleLocation}
				name="locationId"
				isLoading={isLoading}
				method="form"
				error={errorLocationId}
				required={requiredLocationId}
				disabled={disabledLocationId}
			/>

			{typeOfSiteId === TypeOfSiteOptions.ALMACEN ? (
				<Input
					id="device-stocknumber"
					value={stockNumber ?? ''}
					name="stockNumber"
					isLoading={isLoading}
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
				id="device-observation"
				value={observation ?? ''}
				name="observation"
				isLoading={isLoading}
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
