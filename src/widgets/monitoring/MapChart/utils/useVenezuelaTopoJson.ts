import { useState, useEffect } from 'react'

export function useVenezuelaTopoJson() {
	const [data, setData] = useState<null | object>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<null | Error>(null)

	useEffect(() => {
		const loadData = async () => {
			try {
				// Dynamic import
				const topoJson =
					await import('@/widgets/monitoring/MapChart/Assets/venezuelaState.json')
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
