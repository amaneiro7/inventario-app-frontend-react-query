import { useDeviceTransferList } from '../model/useDeviceTransferList'
import { Combobox } from '@/shared/ui/Input/Combobox'
import Typography from '@/shared/ui/Typography'
import { TransferListItem } from '@/shared/ui/TransferList/TransferListItem'
import { DeviceRenderOption } from '@/shared/ui/Input/Combobox/RenderOption/DeviceRenderOption'
import { InitialDeviceLoader } from './InitialDeviceLoader'
import { type DeviceDto } from '../../../entities/devices/devices/domain/dto/Device.dto'

interface DeviceTransferListProps {
	value?: DeviceDto['id'][]
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	isLoading?: boolean
	onAddDevice: (name: 'addDevice', value: string) => void
	onRemoveDevice: (name: 'removeDevice', value: string) => void
}

export function DeviceTransferList({
	value: devices = [],
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	onAddDevice,
	onRemoveDevice
}: DeviceTransferListProps) {
	const {
		availableOptions,
		inputValue,
		selectedDevicesData,
		loading,
		missingInitialIds,
		handleAddDevice,
		handleInitialDeviceLoad,
		handleRemoveDevice,
		setInputValue
	} = useDeviceTransferList({
		devices,
		onAddDevice,
		onRemoveDevice
	})

	return (
		<>
			{missingInitialIds.map(id => (
				<InitialDeviceLoader key={id} id={id} onLoad={handleInitialDeviceLoad} />
			))}

			<div className="grid items-start justify-between gap-4 md:grid-cols-2">
				<Combobox
					id="transfer-list-device"
					label="Lista de Dispositivos"
					value=""
					inputValue={inputValue}
					name={name}
					required={required}
					disabled={disabled}
					error={!!error}
					errorMessage={error}
					loading={loading}
					isLoading={isLoading}
					options={availableOptions}
					onInputChange={setInputValue}
					onChangeValue={(_name, value) => handleAddDevice(value)}
					displayAccessor="serial"
					readOnly={readonly}
					renderOption={DeviceRenderOption}
				/>
				<div className="rounded shadow-lg shadow-slate-400">
					<Typography color="white" className="bg-azul w-full rounded-t px-4 py-2">
						Dispositivos Seleccionados
					</Typography>
					{devices.length > 0 ? (
						<ul role="options" className="flex w-full flex-col rounded">
							{devices.map(deviceId => {
								const device = selectedDevicesData.get(deviceId)

								if (!device) {
									return (
										<TransferListItem
											key={deviceId}
											id={deviceId}
											name="Cargando..."
											onRemove={handleRemoveDevice}
										/>
									)
								}

								return (
									<TransferListItem
										key={deviceId}
										isLoading={isLoading}
										id={deviceId}
										readOnly={readonly}
										name={`${device.category.name} - ${device.model.name} - ${device.serial ? device.serial : 'Sin serial'}`}
										onRemove={handleRemoveDevice}
									/>
								)
							})}
						</ul>
					) : (
						<Typography className="p-2" variant="p" color="gris">
							No se han seleccionado dispositivos.
						</Typography>
					)}
				</div>
			</div>
		</>
	)
}
