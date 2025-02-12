import React, { useEffect, useState } from "react";
import axios from "axios"
import { Container, NumberInput, Paper, TextInput, Title, Stack, Button, Table } from "@mantine/core";
import {useForm} from "react-hook-form";
import { notifications } from "@mantine/notifications";


const AdminPanel = () =>{
    const {register, handleSubmit, setValue, reset} = useForm();
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
    const addPotion = async (data)=>{
        try{
        await axios.post('http://localhost:8001/api/potions', data)
        console.log(data)
        notifications.show({
            title:"Potion added!",
            message: `Added to inventory`,
            color:'green'
        });
        fetchPotions();
        reset();
        }
        catch(error){
            console.error(error);
        }
    }
    return (
        <>
            <Container size="lg">
                <Title order={2} align="center" mb="lg">
                    Potion Store - Admin UI
                </Title>
                <Paper shadow="md" p="md" withBorder mb="lg">
                    <Title order={3} mb="md">Add a new Potion</Title>
                <form onSubmit={handleSubmit(addPotion)}>
                    <Stack>
                        <TextInput label="Potion Name" {...register("name")} required />
                        <NumberInput label="Price" {...register("price", {valueAsNumber: true})} onChange={(value)=> setValue("price", value)} required />
                        <NumberInput label="Quantity" {...register("quantity", {valueAsNumber:true})} onChange={(value)=>setValue("quantity", value)} required />
                        <TextInput label="Effect"  {...register("effect")} required/>
                        <Button type="submit" color="blue">Add Potion</Button>
                    </Stack>
                </form>
                </Paper>
                <Paper shadow="md" p="md" withBorder>
                    <Title order={3} mb="md"> Available Potions </Title>
                    <Table striped highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Effect</th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {potions.map((potion)=>(
                                <Table.Tr key={potion.id}>
                                    <Table.Td>{potion.name}</Table.Td>
                                    <Table.Td>{potion.price}</Table.Td>
                                    <Table.Td>{potion.quantity}</Table.Td>
                                    <Table.Td>{potion.effect}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Paper>
            </Container>
        </>
    )
}

export default AdminPanel;