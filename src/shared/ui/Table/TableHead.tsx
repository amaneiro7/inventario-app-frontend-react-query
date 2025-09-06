import { forwardRef, useMemo } from 'react'
import { cn } from '@/shared/lib/utils'
import { TableIcon } from '@/shared/ui/icon/TableIcon'
import { type OrderBy } from '@/entities/shared/domain/criteria/OrderBy'
import { type OrderType, OrderTypes } from '@/entities/shared/domain/criteria/OrderType'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export const TableHeadSize = {
	xxSmall: 'w-8', // 32px
	xSmall: 'w-20', // 80px
	small: 'w-28', // 112px
	medium: 'w-36', // 144px
	large: 'w-44', // 176px
	xLarge: 'w-52', // 224px
	xxLarge: 'w-64', // 256px
	auto: 'w-auto' // 224px
} as const
type BaseProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
	size: keyof typeof TableHeadSize
	isTab?: boolean
}

type SortableProps = {
	handleSort: (field: string) => Promise<void>
	orderByField: string
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
}

type NonSortableProps = {
	handleSort?: never
	orderByField?: never
	orderBy?: never
	orderType?: never
}

type Props = BaseProps & (SortableProps | NonSortableProps)

export const TableHead = forwardRef<HTMLTableCellElement, Props>(
	(
		{
			className,
			size,
			children,
			orderByField,
			handleSort,
			isTab = false,
			orderBy,
			orderType,
			...props
		},
		ref
	) => {
		const IconClasses = useMemo(
			() =>
				'group-hover/th:text-azul-500 inline-block aspect-square h-3 w-3 stroke-2 text-inherit opacity-30 transition-transform duration-300 group-hover/th:opacity-100 data-[active=true]:opacity-100 data-[direction=down]:rotate-180',
			[]
		)

		const ariaSort: React.AriaAttributes['aria-sort'] = useMemo(() => {
			return orderType === OrderTypes.ASC
				? 'ascending'
				: orderType === OrderTypes.DESC
					? 'descending'
					: undefined
		}, [orderType])
		return (
			<th
				data-sortable={handleSort ? 'true' : 'false'}
				role="columnheader"
				scope="col"
				ref={ref}
				tabIndex={-1}
				aria-sort={ariaSort}
				className={cn(
					'group/th data-[sortable=true]:hover:text-azul-500 focus-visible:outline-focus h-9 min-h-9 p-2 text-start align-middle font-semibold tracking-wider whitespace-nowrap capitalize outline-hidden last:rounded-e-lg focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 data-[sortable=true]:cursor-pointer',
					{
						[`${TableHeadSize[size]}`]: size,
						['first:rounded-es-lg']: isTab,
						['first:rounded-s-lg']: !isTab
					},
					className
				)}
				onClick={handleSort ? () => handleSort(orderByField) : undefined}
				{...props}
			>
				{children}
				{handleSort && (
					<div className="ml-1 inline-flex items-center">
						<TableIcon
							aria-hidden
							focusable="false"
							role="presentation"
							data-active={orderBy === orderByField && orderType !== OrderTypes.DESC}
							data-direction="up"
							className={IconClasses}
						/>
						<TableIcon
							aria-hidden
							focusable="false"
							role="presentation"
							data-active={orderBy === orderByField && orderType === OrderTypes.DESC}
							data-direction="down"
							className={IconClasses}
						/>
					</div>
				)}
			</th>
		)
	}
)
