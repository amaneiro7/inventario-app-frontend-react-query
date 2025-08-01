import { Suspense } from 'react'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { FormComponent } from '@/widgets/FormContainer/FormComponent'
import { Input } from '@/shared/ui/Input/Input'
import { useCreateUser } from '@/entities/user/infra/hooks/useCreateModels'
import { RoleCombobox } from '@/entities/role/infra/ui/RoleComboBox'

export default function RegisterPage() {
	const { formData, key, errors, required, handleChange, handleSubmit } = useCreateUser()

	return (
		<Suspense>
			<DetailsBoxWrapper position="center">
				<Suspense>
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
						<Suspense>
							<RoleCombobox
								value={formData.roleId}
								handleChange={(_name, value) => handleChange('roleId', value)}
								name="roleId"
								required={required.roleId}
							/>
						</Suspense>
					</FormComponent>
				</Suspense>
			</DetailsBoxWrapper>
		</Suspense>
	)
}
