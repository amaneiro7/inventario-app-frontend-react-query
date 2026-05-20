export const UnidadFormSkeletonLayout = () => (
	<>
		{/* Inputs */}
		<div className="flex w-full flex-col gap-4">
			<div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
				{/* Nombre de la Unidad */}
				<div className="mb-5 h-10 animate-pulse rounded bg-gray-200 md:col-span-2" />
				{/* Unidad Superior */}
				<div className="mb-5 h-10 animate-pulse rounded bg-gray-200 md:col-span-2" />
				{/* Nivel Jerárquico */}
				<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
				{/* Codigo Interno */}
				<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
				{/* Centro de Costos */}
				<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
			</div>
			{/* Cargos */}
			<div className="grid gap-4 md:grid-cols-2">
				<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
				<div>
					<div className="h-10 animate-pulse rounded bg-gray-400" />
					<div className="h-10 animate-pulse rounded bg-gray-200" />
					<div className="h-10 animate-pulse rounded bg-gray-200" />
				</div>
			</div>
		</div>
	</>
)
