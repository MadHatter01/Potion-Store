import React from "react";
import axios from "axios"
import { Container, NumberInput, Paper, TextInput, Title, Stack, Button } from "@mantine/core";
import {useForm} from "react-hook-form";

const AdminPanel = () =>{
    const {register, handleSubmit, setValue, reset} = useForm();
    const addPotion = async (data)=>{
        console.log(data)
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
            </Container>
        </>
    )
}

export default AdminPanel;