import { lazy, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const PageTitle = lazy(
	async () =>
		await import('@/ui/PageTitle').then(m => ({ default: m.PageTitle }))
)
const DetailsWrapper = lazy(
	async () =>
		await import('@/components/DetailsWrapper/DetailsWrapper').then(m => ({
			default: m.DetailsWrapper
		}))
)
const DetailsBoxWrapper = lazy(
	async () =>
		await import('@/components/DetailsWrapper/DetailsBoxWrapper').then(
			m => ({
				default: m.DetailsBoxWrapper
			})
		)
)

const Tag = lazy(
	async () => await import('@/components/Tag').then(m => ({ default: m.Tag }))
)

const AddIcon = lazy(async () =>
	import('@/icon/AddIcon').then(m => ({
		default: m.AddIcon
	}))
)

const Typography = lazy(async () => await import('@/components/Typography'))
export default function UserManagement() {
	const location = useLocation()
	const pageIs = useMemo(() => {
		if (location.pathname.includes('register')) return 'register'
		if (location.pathname.includes('profile')) return 'profile'
		if (location.pathname.includes('edit')) return 'edit'
		return null
	}, [location.pathname])

	const subtitle = useMemo(() => {
		if (pageIs === 'register') return '- Registrar nuevo usuario'
		if (pageIs === 'edit') return '- Editar usuario'
		if (pageIs === 'profile') return '- Información del usuario'
		return ''
	}, [pageIs])

	const desc = useMemo(() => {
		if (pageIs !== 'register')
			return ' o registre un nuevo usuario presionando el boton'
		return ''
	}, [pageIs])
	return (
		<>
			<PageTitle title="Gestión de usuarios" />
			<DetailsWrapper borderColor="blue">
				<DetailsBoxWrapper>
					<Typography variant="h4" color="azul" transform="uppercase">
						{`Gestión de usuarios ${subtitle}`}
					</Typography>
					<Typography
						variant="p"
						className="inline-flex gap-1 items-center text-center"
					>
						<Typography
							variant="span"
							color="gris"
							option="small"
							className="text-gris"
						>
							{`Ingrese el correo del usuario que desea visualizar,
							editar, restablecer contraseña o eliminar ${desc}.`}
							{pageIs !== 'register' && (
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
