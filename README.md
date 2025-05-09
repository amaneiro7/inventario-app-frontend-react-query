Answer
Based on the provided context, I'll create a comprehensive README.md file for the Inventory Management System project.

Inventory Management System
A comprehensive web application designed to track and manage a complete inventory of technical devices and their assignments to employees within an organization.

Overview
This application provides a feature-rich interface for managing various device types (computers, monitors, printers, peripherals), employee information, location data, and includes dashboards for visualizing inventory statistics.

Features
Device Management
Track various device types with specialized forms and fields:
Computers (desktops, laptops, servers)
Monitors
Printers (standard and financial)
Peripheral devices and parts
Mobile devices
Each device has common properties (serial, asset number) and category-specific attributes
Employee Management
Track employee information including:
Personal details (name, email)
Department and position
Contact information (phone numbers, extensions)
Device assignments
Location Tracking
Hierarchical location management:
Region/Zones
Cities
Sites
Specific locations
Special handling for warehouse inventory
Dashboards and Analytics
Home dashboard with inventory summary and recent activities
Device-specific dashboards with detailed metrics
Distribution charts for visualizing inventory data
History and Audit Tracking
Detailed history of all device changes
User attribution for each change
Timestamp information
Change details
Tech Stack
Category Technologies
Frontend Framework React 19.1.0 with React Compiler
Data Fetching TanStack React Query 5.74.3
Routing React Router 6.30.0
Styling Tailwind CSS 4.1.4, CSS Variables
UI Components Radix UI (Select, Tabs, Dropdown, Tooltip)
State Management Context API, React Reducers, Zustand
Form Validation Zod 3.24.2
Charts Recharts 2.15.2
Notifications Sonner 2.0.3
Build Tools Vite 6.2.6, TypeScript 5.8.3
Application Architecture
The application follows a domain-driven design approach with clearly separated concerns:

Client-Side Application

State Management

UI Layer

Data Management

Core Pages

Authentication Context

App.tsx

AppRoutes.tsx

AuthContextProvider

Layout Component

Pages (Home, List, Form, Dashboard)

Page Wrappers (ListWrapper, FormWrapper, etc.)

React Query

Custom Hooks

API Services

UI Components

Form Components

Table Components

Filter/Search System

Dashboard Components

User State

Form Reducers

Validation Rules

Form State

Core Domain Model
The system revolves around devices, employees, locations, and their relationships:

assigned to

placed at

has

1
1
1
0..1
1

- Device

id: string

serial: string

activo: string

categoryId: string

brandId: string

modelId: string

statusId: string

employeeId: string

locationId: string

observation: string

stockNumber: string

DeviceComputer

computerName: string

processorId: string

memoryRamCapacity: number

memoryRam: Array

hardDriveTypeId: string

operatingSystemId: string

ipAddress: string

macAddress: string

Employee

id: string

name: string

lastName: string

email: string

departmentId: string

cargoId: string

phones: Phone[]

extensions: Extension[]

isStillWorking: boolean

Location

id: string

name: string

siteId: string

typeOfSiteId: string

Phone

Getting Started
Prerequisites
Node.js (latest LTS version recommended)
Bun or npm package manager
Installation
Clone the repository
git clone https://github.com/amaneiro7/inventario-app-frontend-react-query.git  
cd inventario-app-frontend-react-query
Install dependencies
bun install

# or

npm install
Start the development server
bun dev

# or

npm run dev
Available Scripts
dev: Start the development server
build: Build the application for production
deploy: Deploy the built application to the nginx server
lint: Run ESLint to check for code issues
format: Format code using Prettier
preview: Preview the production build locally package.json:6-13
Project Structure
The project follows a domain-driven design approach with a clear separation of concerns:

/src/core: Core domain logic and business rules
Organized by domain entities (devices, employees, locations)
Contains domain models, repositories, and services
/src/components: Reusable UI components
/src/ui: Page-specific UI components and wrappers
/src/routes: Application routing configuration
/src/assets: Static assets (images, fonts, etc.)
Contributing
Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
React
Vite
TanStack Query
Tailwind CSS
Radix UI
Notes
This README was created based on the project overview and available code snippets. The project appears to be an inventory management system built with React, TypeScript, and modern frontend technologies. The README includes information about features, tech stack, architecture, and getting started instructions derived from the package.json and wiki overview. Some sections like licensing and contributing are standard templates that should be customized based on the project's specific requirements.

Wiki pages you might want to explore:

Overview (amaneiro7/inventario-app-frontend-react-query)
