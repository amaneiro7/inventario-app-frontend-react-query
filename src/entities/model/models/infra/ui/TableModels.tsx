import React from 'react'
import { ModelDescription } from '@/entities/model/models/infra/ui/ModelsDescription'
import { useExpendedRows } from '@/shared/lib/hooks/useExpendedRows'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { TableCellOpenIcon } from '@/shared/ui/Table/TableCellOpenIcon'
import { TableCellError } from '@/shared/ui/Table/TableCellError'
import { TableCellEmpty } from '@/shared/ui/Table/TableCellEmpty'
import { type ModelDto } from '@/entities/model/models/domain/dto/Model.dto'

interface Props {
	models?: ModelDto[]
	isError: boolean
	colSpan: number
	visibleColumns: string[]
}

export function TableModels({ models, colSpan, isError, visibleColumns }: Props) {
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
							<TableCell size="small" value={model?.category?.mainCategory?.name} />
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
