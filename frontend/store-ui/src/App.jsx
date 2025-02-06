import { useState } from 'react'
import './App.css'
import {Card, Container, Image, Grid, Text} from '@mantine/core';

function App() {

  return (
    <Container>
      <h2>Potion Store</h2>
      <Grid>
      <Grid.Col span={4}>
        <Card shadow='sm' padding='lg'>
          <Card.Section>
            <Image src='https://placehold.co/600x400' alt='placeholder' />
          </Card.Section>
          <Text size="sm" color="dimmed">
            Elixir
          </Text>
        </Card>
      </Grid.Col>
      </Grid>

    </Container>
  )
}

export default App
