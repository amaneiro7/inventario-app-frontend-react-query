import { lazy, Suspense, use } from 'react'
import { AuthContext } from '@/app/providers/AuthContext'
import { PageTitle } from '@/shared/ui/PageTitle'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { Seo } from '@/shared/ui/Seo'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { StepsToFollow } from '@/widgets/StepsToFollow/StepsToFollow'
import { ChangePasswordProfileStepsToFollow } from '@/widgets/StepsToFollow/ChangePasswordProfileStepsToFollow'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { UserLocalProfileDetails } from '@/features/user-profile-details/ui/UserLocalProfileDetails'

const LoadingSpinner = lazy(
	async () =>
		await import('@/shared/ui/Loading/LoadingSpinner').then(m => ({
			default: m.LoadingSpinner
		}))
)
const LinkAsButton = lazy(
	async () =>
		await import('@/shared/ui/Button/LinkAsButton').then(m => ({ default: m.LinkAsButton }))
)

const EmptyState = lazy(() =>
	import('@/shared/ui/EmptyState').then(m => ({ default: m.EmptyState }))
)
const ChangePassowrdForm = lazy(() =>
	import('@/features/change-password/ui/ChangePasswordForm').then(m => ({
		default: m.ChangePassowrdForm
	}))
)
export default function ProfilePage() {
	const {
		auth: { user, isLoginLoading }
	} = use(AuthContext)

	if (isLoginLoading) {
		return (
			<Suspense>
				<div className="flex h-screen items-center justify-center">
					<LoadingSpinner />
				</div>
			</Suspense>
		)
	}

	if (!user) {
		return (
			<Suspense>
				<div className="flex h-screen flex-col items-center justify-center space-y-4">
					<EmptyState
						title="Perfil no disponible"
						description="Parece que no se pudo cargar la información de tu perfil o tu sesión ha expirado. Por favor, intenta iniciar sesión nuevamente."
					/>
					<LinkAsButton
						buttonSize="medium"
						color="blue"
						text="Ir a Iniciar Sesión"
						to="/login"
					/>
				</div>
			</Suspense>
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
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							onReset={onReset}
							message="No se pudo cargar los detalles del perfil."
						/>
					)}
				>
					<UserLocalProfileDetails user={user} />
				</ErrorBoundary>

				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							onReset={onReset}
							message="No se pudo cargar el formulario de contraseña."
						/>
					)}
				>
					<Suspense fallback={<FormSkeletonLayout />}>
						<ChangePassowrdForm userEmail={user?.employee?.email ?? ''} />
					</Suspense>
				</ErrorBoundary>
			</DetailsWrapper>

			<StepsToFollow>
				<ChangePasswordProfileStepsToFollow />
			</StepsToFollow>
		</>
	)
}
