import { lazy, memo, Suspense } from 'react'

const RightArrowIcon = lazy(async () =>
	import('@/shared/ui/icon/RightArrowIcon').then(m => ({ default: m.RightArrowIcon }))
)
const CancelIcon = lazy(async () =>
	import('@/shared/ui/icon/CancelIcon').then(m => ({ default: m.CancelIcon }))
)
const StepsText = lazy(async () => import('./StepsTexto').then(m => ({ default: m.StepsText })))

export const RegisterEditStepsToFollow = memo(() => {
	return (
		<>
			<StepsText
				requisito="obligatorio"
				text="Ingrese el Nombre, el Apellido, el correo electrónico y el cargo del usuario, si es correcto, oprima "
				iconText="Continuar"
				icon={
					<Suspense
						fallback={
							<span className="h-4 w-4 animate-pulse rounded-full bg-slate-200" />
						}
					>
						<RightArrowIcon width={16} className="fill-white" />
					</Suspense>
				}
				backgroundColor="verde"
			/>
			<StepsText
				requisito="opcional"
				text="Si desea abortar la operación, oprima "
				iconText="Cancelar"
				icon={
					<Suspense
						fallback={
							<span className="h-4 w-4 animate-pulse rounded-full bg-slate-200" />
						}
					>
						<CancelIcon width={16} />
					</Suspense>
				}
				backgroundColor="gris"
			/>
		</>
	)
})
