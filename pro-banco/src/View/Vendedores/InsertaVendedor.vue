<template>

    <MiHeader></MiHeader>

    <fieldset>

        <label for="">Crear Vendedor</label>

        <form @submit.prevent="insertaVendedor">
            <div>
                <label for="Codigo documento">Codigo documento</label>
                <input type="text" v-model="frm.documento" required>
            </div>
            <div>
                <label for="Cuenta">Cuenta</label>
                <input type="text" v-model="frm.cuenta.cuenta" required>
            </div>
            <div>
                <label for="Nombre Completo">Nombre Completo</label>
                <input type="text" v-model="frm.nombreApellido" required>
            </div>
            <div>
                <label for="Correo">Correo</label>
                <input type="text" v-model="frm.correo" required>
            </div>
            <div>
                <label for="Celular">Celular</label>
                <input type="text" v-model="frm.celular" required>
            </div>
            <div>
                <label for="Direccion">Direccion</label>
                <input type="text" v-model="frm.direccion" required>
            </div>

            <div>
                <button type="submit">Registrar</button>
            </div>
        </form>

        <div>{{ mensaje }}</div>

    </fieldset>
</template>

<script setup>
import MiHeader from '@/components/MiHeader.vue';//
import Swal from 'sweetalert2';
import { ref } from 'vue';

const frm= ref({
    documento:"",
    cuenta:{cuenta:""},
    nombreApellido:"",
    correo:"",
    celular:"",
    direccion:"",
})

const mensaje = ref("")
const insertaVendedor = async ()=> {
    
    try{
        const respuesta= await fetch("http://localhost:8080/vendedores",
        {
        method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(frm.value)
        })

        console.log(respuesta)

        if(!respuesta.ok){
            throw new Error("No se ha podido crear vendedor (InsertaVendedor)")
        }

        Swal.fire({
            title: "Registro ok",
            text: "Ha creado vendedor de forma correcta",
            icon: "success",
            confirmButtonText: "Aceptar"
        })

        mensaje.value="Registro exitoso"
        frm.value={
                documento:"",
                cuenta:{cuenta:""},
                nombreApellido:"",
                correo:"",
                celular:"",
                direccion:"",
                }

    }catch(error){
        mensaje.value= error.mensaje
        
        Swal.fire({
            title: "Error",
            text: "Error creando vendedor",
            icon: "error",
            confirmButtonText: "Error"
        })
    }
}

</script>.