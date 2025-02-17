import React, { lazy, Suspense } from 'react'
import { useExpendedRows } from '@/hooks/utils/useExpendedRows'
import { type ModelDto } from '@/core/model/models/domain/dto/Model.dto'

interface Props {
	models?: ModelDto[]
}

const TableCell = lazy(async () =>
	import('@/components/Table/TableCell').then(m => ({
		default: m.TableCell
	}))
)
const TableRow = lazy(async () =>
	import('@/components/Table/TableRow').then(m => ({
		default: m.TableRow
	}))
)
const TableCellOpenIcon = lazy(async () =>
	import('@/components/Table/TableCellOpenIcon').then(m => ({
		default: m.TableCellOpenIcon
	}))
)
const ModelDescription = lazy(async () =>
	import('@/ui/List/models/ModelsDescription').then(m => ({
		default: m.ModelDescription
	}))
)

export function TableModels({ models }: Props) {
	const { expandedRows, handleRowClick } = useExpendedRows()
	return (
		<Suspense>
			{models?.map(model => (
				<React.Fragment key={model.id}>
					<TableRow
						className={`[&>td]:cursor-pointer ${
							expandedRows.includes(model.id) &&
							'[&>td]:bg-slate-200 [&>td]:border-b-slate-200'
						}`}
						onClick={() => handleRowClick(model.id)}
					>
						<TableCell size="small" value={model?.category?.mainCategory?.name} />
						<TableCell size="small" value={model?.category?.name} />
						<TableCell size="small" value={model?.brand?.name} />
						<TableCell size="large" value={model?.name} />
						<TableCell size="small" value={model?.generic ? 'Si' : 'No'} />
						<TableCellOpenIcon open={expandedRows.includes(model.id)} />
					</TableRow>
					<Suspense>
						<ModelDescription open={expandedRows.includes(model.id)} model={model} />
					</Suspense>
				</React.Fragment>
			))}
		</Suspense>
	)
}
