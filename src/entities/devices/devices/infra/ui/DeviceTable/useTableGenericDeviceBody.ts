import { useRef, useState } from 'react'
import { type ModalRef } from '@/shared/ui/Modal/Modal'

export const useTableGenericDeviceBody = <T>() => {
	const [selectedDevice, setSelectedDevice] = useState<T | null>(null)
	const dialogRef = useRef<ModalRef>(null)

	const handleViewDetails = (device: T) => {
		setSelectedDevice(device)
		dialogRef.current?.handleOpen()
	}

	const handleCloseModal = () => {
		dialogRef.current?.handleClose()
		setSelectedDevice(null)
	}

	return {
		selectedDevice,
		dialogRef,
		handleViewDetails,
		handleCloseModal
	}
}
