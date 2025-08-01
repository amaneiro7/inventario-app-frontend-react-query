import * as React from 'react'

type TableIconProps = React.SVGProps<SVGSVGElement>
export const TableIcon = ({ ...props }: TableIconProps) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M12 5l0 14" />
		<path d="M18 11l-6 -6" />
		<path d="M6 11l6 -6" />
	</svg>
)
