import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { PageTitle } from '@/shared/ui/PageTitle'
import { Seo } from '@/shared/ui/Seo'

export default function Settings() {
	return (
		<>
			<Seo
				title="Perfil de Usuario | Gestión del Sistema"
				description="Visualiza y gestiona la información de tu perfil de usuario, incluyendo datos de contacto y la opción para cambiar tu contraseña de acceso al sistema."
			/>
			<DynamicBreadcrumb segments={['Perfil de usuario']} />
			<PageTitle title="Perfil de usuario" />
		</>
	)
}
