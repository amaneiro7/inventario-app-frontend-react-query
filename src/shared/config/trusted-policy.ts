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
	createScript(input: string): TrustedScript | string
	createScriptURL(input: string): TrustedScriptURL | string
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
		}
	}
}

if (window.trustedTypes?.createPolicy) {
	if (!window.trustedTypes.defaultPolicy) {
		window.trustedTypes.createPolicy('default', {
			createHTML: string =>
				DOMPurify.sanitize(string, { RETURN_TRUSTED_TYPE: true }) as unknown as string,
			createScript: string => string,
			createStyle: style => style,
			createScriptURL: url => url
		})
	}
}
