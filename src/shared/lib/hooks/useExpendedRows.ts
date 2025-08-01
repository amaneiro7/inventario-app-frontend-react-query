import { useState } from 'react'

export const useExpendedRows = <T>() => {
	const [expandedRows, setExpandedRows] = useState<T[]>([])
	// This function handles the event when a row is clicked. It takes the ID of the clicked row as an argument.
	// It first creates a copy of the current expanded rows.
	// Then, it checks if the clicked row is currently expanded.
	// If it is expanded, it removes the ID from the list of expanded rows.
	// If it's not expanded, it adds the ID to the list of expanded rows.
	// Finally, it updates the state with the new list of expanded rows.
	const handleRowClick = (id: T) => {
		const currentExpandedRows = [...expandedRows] // Create a copy of the current expanded rows
		const isRowCurrentlyExpanded = currentExpandedRows.includes(id) // Check if the clicked row is currently expanded
		const newExpandedRows = isRowCurrentlyExpanded
			? currentExpandedRows.filter(rowId => rowId !== id) // If it is expanded, remove the ID from the list of expanded rows
			: currentExpandedRows.concat(id) // If it's not expanded, add the ID to the list of expanded rows
		setExpandedRows(newExpandedRows) // Update the state with the new list of expanded rows
	}

	return { expandedRows, handleRowClick }
}
