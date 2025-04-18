import { lazy, useContext } from 'react'
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
	} = useContext(AuthContext)

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

			<Modal key="profilePageModal" ref={dialogRef}>
				<ConfirmationModal
					handleClose={handleCloseModal}
					formId={formId}
					text="¿Seguro que desea cambiar la contraseña?"
				/>
			</Modal>
		</>
	)
}
