import { useCallback, useMemo, useState } from 'react'
import { formatearTelefono } from '@/shared/lib/utils/formatearTelefono'
import { type EmployeeDto } from '@/entities/employee/employee/domain/dto/Employee.dto'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'

export interface SignatureData {
	userName: string
	name: string
	lastName: string
	cargo: string
	vicepresidencia: string
	vicepresidenciaEjecutiva: string
	siteName: string
	typeOfSite: string
	numbers: string
	email: string
	address: string
}
export type SignatureErrors = Partial<Record<keyof SignatureData, string>>
export const useSignatureData = ({ employeeData }: { employeeData: EmployeeDto | undefined }) => {
	const [signatureData, setSignatureData] = useState<SignatureData>(() => {
		const phoneNumber = [...(employeeData?.extension ?? []), ...(employeeData?.phone ?? [])]
		const phoneNumberText = phoneNumber?.map(tel => `+58 ${formatearTelefono(tel)}`).join(' / ')
		return {
			userName: employeeData?.userName ?? '',
			name: employeeData?.name ?? '',
			lastName: employeeData?.lastName ?? '',
			cargo: employeeData?.cargo?.name ?? '',
			vicepresidencia: employeeData?.vicepresidencia?.name ?? '',
			vicepresidenciaEjecutiva: employeeData?.vicepresidenciaEjecutiva?.name ?? '',
			siteName: employeeData?.location?.name ?? '',
			typeOfSite: employeeData?.location?.typeOfSiteId ?? '',
			email: employeeData?.email ?? '',
			address: employeeData?.location?.site?.address ?? '',
			numbers: phoneNumberText ?? ''
		}
	})

	const placeHolder: SignatureData = useMemo(
		() => ({
			userName: 'mfernandez',
			name: 'María',
			lastName: 'Fernández',
			cargo: 'Coordinadora de Banco',
			vicepresidencia: 'Vicepresidencia Bancaria',
			vicepresidenciaEjecutiva: 'V.P.E',
			siteName: 'Agencia(000) XXX XX XXXXXX',
			typeOfSite: '',
			numbers: '+58 (212) 000.00.00',
			email: 'mfernandez@bnc.com.ve',
			address: 'Av. Francisco de Miranda, Torre BNC - El Rosal, Urb. Campo Alegre, Caracas.'
		}),
		[]
	)

	const handleChange = useCallback((field: keyof SignatureData, value: string) => {
		setSignatureData(prevData => ({ ...prevData, [field]: value }))
	}, [])

	const errors: SignatureErrors = useMemo(() => {
		const newErrors: SignatureErrors = {}
		const requiredFieldMessage = 'Este campos es requerido'
		if (!signatureData.name) newErrors.name = requiredFieldMessage
		if (!signatureData.lastName) newErrors.lastName = requiredFieldMessage
		if (!signatureData.cargo) newErrors.cargo = requiredFieldMessage
		if (!signatureData.vicepresidenciaEjecutiva)
			newErrors.vicepresidenciaEjecutiva = requiredFieldMessage
		if (!signatureData.vicepresidencia) newErrors.vicepresidencia = requiredFieldMessage
		if (!signatureData.numbers) newErrors.numbers = requiredFieldMessage
		if (!signatureData.email) newErrors.email = requiredFieldMessage
		if (!signatureData.address) newErrors.address = requiredFieldMessage
		// Validacion condicional para el campo 'Agencia'
		if (signatureData.typeOfSite === TypeOfSiteOptions.AGENCY && !signatureData.siteName) {
			newErrors.siteName = requiredFieldMessage
		}
		return newErrors
	}, [signatureData])

	const isFormValid: boolean = Object.keys(errors).length === 0

	return {
		data: signatureData,
		placeHolder,
		handleChange,
		errors,
		isFormValid
	}
}
