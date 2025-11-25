import { type CityDto } from '../domain/dto/City.dto'
import { type DefaultCity } from '../infra/reducers/cityFormReducer'

/**
 * Mapea un objeto `CityDto` a la estructura `DefaultCIty` para el estado del formulario.
 * @param {CityDto} data - El objeto `CityDto` a mapear.
 * @returns {DefaultCIty}
 */
export const mapCityToState = (data: CityDto): DefaultCity => ({
	id: data.id,
	name: data.name,
	stateId: data.stateId,
	regionId: data.state.regionId,
	administrativeRegionId: data.state.region.administrativeRegionId,
	updatedAt: data?.updatedAt
})
