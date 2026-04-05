import './trusted-policy.ts'

const { VITE_URL_API: baseURL, VITE_TITLE_LOGO: titleLogo } = import.meta.env

// Validación manual simple
if (!baseURL || !titleLogo) {
	throw new Error('Faltan variables de entorno críticas: VITE_URL_API o VITE_TITLE_LOGO')
}

if (typeof baseURL !== 'string' || typeof titleLogo !== 'string') {
	throw new Error(
		'Las variables de entorno deben ser cadenas de texto: VITE_URL_API y VITE_TITLE_LOGO'
	)
}

export { baseURL, titleLogo }
