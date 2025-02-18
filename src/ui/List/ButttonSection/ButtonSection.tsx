import { lazy, memo, MouseEventHandler } from 'react'

interface Props {
	handleClear?: () => void
	handleAdd: () => void
	handleExportToExcel?: () => void
	loading?: boolean
	isFilterOpen?: boolean
	handleFilter?: MouseEventHandler<HTMLButtonElement>
}

const Button = lazy(async () => import('@/components/Button/Button'))
const DownloadIcon = lazy(async () =>
	import('@/icon/DownloadIcon').then(m => ({ default: m.DownloadIcon }))
)
const CircleSpinningIcon = lazy(() =>
	import('@/icon/CircleSpinning').then(m => ({
		default: m.CircleSpinningIcon
	}))
)
const AddIcon = lazy(async () => import('@/icon/AddIcon').then(m => ({ default: m.AddIcon })))
const FilterIcon = lazy(async () =>
	import('@/icon/FilterIcon').then(m => ({ default: m.FilterIcon }))
)

export const ButtonSection = memo(
	({ loading, handleFilter, handleAdd, handleClear, handleExportToExcel }: Props) => {
		return (
			<section className="my-4 min-h-8 flex gap-2">
				<Button
					type="button"
					color="green"
					size="content"
					text={loading ? 'Descargando' : `Descargar`}
					buttonSize="medium"
					disabled={loading}
					icon={
						loading ? (
							<CircleSpinningIcon width={20} />
						) : (
							<DownloadIcon width={20} className="aspect-square" />
						)
					}
					onClick={handleExportToExcel}
				/>

				<Button
					type="button"
					text="Añadir"
					color="orange"
					size="content"
					onClick={handleAdd}
					buttonSize="medium"
					icon={<AddIcon width={20} fill="white" className="aspect-square" />}
				/>

				<Button
					color="blanco"
					size="content"
					type="button"
					buttonSize="medium"
					text="Limpiar"
					onClick={handleClear}
				/>

				{handleFilter ? (
					<Button
						type="button"
						color="blanco"
						size="content"
						text="Filtros"
						buttonSize="medium"
						onClick={handleFilter}
						icon={<FilterIcon width={14} className="aspect-square" />}
					/>
				) : null}
			</section>
		)
	}
)
