import { memo } from 'react'
import { formatDateTime } from '@/shared/lib/utils/formatDate'
import { DescriptionDesc } from '@/shared/ui/DetailsWrapper/DescriptionDesc'
import { DescriptionListElement } from '@/shared/ui/DetailsWrapper/DescriptionListElement'
import { DetailsInfo } from '@/shared/ui/DetailsWrapper/DetailsInfo'
import { type LoginUserDto } from '@/entities/user/domain/dto/LoginUser.dto'

interface UserLocalProfileDetailsProps {
	user: LoginUserDto
}

export const UserLocalProfileDetails = memo(({ user }: UserLocalProfileDetailsProps) => {
	return (
		<DetailsInfo title="Datos de Contacto">
			<DescriptionListElement title="Usuario">
				<DescriptionDesc desc={user?.userName ?? 'No disponible'} />
			</DescriptionListElement>
			<DescriptionListElement title="Nombre">
				<DescriptionDesc desc={user?.employee?.name ?? 'No disponible'} />
			</DescriptionListElement>
			<DescriptionListElement title="Apellido">
				<DescriptionDesc desc={user?.employee?.lastName ?? 'No disponible'} />
			</DescriptionListElement>
			<DescriptionListElement title="Correo">
				<DescriptionDesc desc={user?.employee?.email ?? 'No disponible'} />
			</DescriptionListElement>
			<DescriptionListElement title="Rol de Sistema">
				<DescriptionDesc desc={user?.role?.name ?? 'No asignado'} />
			</DescriptionListElement>
			<DescriptionListElement title="Último cambio de contraseña">
				<DescriptionDesc
					desc={user?.passwordChangeAt ? formatDateTime(user.passwordChangeAt) : 'Nunca'}
				/>
			</DescriptionListElement>
		</DetailsInfo>
	)
})

UserLocalProfileDetails.displayName = 'UserLocalProfileDetails'
