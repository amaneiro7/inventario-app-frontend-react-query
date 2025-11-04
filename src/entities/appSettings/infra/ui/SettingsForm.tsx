'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { SettingArrayField } from './setting-array-field'
import { SettingNumberField } from './setting-number-field'

interface Setting {
	key: string
	value: string
	type: string
	description: string
	isEditable: boolean
	isProtected?: boolean
}

interface SettingsFormProps {
	settings: Setting[]
	values: Record<string, string>
	protectedValues: Record<string, string>
	onSave: (key: string, value: string) => void
}

export function SettingsForm({ settings, values, protectedValues, onSave }: SettingsFormProps) {
	const [editingKey, setEditingKey] = useState<string | null>(null)
	const [tempValues, setTempValues] = useState<Record<string, string>>({})

	const handleEdit = (key: string, value: string) => {
		setEditingKey(key)
		setTempValues({ [key]: value })
	}

	const handleCancel = () => {
		setEditingKey(null)
		setTempValues({})
	}

	const handleConfirm = (key: string) => {
		const setting = settings.find(s => s.key === key)
		const currentValues = setting?.isProtected ? protectedValues : values
		const newValue = tempValues[key] ?? currentValues[key]
		onSave(key, newValue)
		setEditingKey(null)
		setTempValues({})
	}

	const handleTempChange = (key: string, value: string) => {
		setTempValues(prev => ({ ...prev, [key]: value }))
	}

	return (
		<div className="space-y-6">
			{settings.map(setting => {
				if (setting.isProtected) {
					return null
				}

				const currentValue = setting.isProtected
					? protectedValues[setting.key]
					: values[setting.key]

				return (
					<div
						key={setting.key}
						className="border-border flex items-start justify-between border-b pb-6 last:border-0"
					>
						<div className="flex-1">
							<label className="text-foreground text-sm font-semibold">
								{setting.key}
							</label>
							<p className="text-muted-foreground mt-1 text-sm">
								{setting.description}
							</p>
						</div>

						<div className="flex items-center gap-3">
							{editingKey === setting.key ? (
								<div className="flex items-center gap-2">
									{setting.type === 'boolean' && (
										<Switch
											checked={tempValues[setting.key] === 'true'}
											onCheckedChange={checked =>
												handleTempChange(
													setting.key,
													checked ? 'true' : 'false'
												)
											}
										/>
									)}
									{setting.type === 'number' && (
										<SettingNumberField
											value={tempValues[setting.key]}
											onChange={value => handleTempChange(setting.key, value)}
										/>
									)}
									{setting.type === 'array' && (
										<SettingArrayField
											value={tempValues[setting.key]}
											onChange={value => handleTempChange(setting.key, value)}
										/>
									)}
									{setting.type === 'string' && (
										<Input
											value={tempValues[setting.key]}
											onChange={e =>
												handleTempChange(setting.key, e.target.value)
											}
											className="w-64"
										/>
									)}

									<Button
										size="sm"
										onClick={() => handleConfirm(setting.key)}
										className="bg-green-600 hover:bg-green-700"
									>
										✓
									</Button>
									<Button size="sm" variant="outline" onClick={handleCancel}>
										✕
									</Button>
								</div>
							) : (
								<>
									<div className="flex items-center gap-2 text-right">
										{setting.type === 'boolean' && (
											<div className="w-12 text-right">
												<span
													className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
														currentValue === 'true'
															? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
															: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
													}`}
												>
													{currentValue === 'true' ? 'ON' : 'OFF'}
												</span>
											</div>
										)}
										{setting.type === 'number' && (
											<span className="text-foreground w-20 font-mono text-sm">
												{currentValue}
											</span>
										)}
										{setting.type === 'array' && (
											<div className="max-w-xs">
												<span className="text-muted-foreground text-sm">
													{currentValue?.replace(/[[\]']/g, '').split(',')
														.length || 0}{' '}
													items
												</span>
											</div>
										)}
										{setting.type === 'string' && (
											<span className="text-foreground max-w-xs truncate text-sm">
												{currentValue}
											</span>
										)}
									</div>

									<Button
										size="sm"
										variant="outline"
										onClick={() => handleEdit(setting.key, currentValue)}
									>
										Editar
									</Button>
								</>
							)}
						</div>
					</div>
				)
			})}

			{settings.some(s => s.isProtected) && (
				<div className="border-border mt-8 border-t pt-8">
					<h3 className="text-foreground mb-6 text-lg font-semibold">
						Configuración Segura
					</h3>
					<div className="space-y-6">
						{settings.map(setting => {
							if (!setting.isProtected) return null

							const currentValue = protectedValues[setting.key]
							const hasValue = currentValue && currentValue.length > 0

							return (
								<div
									key={setting.key}
									className="border-border flex items-start justify-between border-b pb-6 last:border-0"
								>
									<div className="flex-1">
										<label className="text-foreground text-sm font-semibold">
											{setting.key}
										</label>
										<p className="text-muted-foreground mt-1 text-sm">
											{setting.description}
										</p>
									</div>

									<div className="flex items-center gap-3">
										{editingKey === setting.key ? (
											<div className="flex items-center gap-2">
												<Input
													type="password"
													value={tempValues[setting.key] || ''}
													onChange={e =>
														handleTempChange(
															setting.key,
															e.target.value
														)
													}
													placeholder="Ingresa nuevo valor"
													className="w-64"
												/>
												<Button
													size="sm"
													onClick={() => handleConfirm(setting.key)}
													className="bg-green-600 hover:bg-green-700"
												>
													✓
												</Button>
												<Button
													size="sm"
													variant="outline"
													onClick={handleCancel}
												>
													✕
												</Button>
											</div>
										) : (
											<>
												<div className="flex items-center gap-2 text-right">
													{hasValue ? (
														<span className="text-foreground font-mono text-sm">
															••••••••
														</span>
													) : (
														<span className="text-muted-foreground text-sm italic">
															Sin configurar
														</span>
													)}
												</div>
												<Button
													size="sm"
													variant="outline"
													onClick={() => handleEdit(setting.key, '')}
												>
													{hasValue ? 'Cambiar' : 'Establecer'}
												</Button>
											</>
										)}
									</div>
								</div>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}
