# Inventory Management System

A comprehensive web application designed to track and manage an organization's complete inventory of technical devices and their assignments to employees.

## Overview

This application provides a feature-rich and intuitive interface for managing various device types (computers, monitors, printers, peripherals, mobile devices), employee information, location data, and offers insightful dashboards for visualizing inventory statistics.

## Features

**Device Management:**

- Track a wide range of device categories with specialized forms and fields for each:
    - **Computers:** Desktops, Laptops, Servers, including details like processor, RAM, storage type, OS, IP/MAC addresses.
    - **Monitors:**
    - **Printers:** Standard and Financial models.
    - **Peripherals & Parts:** Keyboards, mice, cables, etc.
    - **Mobile Devices:** Smartphones, tablets.
- Each device record includes common properties: serial number, asset number, status, assignment, location, and observations.
- Category-specific attributes ensure detailed tracking for each device type.

**Employee Management:**

- Maintain comprehensive employee profiles:
    - Personal details (name, email).
    - Department and job title.
    - Contact information (phone numbers, extensions).
    - History of assigned devices.
    - Employment status (active/inactive).

**Location Tracking:**

- Hierarchical and detailed location management:
    - **Regions/Zones**
    - **Cities**
    - **Sites**
    - **Specific Locations** within sites.
- Dedicated handling for warehouse inventory and other specialized storage.

**Dashboards and Analytics:**

- **Home Dashboard:** Provides an at-a-glance summary of the inventory, recent activities, and key metrics.
- **Device-Specific Dashboards:** Offer detailed insights and performance metrics for individual device categories.
- **Distribution Charts:** Visualize inventory data across different locations, departments, and device types.

**History and Audit Tracking:**

- Maintain a detailed history of all changes made to device records.
- Track the user responsible for each modification.
- Record timestamps for every change.
- Display specific details of what was changed.

## Tech Stack

**Frontend:**

- **Framework:** React 19.1.0 with React Compiler
- **Data Fetching:** TanStack React Query 5.74.3
- **Routing:** React Router 6.30.0
- **Styling:** Tailwind CSS 4.1.4, CSS Variables
- **UI Components:** Radix UI (Select, Tabs, Dropdown, Tooltip)
- **State Management:** Context API, React Reducers, Zustand
- **Form Validation:** Zod 3.24.2
- **Charts:** Recharts 2.15.2
- **Notifications:** Sonner 2.0.3
- **Build Tools:** Vite 6.2.6, TypeScript 5.8.3

## Application Architecture

The application employs a domain-driven design (DDD) to ensure a clear separation of concerns and maintainability. Key architectural layers include:

- **Core Domain:** Contains the business logic and entities (Devices, Employees, Locations).
    - Organized by domain entities (devices, employees, locations).
    - Includes domain models and potentially repositories and services (though not explicitly shown in the overview).
- **Client-Side Application:** The React frontend responsible for the user interface and interaction.
    - **State Management:** Handles application-wide state using Context API, Reducers, and Zustand.
    - **UI Layer:** Composed of reusable and page-specific components built with React and styled with Tailwind CSS and Radix UI.
    - **Data Management:** Utilizes TanStack React Query for efficient data fetching, caching, and state management of server data.
    - **Routing:** Manages navigation within the application using React Router.
- **UI Components:** Reusable building blocks for the user interface (e.g., buttons, inputs, modals).
- **Form Components:** Specialized components for handling user input and form submissions, leveraging Zod for validation.
- **Table Components:** Display data in a structured and organized manner.
- **Filter/Search System:** Enables users to efficiently find specific inventory items.
- **Dashboard Components:** Visualize key inventory data and metrics.
- **Custom Hooks:** Encapsulate reusable logic and interact with state management and data fetching.
- **API Services:** Handle communication with the backend API (implementation details not shown).

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- bun or npm package manager

### Installation

1.  Clone the repository:

    ```bash
    git clone [https://github.com/amaneiro7/inventario-app-frontend-react-query.git](https://github.com/amaneiro7/inventario-app-frontend-react-query.git)
    cd inventario-app-frontend-react-query
    ```

2.  Install dependencies:

    ```bash
    bun install  # or
    npm install
    ```

3.  Start the development server:
    ```bash
    bun dev  # or
    npm run dev
    ```

### Available Scripts

The following scripts are available in the `package.json`:

- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `deploy`: Deploys the built application to the nginx server (specific to the project's deployment setup).
- `lint`: Runs ESLint to check for code issues.
- `format`: Formats code using Prettier.
- `preview`: Previews the production build locally.

## Project Structure
