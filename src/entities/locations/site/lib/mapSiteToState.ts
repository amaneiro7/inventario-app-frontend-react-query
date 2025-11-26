import { type SiteDto } from '../domain/dto/Site.dto'
import { type DefaultSite } from '../infra/reducers/siteFormReducer'

export const mapSiteToState = (data: SiteDto): DefaultSite => ({
	id: data.id,
	name: data.name,
	address: data.address,
	cityId: data.cityId,
	stateId: data.city?.stateId,
	regionId: data.city?.state?.regionId,
	updatedAt: data?.updatedAt
})
