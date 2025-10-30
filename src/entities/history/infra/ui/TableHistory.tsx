import { lazy, memo, Suspense } from 'react'
import { useTableGenericDeviceBody } from '@/entities/devices/devices/infra/ui/DeviceTable/useTableGenericDeviceBody'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import { type HistoryDto } from '@/entities/history/domain/dto/History.dto'
import { type BackgroundType } from '@/shared/ui/Typography/types'

const DetailHistoryModal = lazy(() =>
	import('./DetailHistoryModal').then(m => ({ default: m.DetailHistoryModal }))
)
const Tag = lazy(() => import('@/shared/ui/Tag').then(m => ({ default: m.Tag })))

const TableCell = lazy(() =>
	import('@/shared/ui/Table/TableCell').then(m => ({ default: m.TableCell }))
)
const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)
const TableCellOpenIcon = lazy(() =>
	import('@/shared/ui/Table/TableCellOpenIcon').then(m => ({ default: m.TableCellOpenIcon }))
)
const TableCellError = lazy(() =>
	import('@/shared/ui/Table/TableCellError').then(m => ({ default: m.TableCellError }))
)
const TableCellEmpty = lazy(() =>
	import('@/shared/ui/Table/TableCellEmpty').then(m => ({ default: m.TableCellEmpty }))
)
const Dialog = lazy(() => import('@/shared/ui/Modal/Modal').then(m => ({ default: m.Dialog })))
interface TableHistoryProps {
	histories?: HistoryDto[]
	isError: boolean
}

/**
 * `TableHistory` is a memoized component that renders a table of history records.
 * It handles displaying loading states, error states, empty states, and individual history rows
 * with expandable details.
 */
export const TableHistory = memo(({ histories, isError }: TableHistoryProps) => {
	const { dialogRef, handleCloseModal, handleViewDetails, selectedDevice } =
		useTableGenericDeviceBody<HistoryDto>()

	if (isError) {
		return <TableCellError />
	}
	if (histories && histories.length === 0) {
		return <TableCellEmpty />
	}

	return (
		<>
			{histories?.map(history => {
				const relativeTime = `${new Date(
					history.updatedAt
				).toLocaleDateString()} (${getRelativeTime(history.updatedAt)})`
				const operation = history.action === 'UPDATE' ? 'Modificación' : 'Creación'
				const backGroundColor: BackgroundType =
					operation === 'Creación' ? 'naranja' : 'verde'
				return (
					<TableRow key={history.id}>
						<TableCell
							aria-colindex={1}
							size="medium"
							value={history.user?.employee?.userName ?? ''}
						>
							{history.user?.employee?.userName ?? ''}
						</TableCell>
						<TableCell aria-colindex={2} size="small" className="hidden md:table-cell">
							<Tag
								color="white"
								iconText={operation}
								backgroundColor={backGroundColor}
								option="tiny"
							/>
						</TableCell>
						<TableCell
							aria-colindex={3}
							className="hidden lg:table-cell"
							size="small"
							value={history.device?.category?.name ?? ''}
						>
							{history.device?.category?.name ?? ''}
						</TableCell>
						<TableCell
							aria-colindex={4}
							size="small"
							value={history.device?.serial ?? ''}
						>
							{history.device?.serial ?? ''}
						</TableCell>
						<TableCell
							aria-colindex={5}
							size="small"
							value={relativeTime}
							className="hidden lg:table-cell"
						>
							{relativeTime}
						</TableCell>
						<TableCellOpenIcon index={6} onClick={() => handleViewDetails(history)} />
					</TableRow>
				)
			})}
			<Suspense>
				<Dialog ref={dialogRef}>
					{selectedDevice && (
						<DetailHistoryModal onClose={handleCloseModal} history={selectedDevice} />
					)}
				</Dialog>
			</Suspense>
		</>
	)
})
