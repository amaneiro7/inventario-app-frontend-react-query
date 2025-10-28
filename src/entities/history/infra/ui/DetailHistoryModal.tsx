import { lazy, memo } from 'react'
import { type HistoryDto } from '@/entities/history/domain/dto/History.dto'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import { Icon } from '@/shared/ui/icon/Icon'
import { HistoryModalTitle } from './HistoryModalTitle'
import { formatDateToUTC } from '@/shared/lib/utils/formatDateToUTC'
import { getHistoryActionText } from './getHistoryActionText'

const ChangeDisplay = lazy(() =>
	import('./ChangeDisplay').then(m => ({ default: m.ChangeDisplay }))
)

const DetailItem = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailItem').then(m => ({ default: m.DetailItem }))
)
const CardDetail = lazy(() =>
	import('@/shared/ui/DescriptionList/CardDetail').then(m => ({ default: m.CardDetail }))
)

const DetailModalContent = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailModalContent').then(m => ({
		default: m.DetailModalContent
	}))
)

const DetailModalWrapper = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailModalWrapper').then(m => ({
		default: m.DetailModalWrapper
	}))
)
const DetailModalHeader = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailModalHeader').then(m => ({
		default: m.DetailModalHeader
	}))
)

interface DetailHistoryModalProps {
	history: HistoryDto
	onClose: () => void
}

/**
 * `DetailHistoryModal` is a memoized component that displays detailed information about a history record.
 * It is typically used within a table row to show additional details when expanded, including changes made.
 */
export const DetailHistoryModal = memo(({ history, onClose }: DetailHistoryModalProps) => {
	const userName =
		history.user?.employee?.name && history.user?.employee?.lastName
			? `${history.user?.employee?.name} ${history.user?.employee?.lastName ?? ''}`.trim()
			: 'Sistema'
	const deviceIdentifier = history.device?.serial ?? history.deviceId
	const actionName = getHistoryActionText(history.action)

	return (
		<DetailModalWrapper>
			<DetailModalHeader onClose={onClose} url={`/form/device/edit/${history.deviceId}`}>
				<HistoryModalTitle
					action={history.action}
					deviceIdentifier={deviceIdentifier}
					userName={userName}
				/>
			</DetailModalHeader>
			<DetailModalContent>
				{/* Tarjeta de Resumen del Evento */}
				<CardDetail
					className="lg:col-span-2"
					title="Resumen del Evento"
					icon={<Icon name="info" className="h-5 w-5" />}
				>
					<div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
						<DetailItem label="Realizado por" value={userName} />
						<DetailItem label="Acción Realizada" value={actionName} />
						<DetailItem label="Dispositivo Afectado" value={deviceIdentifier} />
						<DetailItem
							label="Fecha del Cambio"
							value={history.createdAt ? formatDateToUTC(history.createdAt) : ''}
						/>
						<DetailItem
							label="Última Actualización del registro"
							value={history.updatedAt ? getRelativeTime(history.updatedAt) : ''}
						/>
					</div>
				</CardDetail>
				{/* Tarjeta con los Cambios Detallados */}
				<CardDetail
					className="lg:col-span-2"
					title="Cambios Realizados"
					classNameContent="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-2"
					icon={<Icon name="list" className="h-5 w-5" />}
				>
					<ChangeDisplay action={history.action} changes={history.cambios} />
				</CardDetail>
			</DetailModalContent>
		</DetailModalWrapper>
	)
})
