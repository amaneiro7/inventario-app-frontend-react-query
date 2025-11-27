import { type CentroTrabajoDto } from '../domain/dto/CentroTrabajo.dto'
import { type DefaultCentroTrabajo } from '../infra/reducers/centroTrabajoFormReducer'

export const mapCentroTrabajoToState = (data: CentroTrabajoDto): DefaultCentroTrabajo => ({
	id: data.id,
	name: data.name,
	centroCostoId: data.centroCostoId,
	updatedAt: data.updatedAt
})
