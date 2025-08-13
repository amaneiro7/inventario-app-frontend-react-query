import React, { lazy, memo } from 'react'
import { useExpendedRows } from '@/shared/lib/hooks/useExpendedRows'
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
const ModelDescription = lazy(() =>
	import('@/entities/model/models/infra/ui/ModelsDescription').then(m => ({
		default: m.ModelDescription
	}))
)

interface TableModelsProps {
	/**
	 * An array of model data to display in the table.
	 */
	models?: ModelDto[]
	/**
	 * Indicates whether an error occurred during data fetching.
	 */
	isError: boolean
	/**
	 * The number of columns the table should span.
	 */
	colSpan: number
	/**
	 * An array of column names that are currently visible in the table.
	 * Used to conditionally render table cells.
	 */
	visibleColumns: string[]
}

/**
 * `TableModels` is a functional component that renders a table of model data.
 * It handles displaying loading states, error states, empty states, and individual model rows
 * with expandable details.
 */
export const TableModels = memo(
	({ models, colSpan, isError, visibleColumns }: TableModelsProps) => {
		const { expandedRows, handleRowClick } = useExpendedRows()
		if (isError) {
			return <TableCellError colSpan={colSpan} />
		}
		if (models && models.length === 0) {
			return <TableCellEmpty colSpan={colSpan} />
		}
		return (
			<>
				{models?.map(model => (
					<React.Fragment key={model.id}>
						<TableRow
							className={`[&>td]:cursor-pointer ${
								expandedRows.includes(model.id) &&
								'[&>td]:border-b-slate-200 [&>td]:bg-slate-200'
							}`}
							onClick={() => handleRowClick(model.id)}
						>
							{visibleColumns.includes('mainCategoryId') ? (
								<TableCell
									size="small"
									value={model?.category?.mainCategory?.name}
								/>
							) : null}
							{visibleColumns.includes('categoryId') ? (
								<TableCell size="small" value={model?.category?.name} />
							) : null}
							{visibleColumns.includes('brandId') ? (
								<TableCell size="small" value={model?.brand?.name} />
							) : null}
							{visibleColumns.includes('name') ? (
								<TableCell size="large" value={model?.name} />
							) : null}
							{visibleColumns.includes('generic') ? (
								<TableCell size="small" value={model?.generic ? 'Si' : 'No'} />
							) : null}
							<TableCellOpenIcon open={expandedRows.includes(model.id)} />
						</TableRow>

						<ModelDescription
							open={expandedRows.includes(model.id)}
							model={model}
							colSpan={colSpan}
							visibleColumns={visibleColumns}
						/>
					</React.Fragment>
				))}
			</>
		)
	}
)
TableModels.displayName = 'TableModels'
