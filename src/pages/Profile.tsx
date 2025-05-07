import { lazy, Suspense, use } from 'react'
import { AuthContext } from '@/context/Auth/AuthContext'
import { useChangePassword } from '@/core/user/infra/hooks/useChangePassword'
import { PageTitle } from '@/ui/PageTitle'
import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'
import { DetailsInfo } from '@/components/DetailsWrapper/DetailsInfo'
import { DescriptionListElement } from '@/components/DetailsWrapper/DescriptionListElement'
import { ChangePassowrdForm } from '@/ui/Profile/ChangePasswordForm'
import { DescriptionDesc } from '@/components/DetailsWrapper/DescriptionDesc'
import { StepsToFollow } from '@/components/StepsToFollow/StepsToFollow'
import { ChangePasswordStepsToFollow } from '@/components/StepsToFollow/ChangePasswordStepsToFollow'
import { DynamicBreadcrumb } from '@/components/DynamicBreadcrumb'
import { Seo } from '@/components/Seo'

const Modal = lazy(async () =>
	import('@/components/Modal/Modal').then(m => ({ default: m.Dialog }))
)
const ConfirmationModal = lazy(async () =>
	import('@/components/Modal/ConfirmationModal').then(m => ({
		default: m.ConfirmationModal
	}))
)

export default function ProfilePage() {
	const {
		auth: { user }
	} = use(AuthContext)

	const {
		dialogRef,
		errors,
		formData,
		formId,
		handleChange,
		handleClose,
		handleCloseModal,
		handleOpenModal,
		handleSubmit,
		handleToggleInputs,
		isDisabled,
		loading,
		toggleInputs
	} = useChangePassword()

	return (
		<>
			<Seo
				title="Perfil de Usuario | Gestión del Sistema"
				description="Visualiza y gestiona la información de tu perfil de usuario, incluyendo datos de contacto y la opción para cambiar tu contraseña de acceso al sistema."
			/>
			<DynamicBreadcrumb segments={['Perfil de usuario']} />
			<PageTitle title="Perfil de usuario" />

			<DetailsWrapper title="A continuación le indicamos los datos de contacto">
				<DetailsInfo title="Datos de Contacto">
					<DescriptionListElement title="Nombre">
						<DescriptionDesc desc={user?.name ?? ''} />
					</DescriptionListElement>
					<DescriptionListElement title="Apellido">
						<DescriptionDesc desc={user?.lastName ?? ''} />
					</DescriptionListElement>
					<DescriptionListElement title="Correo">
						<DescriptionDesc desc={user?.email ?? ''} />
					</DescriptionListElement>
					<DescriptionListElement title="Role">
						<DescriptionDesc desc={user?.role?.name ?? ''} />
					</DescriptionListElement>
				</DetailsInfo>

				<ChangePassowrdForm
					formId={formId}
					userEmail={user?.email ?? ''}
					toggleInputs={toggleInputs}
					errors={errors}
					formData={formData}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					handleClose={handleClose}
					handleToggleInputs={handleToggleInputs}
					handleOpenModal={handleOpenModal}
					isDisabled={isDisabled}
					loading={loading}
				/>
			</DetailsWrapper>

			<StepsToFollow>
				<ChangePasswordStepsToFollow />
			</StepsToFollow>

			<Suspense>
				<Modal key="profilePageModal" ref={dialogRef}>
					<ConfirmationModal
						handleClose={handleCloseModal}
						formId={formId}
						text="¿Seguro que desea cambiar la contraseña?"
					/>
				</Modal>
			</Suspense>
		</>
	)
}
