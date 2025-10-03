# AI Agent SAKERNAS - Development Rules

This document outlines the core technologies used in this project and provides guidelines for using specific libraries to maintain consistency and best practices.

## Tech Stack Overview

This project is built using a modern web development stack, focusing on performance, maintainability, and a great developer experience.

*   **Vite**: A fast build tool that provides an instant development server and optimized builds.
*   **TypeScript**: A superset of JavaScript that adds static type checking, improving code quality and developer productivity.
*   **React**: A declarative, component-based JavaScript library for building user interfaces.
*   **shadcn/ui**: A collection of reusable components built with Radix UI and Tailwind CSS, providing a consistent and accessible UI.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs directly in your markup.
*   **React Router**: A standard library for routing in React applications, enabling declarative navigation.
*   **Supabase**: An open-source Firebase alternative, used here for backend services, including Edge Functions.
*   **TanStack Query (React Query)**: A powerful data-fetching library for React, handling caching, synchronization, and server state management.
*   **Sonner**: A modern toast library for displaying elegant and accessible notifications to the user.
*   **Lucide React**: A collection of beautiful and customizable open-source icons.

## Library Usage Guidelines

To ensure consistency and leverage the strengths of each library, please adhere to the following rules:

*   **UI Components**: Always prioritize `shadcn/ui` components for building the user interface. If a specific component is not available or requires significant customization, create a new component in `src/components/` using Tailwind CSS. **Do not modify existing `shadcn/ui` component files.**
*   **Styling**: All styling must be done using **Tailwind CSS** classes. Avoid inline styles or separate CSS files unless absolutely necessary for global styles (e.g., `src/index.css`).
*   **Routing**: Use `react-router-dom` for all client-side navigation and route management. Routes should be defined in `src/App.tsx`.
*   **State Management & Data Fetching**:
    *   For server state (fetching, caching, and updating data from APIs), use **TanStack Query**.
    *   For local component state, use React's built-in `useState` and `useReducer` hooks.
*   **Icons**: Use icons from the **`lucide-react`** library.
*   **Notifications**: Implement user feedback and notifications using the **`sonner`** toast library.
*   **Backend Interaction**: Interact with Supabase services (e.g., calling Edge Functions, database operations) using the `@supabase/supabase-js` client.
*   **Utility Functions**: General utility functions that are not specific to a single component or hook should be placed in `src/lib/utils.ts`.
*   **Custom Hooks**: All custom React hooks should be created in the `src/hooks/` directory.