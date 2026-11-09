import { useCallback, useMemo, useState } from 'react'
import { formatearTelefono } from '@/shared/lib/utils/formatearTelefono'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { type EmployeeDto } from '@/entities/employee/employee/domain/dto/Employee.dto'
import { type EmployeeSignature } from '@/entities/employee/employee/domain/dto/EmployeeSignature.dto'
import { HierarchyLevel } from '@/entities/employee/unidad/infra/ui/hierarchyLevelTranslations'

// ─── Tipos públicos del hook ──────────────────────────────────────────────────

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
	isNameBold: boolean
	hasPhoneNumber: boolean
	hasEmail: boolean
}

export type SignaturePlaceHolders = Omit<
	SignatureData,
	'hasPhoneNumber' | 'hasEmail' | 'isNameBold'
>

export type SignatureErrors = Partial<Record<keyof SignatureData, string>>

// ─── Constantes estáticas ─────────────────────────────────────────────────────

const REQUIRED_FIELD_MESSAGE = 'Este campo es requerido'

/**
 * Placeholders de ejemplo para el formulario de firma.
 * Se define fuera del hook porque es una constante estática
 * que nunca cambia entre renders: no tiene sentido memoizarla.
 */
export const SIGNATURE_PLACEHOLDERS: SignaturePlaceHolders = {
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
}

/** Estado vacío para cuando no hay datos de entrada todavía. */
const EMPTY_SIGNATURE: SignatureData = {
	userName: '',
	name: '',
	lastName: '',
	cargo: '',
	vicepresidencia: '',
	vicepresidenciaEjecutiva: '',
	siteName: '',
	typeOfSite: '',
	numbers: '',
	email: '',
	address: '',
	isNameBold: false,
	hasPhoneNumber: true,
	hasEmail: true
}

// ─── Mappers puros (sin efectos secundarios) ─────────────────────────────────

/**
 * **Modo editor** (`FormEmployee`): transforma el `EmployeeDto` completo
 * —con relaciones anidadas (jerarquía, teléfonos, ubicación)— al formato
 * plano `SignatureData` que usa el formulario de firma.
 */
export const mapEmployeeDtoToSignature = (employee?: EmployeeDto): SignatureData => {
	if (!employee) return EMPTY_SIGNATURE

	const phoneNumbers = [...(employee.extension ?? []), ...(employee.phone ?? [])]
	const numbersText = phoneNumbers.map(tel => `+58 ${formatearTelefono(tel)}`).join(' / ')
	const levels = employee.unidad?.full_chain?.levels ?? []

	return {
		userName: employee.userName ?? '',
		name: employee.name ?? '',
		lastName: employee.lastName ?? '',
		cargo: employee.cargo?.name ?? '',
		vicepresidenciaEjecutiva: levels[HierarchyLevel.VPE] ?? '',
		vicepresidencia: levels[HierarchyLevel.VP] ?? '',
		siteName: employee.location?.name ?? '',
		typeOfSite: employee.location?.typeOfSiteId ?? '',
		email: employee.email ?? '',
		address: employee.location?.site?.address ?? '',
		numbers: numbersText,
		isNameBold: true,
		hasPhoneNumber: true,
		hasEmail: true
	}
}

/**
 * **Modo público** (`EmployeeSignature`): los datos ya vienen mapeados
 * desde el endpoint público `/public/employees/signature/:identifier`.
 * Solo se añaden los flags de control (`hasPhoneNumber`, `hasEmail`).
 */
export const mapSignatureDtoToSignature = (dto?: EmployeeSignature): SignatureData => {
	if (!dto) return EMPTY_SIGNATURE
	return {
		...dto,
		isNameBold: false,
		hasPhoneNumber: Boolean(dto.numbers),
		hasEmail: Boolean(dto.email)
	}
}

// ─── Discriminated union para los props del hook ──────────────────────────────

type WithEmployeeDto = {
	/** Modo editor: datos crudos del EmployeeDto completo (ruta protegida). */
	employeeData: EmployeeDto | undefined
	signatureData?: never
}

type WithSignatureDto = {
	/** Modo público: datos ya mapeados desde el endpoint público. */
	signatureData: EmployeeSignature | undefined
	employeeData?: never
}

