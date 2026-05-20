export const AccessPolicyFormSkeletonLayout = () => (
	<>
		{/* Inputs */}
		<div className="flex w-full flex-col gap-4">
			<div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
				{/*Nombre de la politica */}
				<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
				{/* Centro de Prioridad */}
				<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
				{/* Roles */}
				<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
				{/* Unidad Organizativa */}
				<div className="mb-5 h-10 animate-pulse rounded bg-gray-200" />
				{/* Cargos */}
				<div className="mb-5 h-10 animate-pulse rounded bg-gray-200 md:col-span-2" />
			</div>
			{/* Grupo de permisos */}
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
