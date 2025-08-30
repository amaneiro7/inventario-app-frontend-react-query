import { memo, useEffect } from 'react'
import { useGetDevice } from '@/entities/devices/devices/infra/hook/useGetDevices'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

// No renderiza nada, solo se encarga de llamar al hook y notificar cuando los datos están listos.
export const InitialDeviceLoader = memo(
	({ id, onLoad }: { id: string; onLoad: (device: DeviceDto) => void }) => {
		const { data: device, isLoading } = useGetDevice({ id })

		useEffect(() => {
			// Cuando el hook termina de cargar y tenemos los datos, llamamos al callback.
			if (device && !isLoading) {
				onLoad(device)
			}
		}, [device, isLoading, onLoad])

		return null // Este componente no tiene salida visual.
	}
)

InitialDeviceLoader.displayName = 'InitialDeviceLoader'
