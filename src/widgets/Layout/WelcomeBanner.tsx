import React, { memo, Suspense, useContext, useRef } from 'react'
import { type LoginUserDto } from '@/entities/user/domain/dto/LoginUser.dto'
import { useGreetings } from '@/shared/lib/hooks/useGreetings'
import { formatDateTime } from '@/shared/lib/utils/formatDate'
import { Dialog, type ModalRef } from '@/shared/ui/Modal/Modal'
import { ConfirmationModal } from '@/shared/ui/Modal/ConfirmationModal'
import { AuthContext } from '@/app/providers/AuthContext'
import { LogoutIcon } from '@/shared/ui/icon/LogoutIcon'
import Button from '@/shared/ui/Button'
import { InfoItem } from './InfoItem'

type WelcomeBannerProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLParagraphElement>,
	HTMLParagraphElement
> & {
	user: LoginUserDto | null
}

export const WelcomeBanner = memo(({ user }: WelcomeBannerProps) => {
	const dialogExitRef = useRef<ModalRef>(null)
	const {
		auth: { logout }
	} = useContext(AuthContext)

	const handleOpen = () => dialogExitRef.current?.handleOpen()
	const handleClose = () => dialogExitRef.current?.handleClose()
	const handleLogout = async () => {
		logout()
		handleClose()
	}

	if (user === null) return null
	const { greeting } = useGreetings()
	return (
		<>
			<section className="border-naranja flex w-full items-center justify-between gap-4 overflow-visible border-b bg-gray-200 px-4 py-2 shadow-lg md:text-sm">
				{/* Contenedor principal para alinear elementos */}
				<div className="flex flex-1 items-center justify-between">
					{/* Información del usuario (se apila en móvil, flexible en escritorio) */}
					<div className="flex flex-col items-start lg:flex-row lg:items-center lg:gap-4">
						<InfoItem
							icon="user"
							label={`${greeting},`}
							value={`${user.employee?.name} ${user.employee?.lastName}`}
							iconClassName="fill-white"
						/>
						{/* Contenedor para info adicional que se mueve en responsive */}
						<div className="hidden flex-col items-start lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-4">
							<InfoItem
								icon="clock"
								label="Último acceso:"
								iconClassName="p-0"
								value={
									user.lastLoginAt
										? formatDateTime(user.lastLoginAt)
										: 'Primer inicio'
								}
							/>
							<InfoItem
								icon="mapPin"
								label="IP de último acceso:"
								value={user.lastLoginIp ?? 'No registrada'}
								className="hidden sm:inline-flex" // Se oculta en pantallas muy pequeñas
							/>
						</div>
					</div>

					{/* Botón de Salir */}
					<Button
						aria-label="Botón para cerrar sesión del usuario"
						color="orange"
						size="content"
						text="Salir"
						onClick={handleOpen}
						type="button"
						buttonSize="small"
						icon={<LogoutIcon width={20} className="aspect-square" aria-hidden />}
					/>
				</div>
			</section>
			<Suspense>
				<Dialog ref={dialogExitRef}>
					<ConfirmationModal
						onCancel={handleClose}
						onConfirm={handleLogout}
						description={
							<>¿Está seguro que desea {<strong>Cerrar la Sesión</strong>}?</>
						}
					/>
				</Dialog>
			</Suspense>
		</>
	)
})

WelcomeBanner.displayName = 'WelcomeBanner'
