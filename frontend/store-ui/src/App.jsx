import { useEffect, useState } from 'react'
import './App.css'
import {Card, Container, Image, Grid, Text, Group, Badge, Button} from '@mantine/core';
import axios from 'axios';

function App() {
  const [potions, setPotions] = useState([]);

  useEffect(()=>{
    const fetchPotions = async ()=>{
      try{
        const response = await axios.get("http://localhost:8001/api/potions");
        setPotions(response.data);
      }
      catch(error){
        console.error('error fetching', error);
      }
    }

    fetchPotions();
  }, []);

  return (
    <Container>
    <h2>Potion Store</h2>
    <Grid gutter="lg">
      {potions.map((potion) => (
        <Grid.Col  span={{ base: 12, md: 6, lg: 5 }} key={potion.id}>
          <Card shadow="sm" padding="lg">
            <Card.Section>
              <Image src='https://placehold.co/200x200' alt={potion.name} />
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
            <Button >Stock up!</Button>
             
            </Group>

           
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  </Container>
  )
}

export default App
