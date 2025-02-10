import { useEffect, useState } from 'react'
import './App.css'
import {Card, Container, Image, Grid, Text, Group, Badge, Button, AppShell} from '@mantine/core';
import axios from 'axios';

function App() {
  const [potions, setPotions] = useState([]);
  const [potionCount, setPotionCount] = useState(0);
  const [funds, setFunds] = useState(500);

  useEffect(()=>{
    const fetchPotions = async ()=>{
      try{
        const response = await axios.get("http://localhost:8000/api/potions");
        setPotions(response.data);
        console.log('response', response)
      }
      catch(error){
        console.error('error fetching', error);
      }
    }

    fetchPotions();
  }, []);

  const handlePurchase = async(potion_id)=>{
    try{
      const response = await axios.post(`http://localhost:8000/api/buy/${potion_id}`);

      const updatedPotions = await axios.get("http://localhost:8000/api/potions");
      setPotions(updatedPotions.data);
      console.log(response.data)
      setFunds(funds - response.data.potion_price)

      setPotionCount((prev) => prev + 1);

  
    }
    catch(error){
      console.error(error)
    }
  }

  return (
    <AppShell
    header={{height:60}}
    padding="md">
       <AppShell.Header>
    <Group position="apart" px="md" py="md">
      <Group>
        <Text weight={500}>Potions</Text>
        <Badge color="pink" variant="filled">{potionCount}</Badge>
      </Group>
      <Group>
        <Text weight={500}>Tokens</Text>
        <Badge color="pink" variant="filled">{funds}</Badge>
      </Group>
    </Group>
  </AppShell.Header>
      
  
   
      <AppShell.Main>
      <Container>
    <h2>Potion Store</h2>
  
    <Grid gutter="lg">
      {potions.map((potion) => (
        <Grid.Col  span={{ base: 12, md: 6, lg: 4 }} key={potion.id}>
          <Card shadow="sm" padding="lg">
            <Card.Section>
              {/* Photo by FlyD on Unsplash https://unsplash.com/photos/clear-glass-bottle-with-red-liquid-6ShUh79l1Vw?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash*/}
              <Image src={`unsplash-${potion.id}.jpg`}  alt={potion.name} />
            </Card.Section>
            <Group position="apart" style={{ marginBottom: 10, marginTop: 10 }}>
              <Text weight={500}>{potion.name}</Text>
              <Badge color="pink" variant="light">
                ${potion.price}
              </Badge>
            </Group>
            <Text size="sm" color="dimmed" ta='left'>
              {potion.effect}
            </Text>
            <Group position="apart" style={{ marginTop: 14 }}>
              <Text size="sm" color="dimmed">
                Available: {potion.quantity}
              </Text>
             
            </Group>
            <Group position="apart" style={{ marginTop: 14 }}>
            <Button onClick={()=> handlePurchase(potion.id)}>Buy</Button>
             
            </Group>

           
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  </Container>
  </AppShell.Main>
    </AppShell>

  )
}

export default App
