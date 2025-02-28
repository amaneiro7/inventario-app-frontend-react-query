import Button from '@/components/Button'
import { AddIcon } from '@/icon/AddIcon'
import { CircleSpinningIcon } from '@/icon/CircleSpinning'
import { DownloadIcon } from '@/icon/DownloadIcon'
import { FilterIcon } from '@/icon/FilterIcon'
import { memo, MouseEventHandler } from 'react'

interface Props {
	handleClear?: () => void
	handleAdd: () => void
	handleExportToExcel?: () => void
	loading?: boolean
	isFilterOpen?: boolean
	handleFilter?: MouseEventHandler<HTMLButtonElement>
}

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
					type="reset"
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
