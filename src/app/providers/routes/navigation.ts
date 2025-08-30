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
		label: 'Listado de Periféricos', // Coherencia en el plural
		navs: [
			{
				title: 'Lista de Equipos de Computación',
				path: '/list/computer',
				desc: 'Visualiza el inventario completo de equipos de computación y sus detalles.'
			},
			{
				title: 'Lista de Monitores',
				path: '/list/monitor',
				desc: 'Explora el inventario de todos los monitores registrados en el sistema.'
			},
			{
				title: 'Lista de Impresoras',
				path: '/list/printer',
				desc: 'Accede al listado de todas las impresoras disponibles y su información.'
			},
			{
				title: 'Lista de Impresoras Financieras',
				path: '/list/finantialprinter',
				desc: 'Consulta la lista específica de impresoras financieras utilizadas en la organización.'
			},
			{
				title: 'Lista de Partes y Piezas', // Coherencia en el plural
				path: '/list/parts',
				desc: 'Gestiona y consulta el inventario detallado de partes y piezas de repuesto.'
			}
		]
	},
	{
		label: 'Otras Listas', // Coherencia en el plural
		navs: [
			{
				title: 'Listado de Usuarios',
				path: '/list/usuarios?isStillWorking=true',
				desc: 'Visualiza la lista completa de usuarios activos del sistema y su información relevante.'
			},
			{
				title: 'Listado de Sitios',
				path: '/list/location',
				desc: 'Explora la lista de todas las ubicaciones físicas o sucursales registradas.'
			},
			{
				title: 'Listado de Modelos',
				path: '/list/model',
				desc: 'Consulta todos los modelos de dispositivos disponibles, organizados por tipo y marca.'
			},
			{
				title: 'Historial de Modificaciones',
				path: '/list/history',
				desc: 'Revisa un registro detallado de todos los cambios y eventos ocurridos en el sistema.'
			}
		]
	},
	{
		label: 'Dashboards',
		navs: [
			{
				title: 'Dashboard de Equipos',
				path: '/dashboard/computer',
				desc: 'Accede a un panel de control interactivo con métricas clave y gráficos sobre los equipos de computación.'
			}
		]
	},
	{
		label: 'Monitoreo de Conectividad',
		navs: [
			{
				title: 'Monitoreo de Ubicaciones',
				path: '/monitoring/location',
				desc: 'Visualiza el estado en tiempo real de la conectividad de red en todas las ubicaciones registradas.'
			},
			{
				title: 'Monitoreo de Dispositivos',
				path: '/monitoring/device',
				desc: 'Visualiza el estado en tiempo real de todos los dispositivos, incluyendo su conectividad y disponibilidad.'
			},
			{
				title: 'Mapa de Conectividad de Agencias',
				path: '/monitoring/agencymap',
				desc: 'Visualiza el estado de los enlaces y la conectividad de las agencias a nivel nacional.'
			},
			{
				title: 'Mapa de Conectividad de Torres',
				path: '/monitoring/administrativesitemap',
				desc: 'Visualiza el estado de los equipos de red activos en las torres administrativas a nivel nacional.'
			}
		]
	},
	{
		label: 'Gestión de Dispositivos',
		navs: [
			{
				title: 'Agregar Nuevo Dispositivo',
				path: '/form/device/add',
				desc: 'Registra un nuevo dispositivo en el inventario, especificando sus características y ubicación.'
			},
			{
				title: 'Agregar Nuevo Modelo',
				path: '/form/model/add',
				desc: 'Crea un nuevo registro de modelo de dispositivo para categorizar el hardware.'
			},
			{
				title: 'Agregar Nueva Marca',
				path: '/form/brand/add',
				desc: 'Introduce una nueva marca de dispositivos al catálogo del sistema.'
			},
			{
				title: 'Agregar Nuevo Procesador',
				path: '/form/processors/add',
				desc: 'Define y registra nuevos tipos de procesadores utilizados en los equipos.'
			},
			{
				title: 'Agregar Nueva relación de envio',
				path: '/form/shipment/add',
				desc: ''
			}
		]
	},
	{
		label: 'Gestión de Empleados',
		navs: [
			{
				title: 'Agregar Nuevo Usuario',
				path: '/form/employee/add',
				desc: 'Registra a un nuevo empleado o usuario del sistema, asignando roles y datos personales.'
			},
			{
				title: 'Agregar Nueva Directiva',
				path: '/form/directiva/add',
				desc: 'Define y registra nuevas directivas organizacionales o equipos de gestión.'
			},
			{
				title: 'Agregar Nueva V.P. Ejecutiva', // Más claro como título
				path: '/form/vicepresidenciaejecutiva/add',
				desc: 'Crea un nuevo registro para una Vicepresidencia Ejecutiva dentro de la estructura de la empresa.'
			},
			{
				title: 'Agregar Nueva V.P.', // Más claro como título
				path: '/form/vicepresidencia/add',
				desc: 'Registra una nueva Vicepresidencia en la jerarquía organizacional.'
			},
			{
				title: 'Agregar Nuevo Departamento',
				path: '/form/departamento/add',
				desc: 'Añade un nuevo departamento a la estructura de la organización.'
			},
			{
				title: 'Agregar Nuevo Cargo',
				path: '/form/cargo/add',
				desc: 'Define un nuevo cargo o puesto de trabajo dentro de la empresa.'
			}
		]
	},
	{
		label: 'Gestión de Sitios',
		navs: [
			{
				title: 'Agregar Nueva Ubicación',
				path: '/form/location/add',
				desc: 'Registra una nueva dirección o sede física de la organización.'
			},
			{
				title: 'Agregar Nuevo Sitio', // Distinción clara de Ubicación
				path: '/form/site/add',
				desc: 'Crea un nuevo sitio específico (ej. un piso, un área) dentro de una ubicación registrada.'
			},
			{
				title: 'Agregar Nueva Ciudad',
				path: '/form/city/add',
				desc: 'Añade una nueva ciudad al catálogo para usar en la gestión de ubicaciones.'
			},
			{
				title: 'Asignación de Regiones por Zona',
				path: '/form/region/',
				desc: 'Configura y gestiona cómo las regiones geográficas se asignan a zonas operativas.'
			}
		]
	}
]
