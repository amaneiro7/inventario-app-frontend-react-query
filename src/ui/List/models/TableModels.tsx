import React from 'react'
import { useExpendedRows } from '@/hooks/utils/useExpendedRows'
import { TableRow } from '@/components/Table/TableRow'
import { TableCell } from '@/components/Table/TableCell'
import { ModelDescription } from './ModelsDescription'
import { TableCellOpenIcon } from '@/components/Table/TableCellOpenIcon'
import { TableCellError } from '@/components/Table/TableCellError'
import { TableCellEmpty } from '@/components/Table/TableCellEmpty'
import { type ModelDto } from '@/core/model/models/domain/dto/Model.dto'

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
							'[&>td]:bg-slate-200 [&>td]:border-b-slate-200'
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
