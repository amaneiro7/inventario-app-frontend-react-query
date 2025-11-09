import React, { memo } from 'react'
import { CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { Icon } from '@/shared/ui/icon/Icon'

export const UserProfileHeader = memo(({ children }: React.PropsWithChildren) => {
	return (
		<CardHeader>
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-4">
					<Icon
						name="userCircle"
						className="h-16 w-16 text-gray-300 dark:text-gray-600"
					/>
					<div>
						<CardTitle className="text-xl">Perfil del Usuario</CardTitle>
						<CardDescription>
							Visualiza y edita los detalles de la cuenta.
						</CardDescription>
					</div>
				</div>
				{children}
			</div>
		</CardHeader>
	)
})

UserProfileHeader.displayName = 'UserProfileHeader'
