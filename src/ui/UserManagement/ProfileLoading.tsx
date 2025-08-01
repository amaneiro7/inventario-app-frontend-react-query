import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { DetailsInfo } from '@/shared/ui/DetailsWrapper/DetailsInfo'
import { DescriptionListElement } from '@/shared/ui/DetailsWrapper/DescriptionListElement'
import { Skeleton } from '@/shared/ui/Skeleton' // Assuming you have a Skeleton component

export const ManagementProfileLoading = () => {
	return (
		<DetailsBoxWrapper position="center">
			<DetailsInfo title="Información del usuario">
				<DescriptionListElement title="Nombre">
					<Skeleton width={200} height={24} />
				</DescriptionListElement>
				<DescriptionListElement title="Apellido">
					<Skeleton width={150} height={24} />
				</DescriptionListElement>
				<DescriptionListElement title="Correo">
					<Skeleton width={250} height={24} />
				</DescriptionListElement>
				<DescriptionListElement title="Role">
					<Skeleton width={120} height={24} />
				</DescriptionListElement>
				<DescriptionListElement title="Acciones">
					<Skeleton width={180} height={40} />
				</DescriptionListElement>
				<DescriptionListElement title="Editar">
					<Skeleton width={180} height={32} />
				</DescriptionListElement>
			</DetailsInfo>
		</DetailsBoxWrapper>
	)
}
