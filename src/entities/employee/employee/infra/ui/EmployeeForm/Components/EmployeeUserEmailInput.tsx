import React, { useMemo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import Typography from '@/shared/ui/Typography'
import { type Action } from '../../../reducers/employeeFormReducer'

interface EmployeeUserEmailInputProps {
	email: string
	allowedDomains: string[]
	isLoading: boolean
	canEdit: boolean
	emailRequired: boolean
	emailDisabled: boolean
	emailError: string
	handleChange: (name: Action['type'], value: any) => void
}

export const EmployeeUserEmailInput = ({
	email,
	isLoading,
	canEdit,
	allowedDomains,
	handleChange,
	emailRequired,
	emailDisabled,
	emailError
}: EmployeeUserEmailInputProps) => {
	const [emailUser, emailDomain] = useMemo(() => {
		if (!email) return ['', '']
		const parts = email?.split('@') ?? []
		return [parts[0] ?? '', parts[1] ?? allowedDomains[0] ?? '']
	}, [email, allowedDomains])

	return (
		<div className="flex flex-row gap-2">
			<div className="flex-1">
				<Input
					id="employee-email"
					value={emailUser}
					name="email"
					isLoading={isLoading}
					readOnly={!canEdit}
					label="Correo electrónico"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						const value = e.target.value
						if (!value) return handleChange('email', '')
						handleChange('email', `${value}@${emailDomain}`)
					}}
					error={!!emailError}
					errorMessage={emailError}
					required={emailRequired}
					disabled={emailDisabled}
				/>
			</div>
			<Typography variant="p" className="mt-2">
				@
			</Typography>
			<div className="w-fit">
				<div className="relative">
					<select
						className="h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
						value={emailDomain}
						disabled={!canEdit || emailDisabled}
						onChange={e => {
							const value = e.target.value
							if (!emailUser && !value) return handleChange('email', '')
							handleChange('email', `${emailUser}@${value}`)
						}}
					>
						<option value="">Seleccione Dominio</option>
						{allowedDomains.map(domain => (
							<option key={domain} value={domain}>
								{domain}
							</option>
						))}
					</select>
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
						<svg
							className="h-4 w-4 fill-current"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
						</svg>
					</div>
				</div>
			</div>
		</div>
	)
}

EmployeeUserEmailInput.displayName = 'EmployeeUserEmailInput'
