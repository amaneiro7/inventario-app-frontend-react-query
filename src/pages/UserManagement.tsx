import { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'
import { Tag } from '@/components/Tag'
import Typography from '@/components/Typography'
import { AddIcon } from '@/icon/AddIcon'
import { PageTitle } from '@/ui/PageTitle'
import { SearchSection } from '@/components/FormContainer/SearchSection'
import { UserServiceSearch } from '@/ui/UserManagement/UserServiceSearch'
import { Seo } from '@/components/Seo'
import { DynamicBreadcrumb } from '@/components/DynamicBreadcrumb'
import { StepsToFollow } from '@/components/StepsToFollow/StepsToFollow'
import { ProfileStepsToFollow } from '@/components/StepsToFollow/ProfileStepsToFollow'
import { RegisterEditStepsToFollow } from '@/components/StepsToFollow/RegisterEditStepsToFollow'
export default function UserManagement() {
	const location = useLocation()
	const pageInfo = useMemo(() => {
		const path = location.pathname
		if (path.includes('register'))
			return { page: 'register', subtitle: '- Registrar nuevo usuario', desc: '' }
		if (path.includes('profile'))
			return {
				page: 'profile',
				subtitle: '- Información del usuario',
				desc: ' o registre un nuevo usuario presionando el boton'
			}
		if (path.includes('edit'))
			return {
				page: 'edit',
				subtitle: '- Editar usuario',
				desc: ' o registre un nuevo usuario presionando el boton'
			}
		return { page: null, subtitle: '', desc: '' }
	}, [location.pathname])
	return (
		<>
			<Seo title="" description="" />
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
					<SearchSection
						url="/user-management/register"
						searchInput={<UserServiceSearch />}
						isEdit={pageInfo.page !== 'register'}
					/>
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
