import { TypeOFImg } from '@/components/TilesSection/TilesBox'

interface Navigation {
	label: string
	desc: string
	img: TypeOFImg
	navs: Navs[]
}

interface Navs {
	title: string
	desc: string
	path: string
}

export const navigation: Navigation[] = [
	{
		label: 'Listado de Perifericos',
		desc: 'Aqui se encuentran las rutas por categorias, equipos de computación, monitores, impresoras y partes y piezas',
		img: 'inventoryBox',
		navs: [
			{
				title: 'Lista de equipos de computación',
				desc: 'Equipos asignados en agencia',
				path: '/computer'
			},
			{
				title: 'Lista de Monitores',
				desc: 'Lista de Monitores',
				path: '/monitor'
			},
			{
				title: 'Lista de Impresoras',
				desc: 'Lista de Impresoras',
				path: '/printer'
			},
			{
				title: 'Lista de Impresoras Financieras',
				desc: 'Lista de Impresoras Financieras',
				path: '/finantialprinter'
			},
			{
				title: 'Lista de Partes y piezas',
				desc: 'Lista de Partes y piezas',
				path: '/parts'
			}
		]
	},
	{
		label: 'Otras listas',
		desc: 'Listas de Sitios, y modelos',
		img: 'officeMac',
		navs: [
			{
				title: 'Listado de Sitios',
				desc: 'Listado de sitios',
				path: '/location'
			},
			{
				title: 'Listado de Modelos',
				desc: 'Listado de modelos',
				path: '/model'
			}
		]
	},
	{
		label: 'Gestión',
		desc: 'Aqui se encuentran las rutas que se utilizan para la gestion de crear actualizar',
		img: 'codeScreen',
		navs: [
			{
				title: 'Agregar un nuevo dispositivo',
				desc: 'Aqui se puede agregar un nuevo dispositivo',
				path: '/device/add'
			},
			{
				title: 'Agregar un nuevo usuario',
				desc: 'Aqui se puede agregar un nuevo usuario',
				path: '/employee/add'
			},
			{
				title: 'Agregar un nuevo Modelo',
				desc: 'Aqui se puede agregar un nuevo modelo',
				path: '/model/add'
			},
			{
				title: 'Agregar un nueva Marca',
				desc: 'Aqui se puede agregar un nueva marca',
				path: '/brand/add'
			},
			{
				title: 'Agregar un nuevo Procesador',
				desc: 'Aqui se puede agregar un nuevo procesador',
				path: '/processors/add'
			},
			{
				title: 'Agregar una nueva ubicación',
				desc: 'Aqui se puede agregar una nueva ubicación',
				path: '/location/add'
			},
			{
				title: 'Agregar una nuevo sitio',
				desc: 'Aqui se puede agregar un nuevo sitio',
				path: '/site/add'
			},
			{
				title: 'Agregar una nueva ciudad',
				desc: 'Aqui se puede agregar una nueva ciudad',
				path: '/city/add'
			},
			{
				title: 'Agregar una nueva directiva',
				desc: 'Aqui se puede agregar una nueva directiva',
				path: '/directiva/add'
			},
			{
				title: 'Agregar una nueva vicepresidencia ejecutivas',
				desc: 'Aqui se puede agregar una nueva vicepresidencia ejecutivas',
				path: '/vicepresidenciaejecutivas/add'
			},
			{
				title: 'Agregar un nuevo centro de costo',
				desc: 'Aqui se puede agregar un nuevo centro de costo',
				path: '/centrocosto/add'
			},
			{
				title: 'Agregar un nuevo centro de trabajo',
				desc: 'Aqui se puede agregar un nuevo centro de trabajo',
				path: '/centrotrabajo/add'
			},
			{
				title: 'Agregar un nuevo departamento',
				desc: 'Aqui se puede agregar un nuevo departamento',
				path: '/departamento/add'
			}
		]
	}
]
