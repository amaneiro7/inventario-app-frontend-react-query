import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/components/Breadcrumb'
import React from 'react'

interface BreadcrumbSegment {
	label: string
	href?: string
}

interface DynamicBreadcrumbProps {
	segments: (string | BreadcrumbSegment)[]
}

export const DynamicBreadcrumb: React.FC<DynamicBreadcrumbProps> = ({ segments }) => {
	return (
		<Breadcrumb className="mb-2">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild className="flex items-center">
						<Link to="/">
							<Home className="mr-2 h-4 w-4" />
							Inicio
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{segments.map((segment, index) => (
					<React.Fragment key={index}>
						<BreadcrumbItem>
							{typeof segment === 'string' ? (
								<BreadcrumbPage>{segment}</BreadcrumbPage>
							) : segment.href ? (
								<BreadcrumbLink asChild>
									<Link to={segment.href}>{segment.label}</Link>
								</BreadcrumbLink>
							) : (
								<BreadcrumbPage>{segment.label}</BreadcrumbPage>
							)}
						</BreadcrumbItem>
						{index < segments.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
