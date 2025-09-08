import { lazy, Suspense, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'
import { Tag } from '@/shared/ui/Tag'
import Typography from '@/shared/ui/Typography'
import { AddIcon } from '@/shared/ui/icon/AddIcon'
import { PageTitle } from '@/shared/ui/PageTitle'
import { Seo } from '@/shared/ui/Seo'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { StepsToFollow } from '@/widgets/StepsToFollow/StepsToFollow'
import { ProfileStepsToFollow } from '@/widgets/StepsToFollow/ProfileStepsToFollow'
import { RegisterEditStepsToFollow } from '@/widgets/StepsToFollow/RegisterEditStepsToFollow'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'

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
				page: 'register',
				subtitle: '- Registrar nuevo usuario',
				desc: '',
				title: 'Registrar Nuevo Usuario | Gestión de Usuarios',
				description:
					'Formulario para registrar un nuevo usuario en el sistema de gestión. Ingrese los detalles del nuevo usuario.'
			}
		if (path.includes('profile'))
			return {
				page: 'profile',
				subtitle: '- Información del usuario',
				desc: ' o registre un nuevo usuario presionando el boton',
				title: 'Perfil de Usuario | Gestión de Usuarios',
				description:
					'Visualiza y gestiona la información del perfil de usuario. También puedes registrar un nuevo usuario desde esta sección.'
			}
		if (path.includes('edit'))
			return {
				page: 'edit',
				subtitle: '- Editar usuario',
				desc: ' o registre un nuevo usuario presionando el boton',
				title: 'Editar Usuario | Gestión de Usuarios',
				description:
					'Formulario para editar la información de un usuario existente en el sistema de gestión. Realiza los cambios necesarios.'
			}
		return {
			page: null,
			subtitle: '',
			desc: '',
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
						<Typography
							variant="span"
							color="gris"
							option="small"
							className="text-gris"
						>
							{`Ingrese el correo del usuario que desea visualizar,
							editar, restablecer contraseña o eliminar ${pageInfo.desc}.`}
							{pageInfo.page !== 'register' && (
								<Tag
									color="white"
									option="tiny"
									backgroundColor="naranja"
									icon={<AddIcon width={10} />}
									iconText="Agregar Nuevo"
								/>
							)}
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
						<Suspense fallback={<InputFallback />}>
							<SearchSection
								url="/user-management/register"
								searchInput={<UserServiceSearch />}
								isEdit={pageInfo.page !== 'register'}
							/>
						</Suspense>
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
			{pageInfo.page ? (
				<StepsToFollow>
					{pageInfo.page === 'register' || pageInfo.page === 'edit' ? (
						<RegisterEditStepsToFollow />
					) : null}
					{pageInfo.page === 'profile' ? <ProfileStepsToFollow /> : null}
				</StepsToFollow>
			) : null}
		</>
	)
}
