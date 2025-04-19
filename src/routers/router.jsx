import App from '@/App'
import LayoutAdmin from '@/components/layout/layout.admin'
import HomePage from '@/page/home/Home.page'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
    {
    path: '/',
    element: <LayoutAdmin />,
    children:[
      {
        index: true,
        element: <App />
      },
      {
        path:"home",
        element:<HomePage/>
      }
    ]
  },
])