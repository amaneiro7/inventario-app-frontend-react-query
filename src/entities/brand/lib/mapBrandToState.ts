import { type BrandDto } from '../domain/dto/Brand.dto'
import { type DefaultBrand } from '../infra/reducers/brandFormReducer'

/**
 * Mapea un objeto `BrandDto` a la estructura `DefaultBrand` para el estado del formulario.
 * @param {BrandDto} data - El objeto `BrandDto` a mapear.
 * @returns {DefaultBrand}
 */
export const mapBrandToState = (data: BrandDto): DefaultBrand => {
	const categories = [...data?.categories.map(category => category.id)]
	return {
		id: data.id,
		name: data.name,
		categories,
		updatedAt: data?.updatedAt
	}
}
