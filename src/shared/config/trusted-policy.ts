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
		const policy = window.trustedTypes.createPolicy('default', {
			// We let DOMPurify sanitize the string. The browser will automatically
			// wrap the returned string into a TrustedHTML object.
			createHTML: string => DOMPurify.sanitize(string),
			createScript: string => string,
			createStyle: style => style,
			createScriptURL: url => url
		})

		// Configure DOMPurify to use our 'default' policy.
		// This prevents DOMPurify from creating its own 'dompurify' policy internally,
		// helping you stick to a cleaner CSP: "trusted-types default"
		DOMPurify.setConfig({ TRUSTED_TYPES_POLICY: policy as any })
	}
}
