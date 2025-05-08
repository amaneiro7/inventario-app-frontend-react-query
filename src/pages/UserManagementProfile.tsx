import { lazy, Suspense, useMemo, useState } from 'react'
import { DescriptionDesc } from '@/components/DetailsWrapper/DescriptionDesc'
import { DescriptionListElement } from '@/components/DetailsWrapper/DescriptionListElement'
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { DetailsInfo } from '@/components/DetailsWrapper/DetailsInfo'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'
import { useCreateUser } from '@/core/user/infra/hooks/useCreateModels'
import { EditHandle } from '@/ui/UserManagement/EditHandle'
import { ResetHandle } from '@/ui/UserManagement/ResetHandle'
import { DeleteHandle } from '@/ui/UserManagement/DeleteHandle'

type Actions = 'editar' | 'reset' | 'delete'
export default function ManagementProfile() {
	const { formData } = useCreateUser()
	const [action, setAction] = useState<Actions>('editar')

	const title = useMemo(() => {
		if (action === 'editar') return 'Editar'
		if (action === 'reset') return 'Restablecer contraseña'
		if (action === 'delete') return 'Eliminar Usuario'
		return 'Seleccione'
	}, [action])

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
						<DescriptionDesc desc={formData?.role?.name} />
					</DescriptionListElement>
					<div className="grid h-max grid-cols-3 items-center gap-4 overflow-hidden px-4 py-2">
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
					</div>
					<DescriptionListElement title={title}>
						{action === 'editar' ? (
							<EditHandle id={formData.id} />
						) : action === 'reset' ? (
							<ResetHandle id={formData.id} />
						) : action === 'delete' ? (
							<DeleteHandle id={formData.id} />
						) : null}
					</DescriptionListElement>
				</DetailsInfo>
			</DetailsBoxWrapper>
		</Suspense>
	)
}
