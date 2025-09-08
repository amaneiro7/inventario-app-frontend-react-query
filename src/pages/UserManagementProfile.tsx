import { lazy, Suspense, useState } from 'react'
import { useCreateUser } from '@/entities/user/infra/hooks/useCreateModels'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select'
import { DescriptionDesc } from '@/shared/ui/DetailsWrapper/DescriptionDesc'
import { DescriptionListElement } from '@/shared/ui/DetailsWrapper/DescriptionListElement'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { DetailsInfo } from '@/shared/ui/DetailsWrapper/DetailsInfo'
import { Skeleton } from '@/shared/ui/skeletons/Skeleton'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'

const ManagementProfileLoading = lazy(() =>
	import('@/shared/ui/Loading/ProfileLoading').then(m => ({
		default: m.ManagementProfileLoading
	}))
)
const EditUserButton = lazy(() =>
	import('@/features/user-edit/ui/EditUserButton').then(m => ({ default: m.EditUserButton }))
)
const ResetPasswordButton = lazy(() =>
	import('@/features/user-reset-password/ui/ResetPasswordButton').then(m => ({
		default: m.ResetPasswordButton
	}))
)
const DeleteUserButton = lazy(() =>
	import('@/features/user-delete/ui/DeleteUserButton').then(m => ({
		default: m.DeleteUserButton
	}))
)

type Actions = 'editar' | 'reset' | 'delete'

const ActionHandle = ({ action, id }: { action: Actions; id: string }) => {
	switch (action) {
		case 'editar':
			return <EditUserButton id={id} />
		case 'reset':
			return <ResetPasswordButton id={id} />
		case 'delete':
			return <DeleteUserButton id={id} />
		default:
			return null
	}
}

export default function ManagementProfile() {
	const { formData, isLoading, isNotFound } = useCreateUser()
	const [action, setAction] = useState<Actions>('editar')

	const title = `${
		action === 'editar'
			? 'Editar'
			: action === 'reset'
				? 'Restablecer contraseña'
				: action === 'delete'
					? 'Eliminar Usuario'
					: 'Seleccione'
	}`
	if (isLoading) {
		return (
			<DetailsBoxWrapper position="center">
				<ManagementProfileLoading />
			</DetailsBoxWrapper>
		)
	}

	if (isNotFound || !formData?.id) {
		return (
			<DetailsBoxWrapper position="center">
				<div className="bg-rojo-50 rounded-md p-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg
								className="text-rojo-400 h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94l-1.72-1.72z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="ml-3">
							<h3 className="text-rojo-800 text-sm font-medium">
								Usuario no encontrado
							</h3>
							<div className="text-rojo-700 mt-2 text-sm">
								<p>
									No se pudieron cargar los detalles del usuario. Por favor,
									verifica la información o intenta nuevamente.
								</p>
							</div>
						</div>
					</div>
				</div>
			</DetailsBoxWrapper>
		)
	}

	return (
		<DetailsBoxWrapper position="center">
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						onReset={onReset}
						message="No se pudieron mostrar los detalles de este usuario."
					/>
				)}
			>
				<DetailsInfo title="Información del usuario">
					<DescriptionListElement title="Nombre">
						<DescriptionDesc desc={formData.name} />
					</DescriptionListElement>
					<DescriptionListElement title="Apellido">
						<DescriptionDesc desc={formData.lastName} />
					</DescriptionListElement>
					<DescriptionListElement title="Correo">
						<DescriptionDesc desc={formData.email} />
					</DescriptionListElement>
					<DescriptionListElement title="Role">
						<DescriptionDesc desc={formData?.role?.name ?? ''} />
					</DescriptionListElement>
					<DescriptionListElement title="Acciones">
						<Select value={action} onValueChange={value => setAction(value as Actions)}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Acciones" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="editar">Editar</SelectItem>
								<SelectItem value="reset">Restablecer contraseña</SelectItem>
								<SelectItem value="delete">Eliminar Usuario</SelectItem>
							</SelectContent>
						</Select>
					</DescriptionListElement>
					<DescriptionListElement title={title}>
						<Suspense fallback={<Skeleton width={180} height={32} />}>
							<ActionHandle action={action} id={formData?.id} />
						</Suspense>
					</DescriptionListElement>
				</DetailsInfo>
			</ErrorBoundary>
		</DetailsBoxWrapper>
	)
}
