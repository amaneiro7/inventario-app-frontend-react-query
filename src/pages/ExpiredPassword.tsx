import { lazy, Suspense } from 'react'
import { Seo } from '@/shared/ui/Seo'
import { PageTitle } from '@/shared/ui/PageTitle'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'

const ExpiredPasswordForm = lazy(() =>
	import('@/features/change-password/ui/ExpiredPasswordForm').then(m => ({
		default: m.ExpiredPasswordForm
	}))
)

export default function ExpiredPassword() {
	return (
		<>
			<Seo
				title="Actualizar Contraseña Expirada"
				description="Actualiza tu contraseña para recuperar el acceso a tu cuenta."
			/>
			<PageTitle title="Tu contraseña ha expirado" />

			<DetailsWrapper
				borderColor="red"
				title="Por favor, crea una nueva contraseña para continuar."
			>
				<Suspense fallback={<FormSkeletonLayout />}>
					<ExpiredPasswordForm />
				</Suspense>
			</DetailsWrapper>
		</>
	)
}
