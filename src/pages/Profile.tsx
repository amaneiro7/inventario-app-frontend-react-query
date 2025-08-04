import { Suspense, lazy, use } from 'react'
import { AuthContext } from '@/app/providers/AuthContext'
import { PageTitle } from '@/shared/ui/PageTitle'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'
import { DetailsInfo } from '@/shared/ui/DetailsWrapper/DetailsInfo'
import { DescriptionListElement } from '@/shared/ui/DetailsWrapper/DescriptionListElement'
import { DescriptionDesc } from '@/shared/ui/DetailsWrapper/DescriptionDesc'
import { StepsToFollow } from '@/widgets/StepsToFollow/StepsToFollow'
import { ChangePasswordStepsToFollow } from '@/widgets/StepsToFollow/ChangePasswordStepsToFollow'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { Seo } from '@/shared/ui/Seo'

const LoadingSpinner = lazy(() =>
	import('@/shared/ui/Loading/LoadingSpinner').then(m => ({ default: m.LoadingSpinner }))
)
const LinkAsButton = lazy(() =>
	import('@/shared/ui/Button/LinkAsButton').then(m => ({ default: m.LinkAsButton }))
)

const EmptyState = lazy(() =>
	import('@/ui/Profile/EmptyState').then(m => ({ default: m.EmptyState }))
)
const ChangePassowrdForm = lazy(() =>
	import('@/ui/Profile/ChangePasswordForm').then(m => ({ default: m.ChangePassowrdForm }))
)
export default function ProfilePage() {
	const {
		auth: { user, isLoginLoading }
	} = use(AuthContext)

	if (isLoginLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<LoadingSpinner />
			</div>
		)
	}

	if (!user) {
		return (
			<div className="flex h-screen flex-col items-center justify-center space-y-4">
				<EmptyState
					title="Perfil no disponible"
					description="Parece que no se pudo cargar la información de tu perfil o tu sesión ha expirado. Por favor, intenta iniciar sesión nuevamente."
				/>
				{/* Optionally, add a button to redirect to login */}
				<LinkAsButton
					buttonSize="medium"
					color="blue"
					text="Ir a Iniciar Sesión"
					to="/login"
				/>
			</div>
		)
	}

	return (
		<>
			<Seo
				title="Perfil de Usuario | Gestión del Sistema"
				description="Visualiza y gestiona la información de tu perfil de usuario, incluyendo datos de contacto y la opción para cambiar tu contraseña de acceso al sistema."
			/>
			<DynamicBreadcrumb segments={['Perfil de usuario']} />
			<PageTitle title="Perfil de usuario" />

			<DetailsWrapper title="A continuación le indicamos los datos de contacto">
				<DetailsInfo title="Datos de Contacto">
					<DescriptionListElement title="Nombre">
						<DescriptionDesc desc={user?.name ?? ''} />
					</DescriptionListElement>
					<DescriptionListElement title="Apellido">
						<DescriptionDesc desc={user?.lastName ?? ''} />
					</DescriptionListElement>
					<DescriptionListElement title="Correo">
						<DescriptionDesc desc={user?.email ?? ''} />
					</DescriptionListElement>
					<DescriptionListElement title="Role">
						<DescriptionDesc desc={user?.role?.name ?? ''} />
					</DescriptionListElement>
				</DetailsInfo>
				<Suspense>
					<ChangePassowrdForm userEmail={user?.email ?? ''} />
				</Suspense>
			</DetailsWrapper>

			<StepsToFollow>
				<ChangePasswordStepsToFollow />
			</StepsToFollow>
		</>
	)
}
