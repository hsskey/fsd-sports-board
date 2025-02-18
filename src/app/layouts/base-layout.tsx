import { Header } from '@/app/header/ui/header'
import { Outlet } from 'react-router-dom'

export function BaseLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-6">
        <Outlet />
      </main>
    </div>
  )
}
