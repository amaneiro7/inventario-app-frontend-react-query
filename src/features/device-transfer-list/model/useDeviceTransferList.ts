import { DeviceBaseFilters } from '@/entities/devices/devices/application/createDeviceQueryParams'
import { DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'
import { useGetAllDevicesInputSearch } from '@/entities/devices/devices/infra/hook/useGetAllDevicesInputSearch'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface UseDeviceTransferList {
	devices: DeviceDto['id'][]
	onAddDevice: (name: 'addDevice', value: string) => void
	onRemoveDevice: (name: 'removeDevice', value: string) => void
}

export const useDeviceTransferList = ({
	devices,
	onAddDevice,
	onRemoveDevice
}: UseDeviceTransferList) => {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const [selectedDevicesData, setSelectedDevicesData] = useState<Map<string, DeviceDto>>(
		new Map()
	)

	const query: DeviceBaseFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { id: undefined, serial: debouncedSearch } : { pageSize: 10 }),
			orderBy: 'categoryId'
		}
	}, [debouncedSearch])

	const { data: allDevices, isLoading: loading } = useGetAllDevicesInputSearch(query)

	const missingInitialIds = useMemo(() => {
		return devices.filter(id => !selectedDevicesData.has(id))
	}, [devices, selectedDevicesData])

	// Callback para que los loaders actualicen el caché.
	const handleInitialDeviceLoad = useCallback((device: DeviceDto) => {
		setSelectedDevicesData(prevMap => {
			// Solo actualizamos si el dispositivo no está ya en el mapa para evitar bucles.
			if (prevMap.has(device.id)) {
				return prevMap
			}
			const newMap = new Map(prevMap)
			newMap.set(device.id, device)
			return newMap
		})
	}, [])

	useEffect(() => {
		if (allDevices?.data) {
			setSelectedDevicesData(prevMap => {
				const newMap = new Map(prevMap)
				allDevices.data.forEach(device => {
					if (!newMap.has(device.id)) {
						newMap.set(device.id, device)
					}
				})
				return newMap
			})
		}
	}, [allDevices])

	const availableOptions = useMemo(
		() => allDevices?.data?.filter(device => !devices.includes(device.id)) ?? [],
		[allDevices, devices]
	)

	const handleAddDevice = useCallback(
		(deviceId: string) => {
			const deviceToAdd = allDevices?.data?.find(d => d.id === deviceId)
			if (deviceToAdd) {
				setSelectedDevicesData(prevMap => new Map(prevMap).set(deviceToAdd.id, deviceToAdd))
				onAddDevice('addDevice', deviceId)
			}
		},
		[onAddDevice, allDevices?.data]
	)

	const handleRemoveDevice = useCallback(
		(deviceId: string) => {
			onRemoveDevice('removeDevice', deviceId)
		},
		[onRemoveDevice]
	)

	return {
		loading,
		missingInitialIds,
		availableOptions,
		inputValue,
		selectedDevicesData,
		setInputValue,
		handleInitialDeviceLoad,
		handleAddDevice,
		handleRemoveDevice
	}
}
