import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedByPermissionRoute } from './ProtectedByPermissionRoute'
import { suspended } from './suspendedComponent'
import { PERMISSIONS } from '@/shared/config/permissions'

const Form = lazy(() => import('@/pages/Form'))
const FormBrand = lazy(() => import('@/pages/FormBrand'))
const FormClearCache = lazy(() => import('@/pages/FormClearCache'))
const FormPermission = lazy(() => import('@/pages/FormPermission'))
const FormPermissionGroup = lazy(() => import('@/pages/FormPermissionGroup'))
const FormAccessPolicy = lazy(() => import('@/pages/FormAccessPolicy'))
const FormShipment = lazy(() => import('@/pages/FormShipment'))
const FormEmployee = lazy(() => import('@/pages/FormEmployee'))
const FormModel = lazy(() => import('@/pages/FormModel'))
const FormRegion = lazy(() => import('@/pages/FormRegion'))
const FormCity = lazy(() => import('@/pages/FormCity'))
const FormISPLink = lazy(() => import('@/pages/FormISPLink'))
const FormSite = lazy(() => import('@/pages/FormSite'))
const FormDepartamento = lazy(() => import('@/pages/FormDepartamento'))
const FormCargo = lazy(() => import('@/pages/FormCargo'))
const FormDirectiva = lazy(() => import('@/pages/FormDirectiva'))
const FormVicepresidenciaEjecutivas = lazy(() => import('@/pages/FormVicepresidenciaEjecutiva'))
const FormVicepresidencia = lazy(() => import('@/pages/FormVicepresidencia'))
const FormLocation = lazy(() => import('@/pages/FormLocation'))
const FormProcessor = lazy(() => import('@/pages/FormProcessor'))
const FormDevice = lazy(() => import('@/pages/FormDevice'))
const FormWrapper = lazy(() => import('@/app/layouts/FormWrapper'))

