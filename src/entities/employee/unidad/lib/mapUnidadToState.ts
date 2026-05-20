import type { UnidadDto } from '../domain/dto/Unidad.dto'
import type { DefaultUnidad } from '../infra/reducers/unidadFormReducer'

/**
 * Mapea un objeto `UnidadDto` a la estructura `DefaultUnidad` para el estado del formulario.
 * @param {UnidadDto} data - El objeto `UnidadDto` a mapear.
 * @returns {DefaultUnidad}
 */
export const mapUnidadToState = (data: UnidadDto): DefaultUnidad => {
	return {
		id: data.id,
		name: data.name,
		centroDeCosto: data.centroDeCosto,
		codigoInterno: data.codigoInterno,
		isUnitActive: data.isUnitActive,
		level: data.level,
		parentId: data.parentId,
		cargos: data.cargos.map(cargo => cargo.id),
		full_chain: data.full_chain,
		isInitialCodigoInternoEmpty: !data.codigoInterno,
		updatedAt: data?.updatedAt
	}
}
