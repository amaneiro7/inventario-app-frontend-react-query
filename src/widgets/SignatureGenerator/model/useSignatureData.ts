import { useCallback, useMemo, useState } from 'react'
import { formatearTelefono } from '@/shared/lib/utils/formatearTelefono'
import { type EmployeeDto } from '@/entities/employee/employee/domain/dto/Employee.dto'

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

export const useSignatureData = ({ employeeData }: { employeeData: EmployeeDto | undefined }) => {
	const [signatureData, setSignatureData] = useState<SignatureData>(() => {
		// Use optional chaining to safely access 'extension' and 'phone'
		// If they are undefined, default to an empty array using '?? []'
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
			address: employeeData?.location?.site.address ?? '',
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

	const isFormValid: boolean = useMemo(
		() =>
			!!signatureData.name &&
			!!signatureData.cargo &&
			!!signatureData.vicepresidencia &&
			!!signatureData.numbers &&
			!!signatureData.email &&
			!!signatureData.address,
		[signatureData]
	)

	return {
		data: signatureData,
		placeHolder,
		handleChange,
		isFormValid
	}
}