export default function FormRoutes() {
	return (
		<Routes>
			<Route element={suspended(FormWrapper)}>
				<Route index element={suspended(Form)} />
				{/* Ruta para actualizacion de envios */}
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.SHIPMENTS.CREATE} />
					}
				>
					<Route path="shipment/add" element={suspended(FormShipment)} />
				</Route>
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.SHIPMENTS.READ} />}
				>
					<Route path="shipment/edit/:id" element={suspended(FormShipment)} />
				</Route>
				{/* Ruta para actualizacion de dispositivos */}
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.DEVICES.CREATE} />}
				>
					<Route path="device/add" element={suspended(FormDevice)} />
				</Route>
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.DEVICES.READ} />}
				>
					<Route path="device/edit/:id" element={suspended(FormDevice)} />
				</Route>
				{/* Ruta para actualizacion de empleados */}
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.EMPLOYEES.CREATE} />
					}
				>
					<Route path="employee/add" element={suspended(FormEmployee)} />
				</Route>
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.EMPLOYEES.READ} />}
				>
					<Route path="employee/edit/:id" element={suspended(FormEmployee)} />
				</Route>
				{/* Ruta para actualizacion de Marca */}
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.BRANDS.CREATE} />}
				>
					<Route path="brand/add" element={suspended(FormBrand)} />
				</Route>
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.BRANDS.READ} />}
				>
					<Route path="brand/edit/:id" element={suspended(FormBrand)} />
				</Route>
				{/* Rutas para Access Control */}
				<Route
					element={
						<ProtectedByPermissionRoute
							permission={PERMISSIONS.ACCESS_POLICIES.CREATE}
						/>
					}
				>
					<Route path="access-policy/add" element={suspended(FormAccessPolicy)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.ACCESS_POLICIES.READ} />
					}
				>
					<Route path="access-policy/edit/:id" element={suspended(FormAccessPolicy)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.PERMISSIONS.CREATE} />
					}
				>
					<Route path="permission/add" element={suspended(FormPermission)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.PERMISSIONS.READ} />
					}
				>
					<Route path="permission/edit/:id" element={suspended(FormPermission)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute
							permission={PERMISSIONS.PERMISSION_GROUPS.CREATE}
						/>
					}
				>
					<Route path="permission-groups/add" element={suspended(FormPermissionGroup)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute
							permission={PERMISSIONS.PERMISSION_GROUPS.READ}
						/>
					}
				>
					<Route
						path="permission-groups/edit/:id"
						element={suspended(FormPermissionGroup)}
					/>
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.DIRECTIVAS.CREATE} />
					}
				>
					<Route path="directiva/add" element={suspended(FormDirectiva)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.DIRECTIVAS.READ} />
					}
				>
					<Route path="directiva/edit/:id" element={suspended(FormDirectiva)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute
							permission={PERMISSIONS.VICEPRESIDENCIA_EJECUTIVAS.CREATE}
						/>
					}
				>
					<Route
						path="vicepresidenciaEjecutiva/add"
						element={suspended(FormVicepresidenciaEjecutivas)}
					/>
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute
							permission={PERMISSIONS.VICEPRESIDENCIA_EJECUTIVAS.READ}
						/>
					}
				>
					<Route
						path="vicepresidenciaEjecutiva/edit/:id"
						element={suspended(FormVicepresidenciaEjecutivas)}
					/>
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute
							permission={PERMISSIONS.VICEPRESIDENCIAS.CREATE}
						/>
					}
				>
					<Route path="vicepresidencia/add" element={suspended(FormVicepresidencia)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute
							permission={PERMISSIONS.VICEPRESIDENCIAS.READ}
						/>
					}
				>
					<Route
						path="vicepresidencia/edit/:id"
						element={suspended(FormVicepresidencia)}
					/>
				</Route>
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.MODELS.CREATE} />}
				>
					<Route path="model/add" element={suspended(FormModel)} />
				</Route>
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.MODELS.READ} />}
				>
					<Route path="model/edit/:id" element={suspended(FormModel)} />
				</Route>
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.REGIONS.READ} />}
				>
					<Route path="region" element={suspended(FormRegion)} />
					<Route path="region/edit/:id" element={suspended(FormRegion)} />
				</Route>
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.SITES.CREATE} />}
				>
					<Route path="site/add" element={suspended(FormSite)} />
				</Route>
				<Route element={<ProtectedByPermissionRoute permission={PERMISSIONS.SITES.READ} />}>
					<Route path="site/edit/:id" element={suspended(FormSite)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.LOCATIONS.CREATE} />
					}
				>
					<Route path="location/add" element={suspended(FormLocation)} />
				</Route>
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.LOCATIONS.READ} />}
				>
					<Route path="location/edit/:id" element={suspended(FormLocation)} />
				</Route>
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.CITIES.CREATE} />}
				>
					<Route path="city/add" element={suspended(FormCity)} />
				</Route>
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.CITIES.READ} />}
				>
					<Route path="city/edit/:id" element={suspended(FormCity)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.ISP_LINKS.CREATE} />
					}
				>
					<Route path="isplink/add" element={suspended(FormISPLink)} />
				</Route>
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.ISP_LINKS.READ} />}
				>
					<Route path="isplink/edit/:id" element={suspended(FormISPLink)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.DEPARTAMENTOS.CREATE} />
					}
				>
					<Route path="departamento/add" element={suspended(FormDepartamento)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.DEPARTAMENTOS.READ} />
					}
				>
					<Route path="departamento/edit/:id" element={suspended(FormDepartamento)} />
				</Route>
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.CARGOS.CREATE} />}
				>
					<Route path="cargo/add" element={suspended(FormCargo)} />
				</Route>
				<Route
					element={<ProtectedByPermissionRoute permission={PERMISSIONS.CARGOS.READ} />}
				>
					<Route path="cargo/edit/:id" element={suspended(FormCargo)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.PROCESSORS.CREATE} />
					}
				>
					<Route path="processor/add" element={suspended(FormProcessor)} />
				</Route>
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.PROCESSORS.READ} />
					}
				>
					<Route path="processor/edit/:id" element={suspended(FormProcessor)} />
				</Route>
				// admin
				<Route
					element={
						<ProtectedByPermissionRoute permission={PERMISSIONS.ADMIN.CLEAR_CACHE} />
					}
				>
					<Route path="admin-clear-cache" element={suspended(FormClearCache)} />
				</Route>
			</Route>
		</Routes>
	)
}
