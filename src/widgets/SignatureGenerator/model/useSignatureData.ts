import { useCallback, useEffect, useMemo, useState } from 'react'
import { formatearTelefono } from '@/shared/lib/utils/formatearTelefono'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { type EmployeeDto } from '@/entities/employee/employee/domain/dto/Employee.dto'
import { HierarchyLevel } from '@/entities/employee/unidad/infra/ui/hierarchyLevelTranslations'

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
	hasPhoneNumber: boolean
	hasEmail: boolean
}

export type SignaturePlaceHolders = Omit<SignatureData, 'hasPhoneNumber' | 'hasEmail'>

export type SignatureErrors = Partial<Record<keyof SignatureData, string>>

const REQUIRED_FIELD_MESSAGE = 'Este campo es requerido'

/**
 * Mapea los datos del empleado al formato requerido por la firma.
 */
const mapEmployeeToSignature = (employee?: EmployeeDto): SignatureData => {
	const phoneNumber = [...(employee?.extension ?? []), ...(employee?.phone ?? [])]
	const phoneNumberText = phoneNumber?.map(tel => `+58 ${formatearTelefono(tel)}`).join(' / ')
	const levels = employee?.unidad?.full_chain?.levels ?? []

	return {
		userName: employee?.userName ?? '',
		name: employee?.name ?? '',
		lastName: employee?.lastName ?? '',
		cargo: employee?.cargo?.name ?? '',
		vicepresidenciaEjecutiva: levels[HierarchyLevel.VPE] ?? '',
		vicepresidencia: levels[HierarchyLevel.VP] ?? '',
		siteName: employee?.location?.name ?? '',
		typeOfSite: employee?.location?.typeOfSiteId ?? '',
		email: employee?.email ?? '',
		address: employee?.location?.site?.address ?? '',
		numbers: phoneNumberText ?? '',
		hasPhoneNumber: true,
		hasEmail: true
	}
}

export const useSignatureData = ({ employeeData }: { employeeData: EmployeeDto | undefined }) => {
	const [signatureData, setSignatureData] = useState<SignatureData>(() =>
		mapEmployeeToSignature(employeeData)
	)

	// Sincronizar el estado cuando los datos del empleado se carguen o cambien
	useEffect(() => {
		if (employeeData) {
			setSignatureData(mapEmployeeToSignature(employeeData))
		}
	}, [employeeData])

	const placeHolder: SignaturePlaceHolders = useMemo(
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

	const handleChange = useCallback((field: keyof SignatureData, value: string | boolean) => {
		setSignatureData(prevData => ({ ...prevData, [field]: value }))
	}, [])

	const errors: SignatureErrors = useMemo(() => {
		const newErrors: SignatureErrors = {}

		if (!signatureData.name) newErrors.name = REQUIRED_FIELD_MESSAGE
		if (!signatureData.lastName) newErrors.lastName = REQUIRED_FIELD_MESSAGE
		if (!signatureData.cargo) newErrors.cargo = REQUIRED_FIELD_MESSAGE
		if (!signatureData.vicepresidenciaEjecutiva)
			newErrors.vicepresidenciaEjecutiva = REQUIRED_FIELD_MESSAGE
		if (signatureData.typeOfSite !== TypeOfSiteOptions.AGENCY && !signatureData.vicepresidencia)
			newErrors.vicepresidencia = REQUIRED_FIELD_MESSAGE
		if (!signatureData.numbers && signatureData.hasPhoneNumber)
			newErrors.numbers = REQUIRED_FIELD_MESSAGE
		if (!signatureData.email && signatureData.hasEmail) newErrors.email = REQUIRED_FIELD_MESSAGE
		if (!signatureData.address) newErrors.address = REQUIRED_FIELD_MESSAGE
		// Validacion condicional para el campo 'Agencia'
		if (signatureData.typeOfSite === TypeOfSiteOptions.AGENCY && !signatureData.siteName) {
			newErrors.siteName = REQUIRED_FIELD_MESSAGE
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
