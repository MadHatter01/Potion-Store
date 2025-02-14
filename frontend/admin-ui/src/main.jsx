import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider forceColorScheme='dark' withGlobalStyles withNormalizeCSS>
    <Notifications />

      <App />
    </MantineProvider>
  </StrictMode>,
)
