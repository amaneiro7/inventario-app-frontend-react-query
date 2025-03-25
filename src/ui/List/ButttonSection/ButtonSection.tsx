import { memo, MouseEventHandler } from 'react'
import Button from '@/components/Button'
import { AddIcon } from '@/icon/AddIcon'
import { CircleSpinningIcon } from '@/icon/CircleSpinning'
import { DownloadIcon } from '@/icon/DownloadIcon'
import { FilterIcon } from '@/icon/FilterIcon'
import { eventManager } from '@/utils/eventManager'

interface ButtonSectionProps {
	handleClear?: () => void
	handleAdd: () => void
	handleExportToExcel?: () => Promise<void>
	loading?: boolean
	handleFilter?: MouseEventHandler<HTMLButtonElement>
}

export const ButtonSection = memo(
	({
		loading = false,
		handleFilter,
		handleAdd,
		handleClear,
		handleExportToExcel,
		children
	}: React.PropsWithChildren<ButtonSectionProps>) => {
		return (
			<section className="w-full my-4 min-h-8 flex justify-start items-start gap-2">
				{handleExportToExcel && (
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
						onClick={eventManager(handleExportToExcel)}
					/>
				)}

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

				{handleFilter && (
					<Button
						type="button"
						color="blanco"
						size="content"
						text="Filtros"
						data-filter-aside-button="true"
						buttonSize="medium"
						onClick={handleFilter}
						icon={<FilterIcon width={14} className="aspect-square" />}
					/>
				)}
				<div className="w-56 ml-auto">{children}</div>
			</section>
		)
	}
)
