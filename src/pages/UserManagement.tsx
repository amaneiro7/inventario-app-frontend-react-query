import { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'
import { Tag } from '@/components/Tag'
import Typography from '@/components/Typography'
import { AddIcon } from '@/icon/AddIcon'
import { PageTitle } from '@/ui/PageTitle'
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
			<PageTitle title="Gestión de usuarios" />
			<DetailsWrapper borderColor="blue">
				<DetailsBoxWrapper>
					<Typography variant="h4" color="azul" transform="uppercase">
						{`Gestión de usuarios ${pageInfo.subtitle}`}
					</Typography>
					<Typography variant="p" className="inline-flex gap-1 items-center text-center">
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
				</DetailsBoxWrapper>
				<Outlet />
			</DetailsWrapper>
		</>
	)
}
