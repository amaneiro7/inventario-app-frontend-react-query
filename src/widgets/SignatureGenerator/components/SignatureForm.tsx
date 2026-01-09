import { memo } from 'react'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { AlertCircle } from 'lucide-react'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import Typography from '@/shared/ui/Typography'
import { Input } from '@/shared/ui/Input/Input'
import { Switch } from '@/shared/ui/Switch'
import {
	type SignaturePlaceHolders,
	type SignatureData,
	type SignatureErrors
} from '../model/useSignatureData'

interface SignatureFormProps {
	data: SignatureData
	errors: SignatureErrors
	placeHolder: SignaturePlaceHolders
	isFormValid: boolean
	onChange: (field: keyof SignatureData, value: string | boolean) => void
}

export const SignatureForm = memo(
	({ data, isFormValid, placeHolder, errors, onChange }: SignatureFormProps) => {
		return (
			<DetailsBoxWrapper>
				<Typography color="azul" variant="h3">
					Datos de la Firma
				</Typography>
				<div className="space-y-4">
					{/* Información personal */}
					<Typography color="azul" variant="h5">
						Información personal
					</Typography>
					<div className="m-0 grid grid-cols-2 gap-x-2">
						<Input
							id="signature-name"
							label="Nombre"
							name="name"
							required
							transform
							value={data.name}
							placeholder={placeHolder.name}
							onChange={e => onChange('name', e.target.value)}
							error={!!errors.name}
							errorMessage={errors.name}
						/>

						<Input
							id="signature-lastName"
							label="Apellido"
							name="lastName"
							required
							transform
							value={data.lastName}
							placeholder={placeHolder.lastName}
							onChange={e => onChange('lastName', e.target.value)}
							error={!!errors.lastName}
							errorMessage={errors.lastName}
						/>
					</div>
					<Input
						id="signature-cargo"
						label="Cargo"
						name="cargo"
						required
						transform
						value={data.cargo}
						placeholder={placeHolder.cargo}
						onChange={e => onChange('cargo', e.target.value)}
						error={!!errors.cargo}
						errorMessage={errors.cargo}
					/>

					<Input
						id="signature-vicepresidencia-ejecutiva"
						label="Vicepresidencia Ejecutiva"
						name="vicepresidenciaEjecutiva"
						required
						transform
						value={data.vicepresidenciaEjecutiva}
						placeholder={placeHolder.vicepresidenciaEjecutiva}
						onChange={e => onChange('vicepresidenciaEjecutiva', e.target.value)}
						error={!!errors.vicepresidenciaEjecutiva}
						errorMessage={errors.vicepresidenciaEjecutiva}
					/>
					<Input
						id="signature-vicepresidencia"
						label="Vicepresidencia"
						name="vicepresidencia"
						required
						transform
						value={data.vicepresidencia}
						placeholder={placeHolder.vicepresidencia}
						onChange={e => onChange('vicepresidencia', e.target.value)}
						error={!!errors.vicepresidencia}
						errorMessage={errors.vicepresidencia}
					/>

					{data.typeOfSite === TypeOfSiteOptions.AGENCY && (
						<Input
							id="signature-siteName"
							label="Agencia"
							name="siteName"
							transform
							required
							value={data.siteName}
							placeholder={placeHolder.siteName}
							onChange={e => onChange('siteName', e.target.value)}
							error={!!errors.siteName}
							errorMessage={errors.siteName}
						/>
					)}
				</div>
				<div className="space-y-4">
					{/* Información personal */}
					<Typography color="azul" variant="h5">
						Información de contacto
					</Typography>
					<>
						<Input
							id="signature-numbers"
							label="Teléfono"
							name="numbers"
							required
							transform
							value={data.numbers}
							placeholder={placeHolder.numbers}
							onChange={e => onChange('numbers', e.target.value)}
							error={!!errors.numbers}
							errorMessage={errors.numbers}
						/>
						<Switch
							checked={data.isHasPhoneNumber}
							className="data-[state=checked]:bg-naranja"
							onCheckedChange={checked => onChange('isHasPhoneNumber', checked)}
						/>
					</>
					<Input
						id="signature-email"
						label="Correo electrónico"
						name="email"
						required
						transform
						value={data.email}
						placeholder={placeHolder.email}
						onChange={e => onChange('email', e.target.value)}
						error={!!errors.email}
						errorMessage={errors.email}
					/>
					<Input
						id="signature-address"
						label="Dirección"
						name="address"
						required
						transform
						value={data.address}
						placeholder={placeHolder.address}
						onChange={e => onChange('address', e.target.value)}
						error={!!errors.address}
						errorMessage={errors.address}
					/>
				</div>
				{/* Contenedor para el mensaje de error con altura fija para evitar layout shift */}
				<div className="flex min-h-1.5 justify-center" role="alert" aria-live="polite">
					{!isFormValid && (
						<div className="flex items-center gap-2">
							<AlertCircle className="text-rojo h-5 w-5" />
							<Typography variant="p" option="small" color="rojo">
								Completa todos los campos obligatorios (*)
							</Typography>
						</div>
					)}
				</div>
			</DetailsBoxWrapper>
		)
	}
)

SignatureForm.displayName = 'SignatureForm'
