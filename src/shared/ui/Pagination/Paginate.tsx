import ReactPaginate, { type ReactPaginateProps } from 'react-paginate'

// Usamos 'any' para manejar la interoperabilidad CJS/ESM sin errores de TS
// eslint_disable-next-line @typescript-eslint/no-explicit-any
export const PaginateComponent: React.ComponentClass<ReactPaginateProps, any> =
	(ReactPaginate as any).default || ReactPaginate
