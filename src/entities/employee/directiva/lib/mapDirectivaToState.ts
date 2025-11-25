import { DirectivaDto } from '../domain/dto/Directiva.dto'
import { DefaultDirectiva } from '../infra/reducers/directivaFormReducer'

/**
 * Mapea un objeto `DirectivaDto` a la estructura `DefaultDirectiva` para el estado del formulario.
 * @param {DirectivaDto} data - El objeto `DirectivaDto` a mapear.
 * @returns {DefaultDirectiva}
 */
export const mapDirectivaToState = (data: DirectivaDto): DefaultDirectiva => {
	return {
		id: data.id,
		name: data.name,
		cargos: data.cargos.map(cargo => cargo.id),
		updatedAt: data?.updatedAt
	}
}