export type UseSignatureDataInput = WithEmployeeDto | WithSignatureDto

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * `useSignatureData`
 *
 * Gestiona el estado editable del formulario de firma corporativa.
 * Soporta dos modos de inicialización, **mutuamente excluyentes**:
 *
 * - **Modo editor** (`employeeData`): Recibe un `EmployeeDto` completo.
 *   Aplica `mapEmployeeDtoToSignature` para extraer y transformar datos
 *   anidados (jerarquía, teléfonos, ubicación).
 *   → Usado en `FormEmployee` (ruta protegida).
 *
 * - **Modo público** (`signatureData`): Recibe un `EmployeeSignature`
 *   ya mapeado desde el endpoint público. No requiere transformación.
 *   → Usado en `EmployeeSignature` (ruta pública).
 *
 * @example Modo editor
 * ```tsx
 * const { data, handleChange } = useSignatureData({ employeeData })
 * ```
 *
 * @example Modo público
 * ```tsx
 * const { data, handleChange } = useSignatureData({ signatureData })
 * ```
 */
export const useSignatureData = (input: UseSignatureDataInput) => {
	/**
	 * Deriva los datos mapeados desde la fuente externa.
	 * Al ser una función pura que solo depende de los props, `useMemo`
	 * garantiza que el mapeo costoso solo se ejecuta cuando la fuente cambia.
	 */
	const mappedData = useMemo<SignatureData>(() => {
		if ('signatureData' in input && input.signatureData !== undefined) {
			return mapSignatureDtoToSignature(input.signatureData)
		}
		return mapEmployeeDtoToSignature(input.employeeData)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [input.employeeData, input.signatureData])

	/**
	 * El estado local permite al usuario editar los campos manualmente.
	 * Se inicializa con los datos mapeados y se sincroniza si la fuente
	 * externa cambia (p.ej.: React Query resuelve el EmployeeDto tras el montaje).
	 *
	 * Usamos el patrón "derived state with bailout" en lugar de useEffect
	 * para evitar el render extra (setear en render es seguro en React cuando
	 * está condicionado a un cambio de referencia del estado previo).
	 */
	const [signatureData, setSignatureData] = useState<SignatureData>(mappedData)
	const [prevMappedData, setPrevMappedData] = useState<SignatureData>(mappedData)

	if (prevMappedData !== mappedData) {
		setPrevMappedData(mappedData)
		setSignatureData(mappedData)
	}

	const handleChange = useCallback((field: keyof SignatureData, value: string | boolean) => {
		setSignatureData(prev => ({ ...prev, [field]: value }))
	}, [])

	const errors: SignatureErrors = useMemo(() => {
		const e: SignatureErrors = {}
		const isAgency = signatureData.typeOfSite === TypeOfSiteOptions.AGENCY

		if (!signatureData.name) e.name = REQUIRED_FIELD_MESSAGE
		if (!signatureData.lastName) e.lastName = REQUIRED_FIELD_MESSAGE
		if (!signatureData.cargo) e.cargo = REQUIRED_FIELD_MESSAGE
		if (!signatureData.vicepresidenciaEjecutiva)
			e.vicepresidenciaEjecutiva = REQUIRED_FIELD_MESSAGE
		if (!isAgency && !signatureData.vicepresidencia) e.vicepresidencia = REQUIRED_FIELD_MESSAGE
		if (isAgency && !signatureData.siteName) e.siteName = REQUIRED_FIELD_MESSAGE
		if (!signatureData.numbers && signatureData.hasPhoneNumber)
			e.numbers = REQUIRED_FIELD_MESSAGE
		if (!signatureData.email && signatureData.hasEmail) e.email = REQUIRED_FIELD_MESSAGE
		if (!signatureData.address) e.address = REQUIRED_FIELD_MESSAGE

		return e
	}, [signatureData])

	const isFormValid = useMemo(() => Object.keys(errors).length === 0, [errors])

	return {
		data: signatureData,
		placeHolder: SIGNATURE_PLACEHOLDERS,
		handleChange,
		errors,
		isFormValid
	}
}
