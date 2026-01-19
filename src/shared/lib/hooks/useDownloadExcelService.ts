import { useCallback, useState } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { DeviceDownload } from '@/entities/devices/devices/application/DeviceDownload'
import { DeviceDownloadService } from '@/entities/devices/devices/infra/service/deviceDownload.service'
import { ModelDownload } from '@/entities/model/models/application/ModelDownload'
import { ModelDownloadService } from '@/entities/model/models/infra/service/modelDownload.service'
import { EmployeeDownload } from '@/entities/employee/employee/application/EmployeeDownload'
import { EmployeeDownloadService } from '@/entities/employee/employee/infra/service/employeeDownload.service'
import { type Source } from '@/types/type'
import { type DeviceBaseFilters } from '@/entities/devices/devices/application/createDeviceQueryParams'

export function useDownloadExcelService() {
	const { events } = useAuthStore.getState()
	const [isDownloading, setIsDownloading] = useState(false)
	const download = useCallback(
		async ({ query, source }: { query: DeviceBaseFilters; source: Source }) => {
			setIsDownloading(true)
			try {
				if (source === 'model') {
					await new ModelDownload(new ModelDownloadService(), events).run({
						...query,
						source
					})
				} else if (source === 'employee') {
					await new EmployeeDownload(new EmployeeDownloadService(), events).run({
						...query,
						source
					})
				} else {
					await new DeviceDownload(new DeviceDownloadService(), events).run({
						...query,
						source
					})
				}
			} catch (error) {
				console.error(error)
			} finally {
				setIsDownloading(false)
			}
		},
		[]
	)

	return { isDownloading, download }
}
