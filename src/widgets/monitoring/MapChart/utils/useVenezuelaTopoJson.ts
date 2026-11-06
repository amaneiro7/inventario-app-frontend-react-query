import { useState, useEffect } from 'react'
import type { GeoJsonObject } from 'geojson'

export function useVenezuelaTopoJson() {
	const [data, setData] = useState<null | GeoJsonObject>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<null | Error>(null)

	useEffect(() => {
		const loadData = async () => {
			try {
				// Dynamic import
				const topoJson =
					(await import('@/widgets/monitoring/MapChart/Assets/venezuelaState.json')) as {
						default: GeoJsonObject
					}
				setData(topoJson.default) // .default for JSON imports
			} catch (err) {
				setError(err as Error)
			} finally {
				setLoading(false)
			}
		}

		void loadData()
	}, [])

	return { data, loading, error }
}
