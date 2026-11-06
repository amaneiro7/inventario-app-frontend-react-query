export interface EmployeeSignature {
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
export interface EmployeeSignatureDto {
	status: string
	data: EmployeeSignature
}
