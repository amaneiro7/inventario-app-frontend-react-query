/**
 * @interface GeneralDashboardDto
 * @description Data Transfer Object for general dashboard statistics.
 * Contains aggregated data about various aspects of the inventory.
 */
export interface GeneralDashboardDto {
	/**
	 * Array de objetos que representan el total de equipos por categoría.
	 * @property {string} name - Nombre de la categoría.
	 * @property {number} count - Cantidad de equipos en esa categoría.
	 */ totalByCategory: {
		name: string
		count: number
	}[]
	/**
	 * Cantidad total de computadoras en el inventario.
	 */ totalComputer: number
	/**
	 * Cantidad total de pantallas (monitores) en el inventario.
	 */ totalScreens: number
	/**
	 * Cantidad total de impresoras en el inventario.
	 */ totalPrinters: number
	/**
	 * Cantidad total de impresoras financieras en el inventario.
	 */ totalFinantialPrinters: number
	/**
	 * Cantidad total de usuarios activos.
	 */ totalActiveUsers: number
	/**
	 * Cantidad total de agencias registradas.
	 */ totalAgencies: number
	/**
	 * Cantidad total de sitios administrativos (torres) registrados.
	 */ totalAdministrativeSites: number
}
