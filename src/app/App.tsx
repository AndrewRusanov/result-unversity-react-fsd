import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './layout'
import { PrivateRoute } from './providers'

const Home = lazy(() =>
  import('@pages/Home').then(module => ({
    default: module.Home,
  }))
)
const Login = lazy(() =>
  import('@pages/Login').then(module => ({
    default: module.Login,
  }))
)
const NotFound = lazy(() =>
  import('@pages/NotFound').then(module => ({
    default: module.NotFound,
  }))
)
const Category = lazy(() =>
  import('@pages/Category').then(module => ({
    default: module.Category,
  }))
)
const Details = lazy(() =>
  import('@pages/Details').then(module => ({
    default: module.Details,
  }))
)

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route element={<MainLayout />}>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path='/character'
            element={
              <PrivateRoute>
                <Category category='character' />
              </PrivateRoute>
            }
          />
          <Route
            path='/character/:id'
            element={
              <PrivateRoute>
                <Details category='character' />
              </PrivateRoute>
            }
          />
          <Route
            path='/episode'
            element={
              <PrivateRoute>
                <Category category='episode' />
              </PrivateRoute>
            }
          />
          <Route
            path='/episode/:id'
            element={
              <PrivateRoute>
                <Details category='episode' />
              </PrivateRoute>
            }
          />
          <Route
            path='/location'
            element={
              <PrivateRoute>
                <Category category='location' />
              </PrivateRoute>
            }
          />
          <Route
            path='/location/:id'
            element={
              <PrivateRoute>
                <Category category='location' />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
