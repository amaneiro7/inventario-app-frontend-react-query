import { lazy, Suspense, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'
import { Tag } from '@/components/Tag'
import Typography from '@/components/Typography'
import { AddIcon } from '@/icon/AddIcon'
import { PageTitle } from '@/ui/PageTitle'
import { SearchSection } from '@/components/FormContainer/SearchSection'
import { Seo } from '@/components/Seo'
import { DynamicBreadcrumb } from '@/components/DynamicBreadcrumb'
import { StepsToFollow } from '@/components/StepsToFollow/StepsToFollow'
import { ProfileStepsToFollow } from '@/components/StepsToFollow/ProfileStepsToFollow'
import { RegisterEditStepsToFollow } from '@/components/StepsToFollow/RegisterEditStepsToFollow'
import { InputFallback } from '@/components/Loading/InputFallback'

const UserServiceSearch = lazy(() =>
	import('@/ui/UserManagement/UserServiceSearch').then(m => ({ default: m.UserServiceSearch }))
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
					<Suspense>
						<SearchSection
							url="/user-management/register"
							searchInput={
								<Suspense fallback={<InputFallback />}>
									<UserServiceSearch />
								</Suspense>
							}
							isEdit={pageInfo.page !== 'register'}
						/>
					</Suspense>
				</DetailsBoxWrapper>
				<Outlet />
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
