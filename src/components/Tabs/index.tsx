import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

type TabBgColor = keyof typeof Color

const Color = {
	orange: 'data-[state=active]:bg-naranja',
	green: 'data-[state=active]:bg-verde',
	red: 'data-[state=active]:bg-rojo',
	blue: 'data-[state=active]:bg-azul-700',
	darkBlue: 'data-[state=active]:bg-azul',
	blanco: `data-[state=active]:bg-white`
} as const

// Extend the props for TabsPrimitive.Trigger to include your custom bgColor prop
interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
	bgColor?: TabBgColor // Use the defined type for bgColor
}

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
	React.ComponentRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			'bg-gris/10 inline-flex h-10 items-center justify-center rounded-md p-1 text-black',
			className
		)}
		{...props}
	/>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
	React.ComponentRef<typeof TabsPrimitive.Trigger>,
	TabsTriggerProps
>(({ className, bgColor = 'blue', ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			'ring-offset-background focus-visible:ring-ring hover:bg-gris/30 data-[state=active]:bg-azul-700 inline-flex cursor-pointer items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=active]:font-semibold data-[state=active]:text-white data-[state=active]:shadow-xs',
			Color[bgColor],
			className
		)}
		{...props}
	/>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
	React.ComponentRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
			className
		)}
		{...props}
	/>
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
