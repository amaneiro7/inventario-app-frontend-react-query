import { memo } from 'react'

interface RecordPerPageProps {
	pageSize?: number
	total?: number
	registerOptions: number[]
	handlePageSize: (pageSize: number) => void
}

export const RecordPerPage = memo(function ({
	pageSize,
	total = 0,
	registerOptions,
	handlePageSize
}: RecordPerPageProps) {
	if (total === undefined || total <= Math.min(...registerOptions)) {
		return null
	}
	return (
		<label htmlFor="records-per-page" aria-label="Seleccionar cantidad de registros por página">
			<select
				id="records-per-page"
				name="records-per-page"
				value={pageSize}
				onChange={event => {
					handlePageSize(Number(event.target.value))
				}}
				className="flex justify-center items-center gap-2 min-h-11 h-11 py-2 px-4 text-base text-azul-900 border-azul-900 bg-white hover:text-white hover:bg-azul-900 disabled:bg-azul-900 font-medium rounded-md cursor-pointer border border-solid transition-all duration-200 ease-in disabled:opacity-70 disabled:cursor-not-allowed appearance-none"
			>
				{registerOptions.map(option => {
					return (
						total >= option && (
							<option
								key={option}
								className="bg-white text-azul-900"
								value={option}
								title={`Mostrar ${option} registros por página`}
							>
								{`${option} registros`}
							</option>
						)
					)
				})}
			</select>
		</label>
	)
})
