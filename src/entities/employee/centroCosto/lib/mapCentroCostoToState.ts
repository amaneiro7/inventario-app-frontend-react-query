import { type CentroCostoDto } from '../domain/dto/CentroCosto.dto'
import { type DefaultCentroCosto } from '../infra/reducers/centroCostoFormReducer'

export const mapCentroCostoToState = (data: CentroCostoDto): DefaultCentroCosto => ({
	id: data.id,
	name: data.name,
	updatedAt: data.updatedAt
})
