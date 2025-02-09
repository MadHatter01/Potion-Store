import { useEffect, useState } from 'react'
import './App.css'
import {Card, Container, Image, Grid, Text, Group, Badge, Button} from '@mantine/core';
import axios from 'axios';

function App() {
  const [potions, setPotions] = useState([]);

  useEffect(()=>{
    const fetchPotions = async ()=>{
      try{
        const response = await axios.get("http://localhost:8001/potions");
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
      const response = await axios.post(`http://localhost:8002/buy/${potion_id}`);
      console.log(response.data)

      const updatedPotions = await axios.get("http://localhost:8001/potions");
      setPotions(updatedPotions.data)
  
    }
    catch(error){
      console.error(error)
    }
  }

  return (
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
  )
}

export default App
