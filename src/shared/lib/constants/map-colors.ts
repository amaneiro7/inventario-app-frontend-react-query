export const COLOR_THRESHOLDS = [
	{ threshold: 100, color: '#09743A', label: '100%' }, // Green (full)
	{ threshold: 80, color: '#22c55e', label: '80-99%' }, // Green (high)
	{ threshold: 60, color: '#eab308', label: '60-79%' }, // Yellow (medium)
	{ threshold: 40, color: '#f97316', label: '40-59%' }, // Orange (medium-low)
	{ threshold: 0, color: '#ef4444', label: '0-39%' } // Red (low)
]

export const NO_DATA_COLOR = '#D3D3D3' // Gray for states without data
export const NO_EQUIPMENT_COLOR = '#f1f5f9' // Light gray for states with 0 total equipment
