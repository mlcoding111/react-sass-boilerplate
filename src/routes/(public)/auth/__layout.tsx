import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/auth/__layout')({
  component: AuthLayout,
})

function AuthLayout() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
          <Outlet />
        </div>
      </div>
    )
  }