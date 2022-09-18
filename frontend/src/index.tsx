import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <MantineProvider withNormalizeCSS withGlobalStyles>
    <NotificationsProvider position="top-right">
      <App />
    </NotificationsProvider>
  </MantineProvider>
);
