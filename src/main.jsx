import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import enUS from 'antd/locale/en_US';
import {router} from '@/routers/router.jsx'
import { ConfigProvider } from 'antd'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ConfigProvider locale={enUS}>
          <RouterProvider router={router} />
      </ConfigProvider>
  </StrictMode>,
)
