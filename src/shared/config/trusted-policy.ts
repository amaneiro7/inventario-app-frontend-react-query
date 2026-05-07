import DOMPurify from 'dompurify'

/**
 * Tipado manual para Trusted Types si no se dispone de @types/trusted-types.
 * Esto previene el uso de 'any' y asegura que las funciones de la política
 * retornen tipos compatibles.
 */
interface TrustedHTML {
	readonly __brand: unique symbol
}
interface TrustedScript {
	readonly __brand: unique symbol
}
interface TrustedScriptURL {
	readonly __brand: unique symbol
}

interface TrustedTypePolicy {
	readonly name: string
	createHTML(input: string): TrustedHTML | string
	createScript?(input: string): TrustedScript | string
	createScriptURL?(input: string): TrustedScriptURL | string
}

declare global {
	interface Window {
		trustedTypes?: {
			createPolicy: (
				name: string,
				policy: {
					createHTML?: (input: string) => string | TrustedHTML
					createScript?: (input: string) => string | TrustedScript
					createStyle?: (input: string) => string
					createScriptURL?: (input: string) => string | TrustedScriptURL
				}
			) => TrustedTypePolicy
			defaultPolicy?: TrustedTypePolicy
			getPolicyNames: () => string[]
		}
	}
}

const setupTrustedTypes = () => {
	const tt = window.trustedTypes
	if (!tt?.createPolicy) return

	const activePolicies = tt.getPolicyNames?.() || []

	// 1. Politica 'dompurify': Permitida explicitamente en tu CSP.
	if (activePolicies.includes('dompurify')) {
		tt.createPolicy('dompurify', {
			createHTML: (input: string) =>
				DOMPurify.sanitize(input, { RETURN_TRUSTED_TYPE: true }) as unknown as TrustedHTML
		})
	}

	// 2. Política 'default': Actúa como fallback para todas las inyecciones de HTML.
	if (!tt.defaultPolicy && !activePolicies.includes('default')) {
		tt.createPolicy('default', {
			createHTML: (input: string) =>
				DOMPurify.sanitize(input, { RETURN_TRUSTED_TYPE: true }) as unknown as TrustedHTML,
			// Para Scripts y URLs, se suele dejar pasar el string original
			// a menos que tengas una lógica de validación específica.
			createScript: (input: string) => input,
			createScriptURL: (input: string) => input
		})
	}
}

setupTrustedTypes()
