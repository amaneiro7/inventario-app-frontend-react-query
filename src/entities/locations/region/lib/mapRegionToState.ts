import { type RegionDto } from '../domain/dto/region.dto'
import { type DefaultRegion } from '../infra/reducers/regionFormReducer'
/**
 * Mapea un objeto `RegionDto` a la estructura `DefaultRegion` para el estado del formulario.
 * @param {RegionDto} data - El objeto `RegionDto` a mapear.
 * @returns {DefaultRegion}
 */
export const mapRegionToState = (data: RegionDto): DefaultRegion => ({
	id: data.id,
	name: data.name,
	administrativeRegionId: data.administrativeRegionId,
	updatedAt: data?.updatedAt
})
