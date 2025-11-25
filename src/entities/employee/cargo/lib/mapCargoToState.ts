import { type CargoDto } from '../domain/dto/Cargo.dto'
import { type DefaultCargo } from '../infra/reducers/cargoFormReducer'

/**
 * Maps the fetched CargoDto to the DefaultCargo form state.
 * @param cargo - The CargoDto object fetched from the API.
 */
export const mapCargoToState = (cargo: CargoDto): DefaultCargo => ({
	id: cargo.id,
	name: cargo.name,
	departamentos: cargo?.departamentos?.map(departamento => departamento.id) ?? [],
	updatedAt: cargo.updatedAt
})
