import { lazy, memo, Suspense } from 'react'
import { useTableGenericDeviceBody } from '@/entities/devices/devices/infra/ui/DeviceTable/useTableGenericDeviceBody'
import { type ModelDto } from '@/entities/model/models/domain/dto/Model.dto'

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
const DetailsModelModal = lazy(() =>
	import('./DetailsModelModal').then(m => ({ default: m.DetailsModelModal }))
)

interface TableModelsProps {
	models?: ModelDto[]
	isError: boolean
}

/**
 * `TableModels` is a functional component that renders a table of model data.
 * It handles displaying loading states, error states, empty states, and individual model rows
 * with expandable details.
 */
export const TableModels = memo(({ models, isError }: TableModelsProps) => {
	const { dialogRef, handleCloseModal, handleViewDetails, selectedDevice } =
		useTableGenericDeviceBody<ModelDto>()
	if (isError) {
		return <TableCellError />
	}
	if (models && models.length === 0) {
		return <TableCellEmpty />
	}
	return (
		<>
			{models?.map(model => (
				<TableRow key={model.id}>
					<TableCell
						aria-colindex={1}
						size="large"
						value={model?.category?.mainCategory?.name}
					>
						{model?.category?.mainCategory?.name}
					</TableCell>

					<TableCell aria-colindex={2} size="medium" value={model?.category?.name}>
						{model?.category?.name}
					</TableCell>

					<TableCell aria-colindex={3} size="medium" value={model?.brand?.name}>
						{model?.brand?.name}
					</TableCell>

					<TableCell aria-colindex={4} size="auto" value={model?.name}>
						{model?.name}
					</TableCell>

					<TableCell
						aria-colindex={5}
						size="small"
						value={model?.generic ? 'Si' : 'No'}
						className="hidden md:table-cell"
					>
						{model?.generic ? 'Si' : 'No'}
					</TableCell>

					<TableCellOpenIcon index={6} onClick={() => handleViewDetails(model)} />
				</TableRow>
			))}
			<Suspense>
				<Dialog ref={dialogRef}>
					{selectedDevice && (
						<DetailsModelModal onClose={handleCloseModal} model={selectedDevice} />
					)}
				</Dialog>
			</Suspense>
		</>
	)
})
TableModels.displayName = 'TableModels'
