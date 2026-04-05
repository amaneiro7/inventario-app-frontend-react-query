import './trusted-policy.ts'

const { VITE_URL_API: baseURL, VITE_TITLE_LOGO: titleLogo } = import.meta.env

// Validación manual simple
if (!import.meta.env.VITE_URL_API || !import.meta.env.VITE_TITLE_LOGO) {
	throw new Error('Faltan variables de entorno críticas: VITE_URL_API o VITE_TITLE_LOGO')
}

export { baseURL, titleLogo }
