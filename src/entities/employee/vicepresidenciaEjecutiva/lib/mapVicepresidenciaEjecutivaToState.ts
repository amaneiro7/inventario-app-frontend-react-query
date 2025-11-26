import { type VicepresidenciaEjecutivaDto } from '../domain/dto/VicepresidenciaEjecutiva.dto'
import { type DefaultVicepresidenciaEjecutiva } from '../infra/reducers/vicepresidenciaEjecutivaFormReducer'

/**
 * Maps the fetched VicepresidenciaEjecutivaDto to the DefaultVicepresidenciaEjecutiva form state.
 * @param vicepresidenciaEjecutiva - The VicepresidenciaEjecutivaDto object fetched from the API.
 */
export const mapVicepresidenciaEjecutivaToState = (
	data: VicepresidenciaEjecutivaDto
): DefaultVicepresidenciaEjecutiva => ({
	id: data.id,
	name: data.name,
	directivaId: data.directivaId,
	cargos: data.cargos?.map(cargo => cargo.id),
	updatedAt: data?.updatedAt
})
