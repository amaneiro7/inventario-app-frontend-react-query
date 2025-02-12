import { AuthContext } from '@/context/Auth/AuthContext'
import { useChangePassword } from '@/hooks/useChangePassword'
import { lazy, useContext } from 'react'

const PageTitle = lazy(async () => import('@/ui/PageTitle').then(m => ({ default: m.PageTitle })))
const DetailsWrapper = lazy(async () =>
	import('@/components/DetailsWrapper/DetailsWrapper').then(m => ({
		default: m.DetailsWrapper
	}))
)
const DetailsInfo = lazy(async () =>
	import('@/components/DetailsWrapper/DetailsInfo').then(m => ({
		default: m.DetailsInfo
	}))
)
const DescriptionListElement = lazy(async () =>
	import('@/components/DetailsWrapper/DescriptionListElement').then(m => ({
		default: m.DescriptionListElement
	}))
)
const DescriptionDesc = lazy(async () =>
	import('@/components/DetailsWrapper/DescriptionDesc').then(m => ({
		default: m.DescriptionDesc
	}))
)
const ChangePassowrdForm = lazy(async () =>
	import('@/ui/Profile/ChangePasswordForm').then(m => ({
		default: m.ChangePassowrdForm
	}))
)
const StepsToFollow = lazy(async () =>
	import('@/components/StepsToFollow/StepsToFollow').then(m => ({
		default: m.StepsToFollow
	}))
)
const ChangePasswordStepsToFollow = lazy(async () =>
	import('@/components/StepsToFollow/ChangePasswordStepsToFollow').then(m => ({
		default: m.ChangePasswordStepsToFollow
	}))
)
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
