import { Navbar } from '@/widgets'
import { ErrorBoundary } from '@app/providers'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </>
  )
}

export default MainLayout
