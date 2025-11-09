import { lazy, Suspense, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'

import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'
import Typography from '@/shared/ui/Typography'
import { PageTitle } from '@/shared/ui/PageTitle'
import { Seo } from '@/shared/ui/Seo'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'

const ProfileStepsToFollow = lazy(() =>
	import('@/widgets/StepsToFollow/ProfileStepsToFollow').then(m => ({
		default: m.ProfileStepsToFollow
	}))
)
const RegisterStepsToFollow = lazy(() =>
	import('@/widgets/StepsToFollow/RegisterStepsToFollow').then(m => ({
		default: m.RegisterStepsToFollow
	}))
)
const StepsToFollow = lazy(() =>
	import('@/widgets/StepsToFollow/StepsToFollow').then(m => ({ default: m.StepsToFollow }))
)

const SearchSection = lazy(() =>
	import('@/widgets/FormContainer/SearchSection').then(m => ({ default: m.SearchSection }))
)

const UserServiceSearch = lazy(() =>
	import('@/features/user-serach/ui/UserServiceSearch').then(m => ({
		default: m.UserServiceSearch
	}))
)
export default function UserManagement() {
	const location = useLocation()
	const pageInfo = useMemo(() => {
		const path = location.pathname
		if (path.includes('register'))
			return {
				page: 'register' as const,
				subtitle: '- Registrar Usuario',
				title: 'Registrar Nuevo Usuario | Gestión de Usuarios',
				description:
					'Formulario para registrar un nuevo usuario en el sistema de gestión. Ingrese los detalles del nuevo usuario.'
			}
		if (path.includes('profile'))
			return {
				page: 'profile' as const,
				subtitle: '- Perfil de Usuario',
				title: 'Perfil de Usuario | Gestión de Usuarios',
				description:
					'Visualiza y gestiona la información del perfil de un usuario. Desde aquí puedes editar su rol y realizar otras acciones administrativas.'
			}
		return {
			page: null as null,
			subtitle: '',
			title: 'Gestión de Usuarios',
			description:
				'Panel principal para la gestión de usuarios del sistema. Busca, edita, registra y administra cuentas de usuario.'
		}
	}, [location.pathname])
	return (
		<>
			<Seo title={pageInfo.title} description={pageInfo.description} />
			<DynamicBreadcrumb segments={['Gestión de usuarios']} />
			<PageTitle title={`Gestión de usuarios ${pageInfo.subtitle}`} />
			<DetailsWrapper borderColor="blue">
				<DetailsBoxWrapper>
					<Typography variant="p" className="inline-flex items-center gap-1 text-center">
						<Typography variant="span" color="gris" option="small">
							{pageInfo.page === 'register'
								? 'Complete el formulario para crear una nueva cuenta de usuario. Si el usuario ya existe, puede buscarlo aquí.'
								: 'Busque un usuario por su correo para ver o editar su perfil, o registre uno nuevo.'}
						</Typography>
					</Typography>

					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								message="La sección de búsqueda no está disponible."
								onReset={onReset}
								variant="compact"
							/>
						)}
					>
						<SearchSection
							url="/user-management/register"
							text="Registrar un nuevo usuario"
							searchInput={
								<Suspense fallback={<InputFallback />}>
									<UserServiceSearch />
								</Suspense>
							}
							isEdit={pageInfo.page !== 'register'}
						/>
					</ErrorBoundary>
				</DetailsBoxWrapper>
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							message="Ocurrió un error al cargar el contenido."
							onReset={onReset}
						/>
					)}
				>
					<Outlet />
				</ErrorBoundary>
			</DetailsWrapper>
			{pageInfo.page && (
				<Suspense fallback={null}>
					<StepsToFollow>
						{pageInfo.page === 'register' && <RegisterStepsToFollow />}
						{pageInfo.page === 'profile' && <ProfileStepsToFollow />}
					</StepsToFollow>
				</Suspense>
			)}
		</>
	)
}
