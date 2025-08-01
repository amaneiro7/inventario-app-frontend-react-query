import { Suspense, useState } from 'react'
import { DescriptionDesc } from '@/shared/ui/DetailsWrapper/DescriptionDesc'
import { DescriptionListElement } from '@/shared/ui/DetailsWrapper/DescriptionListElement'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { DetailsInfo } from '@/shared/ui/DetailsWrapper/DetailsInfo'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select'
import { useCreateUser } from '@/entities/user/infra/hooks/useCreateModels'
import { EditHandle } from '@/ui/UserManagement/EditHandle'
import { ResetHandle } from '@/ui/UserManagement/ResetHandle'
import { DeleteHandle } from '@/ui/UserManagement/DeleteHandle'
import { ManagementProfileLoading } from '@/ui/UserManagement/ProfileLoading'

type Actions = 'editar' | 'reset' | 'delete'

const ActionHandle = ({ action, id }: { action: Actions; id: string }) => {
	switch (action) {
		case 'editar':
			return <EditHandle id={id} />
		case 'reset':
			return <ResetHandle id={id} />
		case 'delete':
			return <DeleteHandle id={id} />
		default:
			return null
	}
}

export default function ManagementProfile() {
	const { formData, loading } = useCreateUser()
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
	if (loading) {
		return <ManagementProfileLoading />
	}

	if (!formData?.id) {
		return (
			<DetailsBoxWrapper position="center">
				<div className="rounded-md bg-red-50 p-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg
								className="h-5 w-5 text-red-400"
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
							<h3 className="text-sm font-medium text-red-800">
								Usuario no encontrado
							</h3>
							<div className="mt-2 text-sm text-red-700">
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
		<Suspense>
			<DetailsBoxWrapper position="center">
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
						<ActionHandle action={action} id={formData.id} />
					</DescriptionListElement>
				</DetailsInfo>
			</DetailsBoxWrapper>
		</Suspense>
	)
}
