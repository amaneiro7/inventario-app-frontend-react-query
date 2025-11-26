import { type LocationDto } from '../domain/dto/Location.dto'
import { type DefaultLocation } from '../infra/reducers/locationFormReducer'

export const mapLocationFromState = (location: LocationDto): DefaultLocation => ({
	id: location.id,
	typeOfSiteId: location.typeOfSiteId,
	regionId: location.site?.city.state?.regionId,
	stateId: location.site?.city?.stateId,
	cityId: location.site?.cityId,
	siteId: location.siteId,
	siteName: location.site?.name,
	name: location.name,
	subnet: location.subnet,
	locationStatusId: location.locationStatusId,
	updatedAt: location?.updatedAt
})
