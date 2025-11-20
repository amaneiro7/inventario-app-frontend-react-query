/**
 * @abstract
 * @class DeleteRepository
 * @description Contrato (interfaz abstracta) para un repositorio que permite eliminar una entidad por su ID.
 * @template ID - El tipo del identificador de la entidad.
 * @template T - El tipo de la respuesta esperada tras la eliminación.
 */
export abstract class DeleteRepository<ID, T> {
	/**
	 * @description Elimina una entidad por su identificador.
	 * @param {{ id: ID }} params - Un objeto que contiene el ID de la entidad a eliminar.
	 * @returns {Promise<T>} Una promesa que se resuelve con la respuesta de la operación.
	 */
	abstract deleteById({ id }: { id: ID }): Promise<T>
}
