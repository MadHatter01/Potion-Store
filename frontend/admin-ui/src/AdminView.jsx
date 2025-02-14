import React, { useEffect, useState } from "react";
import axios from "axios"
import { Container, Paper, Title, Button, Table, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";


const AdminView = () =>{
    const [potions, setPotions] = useState([]);
    const fetchPotions = async()=>{
        try{
            const response = await axios.get("http://localhost:8001/api/potions");
            setPotions(response.data);
            console.log(potions, response.data)
        } catch(error){
            console.error("Error: ", error);
        }
    }

    useEffect(()=>{
        fetchPotions();
    }, []);
 
    const handleRestock = async(potion_id)=>{
        notifications.show({
            title: 'Potion restocked!',
            message:`Potion ${potion_id} is restocked `,
            color: 'green'
        })
    }
    return (
     
            <>
             
                <Paper shadow="md" p="md" withBorder mb="lg">
                    <Title order={3} mb="md"> Available Potions </Title>
                    <Table striped > 
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Price</Table.Th>
                                <Table.Th>Quantity</Table.Th>
                                <Table.Th>Effect</Table.Th>
                                <Table.Th>Restock?</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {potions.map((potion)=>(
                                <Table.Tr key={potion.id}>
                                    <Table.Td>{potion.name}</Table.Td>
                                    <Table.Td>{potion.price}</Table.Td>
                                    <Table.Td>{potion.quantity}</Table.Td>
                                    <Table.Td>{potion.effect}</Table.Td>
                                    <Table.Td><Button size="xs" color="blue" variant="light" onClick={()=> handleRestock(potion.id)}>Restock+1</Button></Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Paper>
              
           
            </>
        
    )
}

export default AdminView;