import { useState } from 'react'
import { EmployeeGetSignatureInfo } from '@/entities/employee/employee/application/EmployeeGetSignatureInfo'
import { EmployeeGetSignatureInfoService } from '@/entities/employee/employee/infra/service/employeeGetSignatureInfo.service'
import type { EmployeeSignature } from '@/entities/employee/employee/domain/dto/EmployeeSignature.dto'

const repository = new EmployeeGetSignatureInfoService()
const getSignature = new EmployeeGetSignatureInfo(repository)

export const useSignatureEmployeeSearch = () => {
	const [value, setValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)
	const [data, setData] = useState<EmployeeSignature>()

	const handleSearch = async () => {
		if (!value.trim()) return // Opcional: evita buscar si el input está vacío

		setIsLoading(true)
		setSubmitError(null)

		try {
			const { data } = await getSignature.execute({ identifier: value })
			setData(data)
		} catch (error) {
			const message =
				error instanceof Error ? error.message : 'Ha ocurrido un error inesperado.'
			setSubmitError(message)
		} finally {
			setIsLoading(false)
		}
	}

	const handleChange = (value: string) => {
		setValue(value.trim())
	}

	return {
		value,
		handleChange,
		isLoading,
		submitError,
		data,
		handleSearch
	}
}
