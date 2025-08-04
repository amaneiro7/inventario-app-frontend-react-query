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
	const minOption = Math.min(...registerOptions)

	// If total is less than or equal to the smallest option, don't show the selector.
	// This prevents showing a selector when there aren't enough records to warrant changing page size.
	if (total <= minOption) {
		return null
	}

	// Filter options once to avoid repeated calculations in the map function
	// Only show options that are less than or equal to the total number of records
	const availableOptions = registerOptions.filter(option => option <= total)

	// If, after filtering, there's only one option left (which would be the minOption),
	// there's no point in showing a dropdown to select page size, so return null.
	if (availableOptions.length <= 1) {
		return null
	}
	return (
		<label
			htmlFor="records-per-page"
			className="flex items-center gap-2 text-sm text-gray-700"
			aria-label="Seleccionar cantidad de registros por página"
		>
			<span className="sr-only">Registros por página</span>
			<span aria-hidden="true">Mostrar:</span>
			<select
				id="records-per-page"
				name="records-per-page"
				value={pageSize ?? availableOptions[0]}
				onChange={event => {
					handlePageSize(Number(event.target.value))
				}}
				className="text-azul-900 border-azul-900 hover:bg-azul-900 flex h-9 min-h-9 cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-solid bg-white px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-in hover:text-white disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:opacity-70"
				aria-controls="location-data-list" // Assuming this controls a list/table, update ID as needed
			>
				{availableOptions.map(option => {
					return (
						<option
							key={option}
							className="text-azul-900 bg-white"
							value={option}
							title={`Mostrar ${option} registros por página`}
						>
							{`${option} registros`}
						</option>
					)
				})}
			</select>
		</label>
	)
})
