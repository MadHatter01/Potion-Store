import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AppShell } from '@mantine/core'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <AppShell
          header={{height:60}}
          padding="md">
            <AppShell.Header>
            Admin UI
            </AppShell.Header>
            
        
         
            <AppShell.Main></AppShell.Main>
            </AppShell>
    </>
  )
}

export default App
