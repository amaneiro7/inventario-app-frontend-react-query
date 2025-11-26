import { type VicepresidenciaDto } from '../domain/dto/Vicepresidencia.dto'
import { type DefaultVicepresidencia } from '../infra/reducers/vicepresidenciaFormReducer'

/**
 * Maps the fetched VicepresidenciaDto to the DefaultVicepresidencia form state.
 * @param vicepresidencia - The VicepresidenciaDto object fetched from the API.
 */
export const mapVicepresidenciaToState = (data: VicepresidenciaDto): DefaultVicepresidencia => ({
	id: data.id,
	name: data.name,
	vicepresidenciaEjecutivaId: data?.vicepresidenciaEjecutivaId,
	directivaId: data?.vicepresidenciaEjecutiva?.directiva.id,
	cargos: data.cargos?.map(cargo => cargo.id),
	updatedAt: data?.updatedAt
})
