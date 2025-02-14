import React, { useEffect, useState } from "react";
import axios from "axios"
import { NumberInput, Paper, TextInput, Title, Stack, Button, Table, Group } from "@mantine/core";
import {useForm} from "react-hook-form";
import { notifications } from "@mantine/notifications";


const AdminInventoryAdd = () =>{
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


    const addPotion = async (data)=>{
        try{
        await axios.post('http://localhost:8001/api/potions', data)
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
             
             
                <Paper shadow="md" p="md" withBorder mb="lg" style={{width:'100%'}}>
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
           
         
            </>
        
    )
}

export default AdminInventoryAdd;