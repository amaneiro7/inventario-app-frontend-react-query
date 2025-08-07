import { useRef } from 'react'
import { DownloadButtonUI } from './components/DownloadButtonUI'
import { SignaturePreview } from './components/SignaturePreview'
import { SignatureForm } from './components/SignatureForm'
import { useSignatureData } from './model/useSignatureData'
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

export const SignatureGenerator = ({ employeeData }: { employeeData: EmployeeDto | undefined }) => {
	const ref = useRef<HTMLDivElement>(null)
	const { data, handleChange, isFormValid, placeHolder } = useSignatureData({ employeeData })
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<SignatureForm
				isFormValid={isFormValid}
				data={data}
				placeHolder={placeHolder}
				onChange={handleChange}
			/>
			<div className="grid grid-rows-2 space-y-6">
				<SignaturePreview ref={ref} data={data} placeHolder={placeHolder} />

				{/* Botón de descarga */}
				<DownloadButtonUI isFormValid={isFormValid} userName={data?.userName} ref={ref} />
			</div>
		</div>
	)
}
