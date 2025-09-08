import { Suspense } from 'react'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { FormComponent } from '@/widgets/FormContainer/FormComponent'
import { Input } from '@/shared/ui/Input/Input'
import { useCreateUser } from '@/entities/user/infra/hooks/useCreateModels'
import { RoleCombobox } from '@/entities/role/infra/ui/RoleComboBox'
import { Skeleton } from '@/shared/ui/skeletons/Skeleton'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'

// Un esqueleto de carga simple para el formulario
const RegisterFormSkeleton = () => (
	<div className="w-full max-w-lg space-y-6">
		<Skeleton className="h-8 w-1/3" />
		<div className="space-y-4">
			<Skeleton className="h-10 w-full" />
			<Skeleton className="h-10 w-full" />
			<Skeleton className="h-10 w-full" />
		</div>
		<Skeleton className="h-10 w-24 self-end" />
	</div>
)

export default function RegisterPage() {
	const { formData, key, errors, required, handleChange, handleSubmit } = useCreateUser()

	return (
		<Suspense fallback={<RegisterFormSkeleton />}>
			<DetailsBoxWrapper position="center">
				<ErrorBoundary>
					<FormComponent
						id={key}
						key={key}
						title="Usuario"
						handleSubmit={handleSubmit}
						handleClose={() => {
							window.history.back()
						}}
					>
						<div className="flex flex-col md:flex-row md:gap-8">
							<Input
								id="user-name"
								value={formData.name}
								name="name"
								label="Nombre"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									handleChange('name', e.target.value)
								}
								error={!!errors?.name}
								errorMessage={errors?.name}
								required={required.name}
							/>
							<Input
								id="user-lastName"
								value={formData.lastName}
								name="lastName"
								label="Apellido"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									handleChange('lastName', e.target.value)
								}
								error={!!errors?.lastName}
								errorMessage={errors?.lastName}
								required={required.lastName}
							/>
						</div>
						<Input
							id="user-email"
							value={formData.email}
							name="email"
							label="Correo electrónico"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleChange('email', e.target.value)
							}
							error={!!errors?.email}
							errorMessage={errors?.email}
							required={required.email}
						/>

						<RoleCombobox
							value={formData.roleId}
							handleChange={(_name, value) => handleChange('roleId', value)}
							name="roleId"
							required={required.roleId}
						/>
					</FormComponent>
				</ErrorBoundary>
			</DetailsBoxWrapper>
		</Suspense>
	)
}
