import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { DeviceGetService } from '../service/deviceGet.service'
import { DeviceGetter } from '../../application/DeviceGetter'
import { useGetFormMode } from '@/hooks/useGetFormMode'
import { type DefaultDevice } from '../reducers/devicesFormReducer'
import { type DeviceDto } from '../../domain/dto/Device.dto'

export function useDeviceInitialState(defaulState: DefaultDevice): {
	initialState: DefaultDevice
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const [state, setState] = useState<DefaultDevice>(defaulState)

	const repository = useMemo(() => new DeviceGetService(), [])
	const get = useMemo(() => new DeviceGetter(repository), [repository])

	const mode = useGetFormMode()

	const { data: deviceData, refetch } = useQuery({
		queryKey: ['device', id],
		queryFn: () => (id ? get.execute({ id }) : undefined),
		enabled: !!id && mode === 'edit' && !location?.state?.device
	})

	const mappedDeviceState = useCallback((device: DeviceDto): void => {
		setState(prev => {
			const { computer, model, hardDrive, mfp } = device

			const memoryRamSlotQuantity = model?.modelComputer?.memoryRamSlotQuantity
			const memoryRamType = model?.modelComputer?.memoryRamType?.name ?? ''
			let memoryRam: number[] | undefined
			if (computer && memoryRamSlotQuantity) {
				// solo lo calcula si computer y memoryRamSlotAuqntity estan definidos
				memoryRam =
					computer.memoryRam.length !== memoryRamSlotQuantity
						? [
								...computer.memoryRam,
								...Array(memoryRamSlotQuantity - computer.memoryRam.length)
							].fill(0)
						: computer.memoryRam
				if (
					computer.memoryRamCapacity > 0 &&
					computer.memoryRam.length !== memoryRamSlotQuantity
				) {
					memoryRam[0] = Number(computer.memoryRamCapacity)
				}
			}
			return {
				...prev,
				id: device.id,
				statusId: device.statusId,
				mainCategoryId: device.category.mainCategoryId,
				categoryId: device.categoryId,
				serial: device.serial ?? '',
				activo: device.activo ?? '',
				brandId: device.brandId,
				modelId: device.modelId,
				genericModel: model?.generic,
				employeeId: device.employeeId ?? '',
				locationId: device.locationId,
				typeOfSiteId: device.location.typeOfSiteId,
				observation: device.observation ?? '',
				stockNumber: device.stockNumber ?? '',
				computerName: computer?.computerName ?? '',
				processorId: computer?.processorId ?? '',
				memoryRamCapacity: computer?.memoryRamCapacity ?? 0,
				hardDriveCapacityId: computer?.hardDriveCapacityId
					? computer.hardDriveCapacityId
					: hardDrive?.hardDriveCapacityId
						? hardDrive.hardDriveCapacityId
						: '',
				hardDriveTypeId: computer?.hardDriveTypeId
					? computer.hardDriveTypeId
					: hardDrive?.hardDriveTypeId
						? hardDrive.hardDriveTypeId
						: '',
				operatingSystemArqId: computer?.operatingSystemArqId ?? '',
				operatingSystemId: computer?.operatingSystemId ?? '',
				ipAddress: computer?.ipAddress
					? computer.ipAddress
					: mfp?.ipAddress
						? mfp.ipAddress
						: '',
				macAddress: computer?.macAddress ?? '',
				health: hardDrive?.health ?? 100,
				memoryRam: memoryRam ?? [0],
				memoryRamSlotQuantity,
				memoryRamType,
				history: device.history,
				updatedAt: device.updatedAt
			}
		})
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('device')) {
			setState(defaulState)
			return
		}

		if (!id) {
			navigate('/error')
			return
		} else if (location.state?.data) {
			const device = location.state.data
			setState(device)
		} else {
			if (deviceData) {
				mappedDeviceState(deviceData)
			}
		}
	}, [mode, deviceData, location.state, defaulState, navigate])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('device')) return
		if (mode === 'add') {
			setState({
				id: undefined,
				...defaulState
			})
		} else {
			const { data } = await refetch()
			if (data) {
				mappedDeviceState(data)
			}
		}
	}, [defaulState, location.pathname, mode, refetch])

	return {
		mode,
		initialState: state,
		resetState
	}
}
