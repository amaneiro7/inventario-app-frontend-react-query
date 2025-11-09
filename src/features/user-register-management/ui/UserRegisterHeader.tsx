import { memo } from 'react'
import { CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'

export const UserRegisterHeader = memo(() => {
	return (
		<CardHeader>
			<CardTitle>Registrar Nuevo Usuario</CardTitle>
			<CardDescription>
				Busca un empleado existente y asígnale un rol para crear su cuenta de usuario.
			</CardDescription>
		</CardHeader>
	)
})

UserRegisterHeader.displayName = 'UserRegisterHeader'
