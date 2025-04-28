interface Navigation {
	label: string
	navs: Navs[]
}

interface Navs {
	title: string
	path: string
	desc: string
}

export const navigation: Navigation[] = [
	{
		label: 'Listado de Perifericos',
		navs: [
			{
				title: 'Lista de equipos de computación',
				path: '/list/computer',
				desc: 'Ver la lista completa de equipos de computación disponibles.'
			},
			{
				title: 'Lista de Monitores',
				path: '/list/monitor',
				desc: 'Ver la lista de todos los monitores registrados.'
			},
			{
				title: 'Lista de Impresoras',
				path: '/list/printer',
				desc: 'Ver la lista de todas las impresoras disponibles.'
			},
			{
				title: 'Lista de Impresoras Financieras',
				path: '/list/finantialprinter',
				desc: 'Ver la lista específica de impresoras financieras.'
			},
			{
				title: 'Lista de Partes y piezas',
				path: '/list/parts',
				desc: 'Ver el inventario de partes y piezas de repuesto.'
			}
		]
	},
	{
		label: 'Otras listas',
		navs: [
			{
				title: 'Listado de usuarios',
				path: '/list/usuarios?isStillWorking=true',
				desc: 'Ver la lista de todos los usuarios del sistema.'
			},
			{
				title: 'Listado de Sitios',
				path: '/list/location',
				desc: 'Ver la lista de todas las ubicaciones o sitios registrados.'
			},
			{
				title: 'Listado de Modelos',
				path: '/list/model',
				desc: 'Ver la lista de todos los modelos de dispositivos registrados.'
			},
			{
				title: 'Historial de modificaciones',
				path: '/list/history',
				desc: 'Ver el registro de todas las modificaciones realizadas en el sistema.'
			}
		]
	},
	{
		label: 'Dashboards',
		navs: [
			{
				title: 'Dashboard de computador',
				path: '/dashboard/computer',
				desc: 'Ver el panel de control con información relevante sobre los equipos de computación.'
			}
		]
	},
	{
		label: 'Gestión de Dispositivos',
		navs: [
			{
				title: 'Agregar un nuevo dispositivo',
				path: '/form/device/add',
				desc: 'Formulario para registrar un nuevo dispositivo en el sistema.'
			},
			{
				title: 'Agregar un nuevo Modelo',
				path: '/form/model/add',
				desc: 'Formulario para registrar un nuevo modelo de dispositivo.'
			},
			{
				title: 'Agregar un nueva Marca',
				path: '/form/brand/add',
				desc: 'Formulario para registrar una nueva marca de dispositivos.'
			},
			{
				title: 'Agregar un nuevo Procesador',
				path: '/form/processors/add',
				desc: 'Formulario para registrar un nuevo tipo de procesador.'
			}
		]
	},
	{
		label: 'Gestión de Empleados',
		navs: [
			{
				title: 'Agregar un nuevo usuario',
				path: '/form/employee/add',
				desc: 'Formulario para registrar un nuevo empleado o usuario del sistema.'
			},
			{
				title: 'Agregar una nueva directiva',
				path: '/form/directiva/add',
				desc: 'Formulario para registrar una nueva directiva organizacional.'
			},
			{
				title: 'Agregar una nueva V.P.E.',
				path: '/form/vicepresidenciaejecutiva/add',
				desc: 'Formulario para registrar una nueva Vicepresidencia Ejecutiva.'
			},
			{
				title: 'Agregar una nueva V.P.',
				path: '/form/vicepresidencia/add',
				desc: 'Formulario para registrar una nueva Vicepresidencia.'
			},
			{
				title: 'Agregar un nuevo departamento',
				path: '/form/departamento/add',
				desc: 'Formulario para registrar un nuevo departamento dentro de la organización.'
			},
			{
				title: 'Agregar un nuevo cargo',
				path: '/form/cargo/add',
				desc: 'Formulario para registrar un nuevo cargo o puesto de trabajo.'
			}
		]
	},
	{
		label: 'Gestión de Sitios',
		navs: [
			{
				title: 'Agregar una nueva ubicación',
				path: '/form/location/add',
				desc: 'Formulario para registrar una nueva ubicación física.'
			},
			{
				title: 'Agregar una nuevo sitio',
				path: '/form/site/add',
				desc: 'Formulario para registrar un nuevo sitio específico dentro de una ubicación.'
			},
			{
				title: 'Agregar una nueva ciudad',
				path: '/form/city/add',
				desc: 'Formulario para registrar una nueva ciudad.'
			},
			{
				title: 'Asignación de las regiones por zona',
				path: '/form/region/',
				desc: 'Interfaz para gestionar la asignación de regiones a diferentes zonas geográficas.'
			}
		]
	}
]
