import { lazy, memo, Suspense } from 'react'

const EditIcon = lazy(async () =>
	import('@/shared/ui/icon/EditIcon').then(m => ({ default: m.EditIcon }))
)
const ResetIcon = lazy(async () =>
	import('@/shared/ui/icon/ResetIcon').then(m => ({ default: m.ResetIcon }))
)
const ThrashIcon = lazy(async () =>
	import('@/shared/ui/icon/ThrashIcon').then(m => ({ default: m.ThrashIcon }))
)
const StepsText = lazy(async () =>
	import('@/widgets/StepsToFollow/StepsTexto').then(m => ({ default: m.StepsText }))
)

export const ProfileStepsToFollow = memo(() => {
	return (
		<>
			<StepsText
				requisito="opcional"
				text="Para modificar un usuario, oprima "
				iconText="Editar"
				icon={
					<Suspense
						fallback={
							<span className="h-4 w-4 animate-pulse rounded-full bg-slate-200" />
						}
					>
						<EditIcon width={16} />
					</Suspense>
				}
				backgroundColor="azul"
			/>
			<StepsText
				requisito="opcional"
				text="Para restablecer la contraseña de un usuario (La contraseña por defecto es Avion01.), oprima "
				iconText="Restablecer Contraseña"
				icon={
					<Suspense
						fallback={
							<span className="h-4 w-4 animate-pulse rounded-full bg-slate-200" />
						}
					>
						<ResetIcon width={16} />
					</Suspense>
				}
				backgroundColor="verde"
			/>
			<StepsText
				requisito="opcional"
				text="Para eliminar un usuario, oprima "
				iconText="Eliminar usuario"
				icon={
					<Suspense
						fallback={
							<span className="h-4 w-4 animate-pulse rounded-full bg-slate-200" />
						}
					>
						<ThrashIcon width={16} />
					</Suspense>
				}
				backgroundColor="rojo"
			/>
		</>
	)
})
