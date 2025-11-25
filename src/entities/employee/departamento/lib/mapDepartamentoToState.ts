import { type DepartamentoDto } from '../domain/dto/Departamento.dto'
import { type DefaultDepartamento } from '../infra/reducers/departamentoFormReducer'

/**
 * Maps the fetched DepartamentoDto to the DefaultDepartamento form state.
 * @param departamento - The DepartamentoDto object fetched from the API.
 */
export const mapDepartamentoToState = (departamento: DepartamentoDto): DefaultDepartamento => ({
	id: departamento.id,
	name: departamento.name,
	directivaId: departamento.vicepresidencia?.vicepresidenciaEjecutiva?.directiva.id,
	vicepresidenciaEjecutivaId: departamento?.vicepresidencia?.vicepresidenciaEjecutiva?.id,
	vicepresidenciaId: departamento?.vicepresidencia?.id,
	cargos: departamento.cargos.map(cargo => cargo.id),
	updatedAt: departamento.updatedAt
})
