export const LoadingSpinner = () => (
	<div className="flex h-full min-h-75 items-center justify-center">
		<div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900 dark:border-gray-100"></div>
		<p className="ml-4 text-gray-700 dark:text-gray-300">
			Cargando datos del monitoreo de ubicaciones...
		</p>
	</div>
)
