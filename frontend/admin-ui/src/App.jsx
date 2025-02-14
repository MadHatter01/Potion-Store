
import './App.css'
import { AppShell, Tabs, Container , Title} from '@mantine/core'
import AdminInventoryAdd from './AdminInventoryAdd'
import {IconTablePlus, IconBasket, IconTable} from '@tabler/icons-react'
import AdminView from './AdminView'
function App() {

  return (
    <AppShell
    header={{ height: 60 }}
    padding="md"
  >

<AppShell.Header>
      
        <Title order={2} align="center" style={{padding:'0.5rem'}}>
                         Potion Store - Admin UI
                     </Title>
      </AppShell.Header>
    <AppShell.Main style={{width:'100%'}}>

    <Tabs  defaultValue="addNew" style={{width:'100%'}} >
      <Tabs.List grow>
        <Tabs.Tab value="inventory" leftSection={<IconBasket size={12} />}>
          Available Inventory
        </Tabs.Tab>
        <Tabs.Tab value="addNew" leftSection={<IconTablePlus size={12} />}>
          Add New
        </Tabs.Tab>
   
      </Tabs.List>

      <Tabs.Panel value="inventory" >
      <Container size="lg" style={{minWidth:"600px"}}>
      <AdminView />
      </Container>
      </Tabs.Panel>
    

      <Tabs.Panel value="addNew" >
      <Container size="lg" style={{minWidth:"600px"}}>
     <AdminInventoryAdd />
     </Container>
      </Tabs.Panel>

    </Tabs>
      
      
      
      
      </AppShell.Main>
  </AppShell>
  )
}

export default App
