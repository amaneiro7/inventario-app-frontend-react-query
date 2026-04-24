import { type ISPLinkDto } from '../domain/dto/ISPLink.dto'
import { type DefaultISPLink } from '../infra/reducers/ispLinkFormReducer'

/**
 * Mapea un objeto `ISPLinkDto` a la estructura `DefaultISPLink` para el estado del formulario.
 * @param {ISPLinkDto} data - El objeto `ISPLinkDto` a mapear.
 * @returns {DefaultISPLink}
 */
export const mapISPLinkToState = (data: ISPLinkDto): DefaultISPLink => ({
	id: data.id,
	name: data.name,
	updatedAt: data?.updatedAt
})
