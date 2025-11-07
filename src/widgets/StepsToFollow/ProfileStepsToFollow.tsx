import { lazy, memo, Suspense } from 'react'

const Icon = lazy(async () => import('@/shared/ui/icon/Icon').then(m => ({ default: m.Icon })))
const Switch = lazy(async () =>
	import('@/shared/ui/Switch').then(m => ({
		default: m.Switch
	}))
)

const StepsText = lazy(async () =>
	import('@/widgets/StepsToFollow/StepsTexto').then(m => ({ default: m.StepsText }))
)

export const ProfileStepsToFollow = memo(() => {
	return (
		<>
			<StepsText
				requisito="paso 1"
				text="Para modificar el rol de un usuario, active el interruptor "
				iconText="Habilitar Edición"
				icon={
					<Suspense
						fallback={
							<span className="h-4 w-4 animate-pulse rounded-full bg-slate-200" />
						}
					>
						<Switch className="data-[state=checked]:bg-naranja pointer-events-none" />
					</Suspense>
				}
				backgroundColor="azul"
			/>
			<StepsText
				requisito="paso 2"
				text="Una vez habilitada la edición, seleccione el nuevo rol y guarde los cambios presionando "
				iconText="Guardar Cambios"
				icon={
					<Suspense
						fallback={
							<span className="h-4 w-4 animate-pulse rounded-full bg-slate-200" />
						}
					>
						<Icon name="save" className="h-4 w-4" />
					</Suspense>
				}
				backgroundColor="verde"
			/>
			<StepsText
				requisito="acciones"
				text="Para acciones como Restablecer contraseña, Deshabilitar o Desbloquear, use el menú de opciones "
				icon={
					<Suspense
						fallback={
							<span className="h-4 w-4 animate-pulse rounded-full bg-slate-200" />
						}
					>
						<Icon name="moreVertical" className="h-4 w-4" />
					</Suspense>
				}
				backgroundColor="rojo"
			/>
		</>
	)
})
