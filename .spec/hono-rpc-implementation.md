# Hono RPC System

## Overview
A type-safe RPC communication system connecting a Hono server with a React client in a turbo monorepo setup.

## Server (apps/server)
- **Framework**: Hono 4.10.3 with Bun runtime
- **Port**: 3000
- **Authentication**: Better Auth integration with session management
- **Database**: Drizzle ORM with PostgreSQL
- **CORS**: Configured for localhost:5173 client origin
- **API Routes**:
  - `GET /api/hello` - Returns greeting message
  - `GET /api/session` - Returns authenticated user session data
- **Exports**: `AppType` type definition for client RPC

## Client (apps/client)
- **Framework**: React 19 with Vite, TypeScript
- **UI**: Shadcn/ui components with Tailwind CSS
- **State Management**: React useState hooks for component state
- **RPC Client**: Hono client (`hc`) connected to localhost:3000
- **Features**:
  - Direct API calls from component with async functions
  - Loading states and error handling with useState
  - Interactive buttons to fetch hello message and session data
  - Display of server responses in formatted JSON

## Architecture
- **RPC Pattern**: Client uses Hono's `hc` helper for remote procedure calls
- **Type Safety**: Runtime type assertions with TypeScript interfaces
- **State Management**: Local component state with useState hooks
- **Cross-Origin**: CORS middleware enables client-server communication
