<template>
    <MiHeader></MiHeader>
    
    <fieldset>
        <form @submit.prevent="buscaVendedor">
            <label for="">Id Vendedor</label>
            <input type="text" v-model="documento" required>
            <button type="submit">Buscar Vendedor</button>
        </form>

        <div>{{ mensaje }}</div>

        <section v-if="regVendedor">
            <form @submit.prevent="actualizaVendedor">
                <div>
                    <label for="">Documento</label> 
                    <input type="text" v-model="regVendedor.documento" disabled>
                </div>
                <div>
                    <label for="">Cuenta</label> 
                    <input type="text" v-model="regVendedor.cuenta.cuenta" disabled>
                </div>
                <div>
                    <label for="">Nombre Completo</label> 
                    <input type="text" v-model="regVendedor.nombreApellido">
                </div>
                <div>
                    <label for="">Correo</label> 
                    <input type="text" v-model="regVendedor.correo">
                </div>
                <div>
                    <label for="">Celular</label> 
                    <input type="text" v-model="regVendedor.celular">
                </div>
                <div>
                    <label for="">Direccion</label> 
                    <input type="text" v-model="regVendedor.direccion">
                </div>
                <div>
                    <button type="submit">Actualizar</button>
                </div>
            </form>
        </section> 
    </fieldset>
</template>

<script setup>
import MiHeader from '@/components/MiHeader.vue';
import Swal from 'sweetalert2';
import { ref } from 'vue';

const documento=ref("")
const regVendedor=ref(null)
const mensaje=ref(null)


const buscaVendedor=async()=>{
    alert("consultando")
    try{
        const datosVendedor=await fetch(`http://localhost:8080/vendedores/${documento.value}`,{
            method:"GET"
        })
        console.log(datosVendedor)
        if(!datosVendedor.ok){
            throw new Error ("No se encuentra Vendedor")
        }
    
        regVendedor.value=await datosVendedor.json()
        //mensaje.value=("Consulta ok")
    }catch{
        mensaje.value=error.mensaje
    }

}

const actualizaVendedor=async()=>{
    alert("Actualizando")
    try{
        const datosVendedor=await fetch(`http://localhost:8080/vendedores/${documento.value}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(regVendedor.value)
        })
    
        if (!datosVendedor.ok){
            throw new error("Error al actualizar Vendedor")
        }

        Swal.fire({
            title: "Registro ok",
            text: "Ha actualizado Vendedor de forma correcta",
            icon: "success",
            confirmButtonText: "Aceptar"
        })

        mensaje.value="Registro exitoso"
        regVendedor.value={
                documento:"",
                cuenta:{cuenta:""},
                nombreApellido:"",
                correo:"",
                celular:"",
                direccion:"",
                }


    }catch(error)
    {
        mensaje.value= error.mensaje

        Swal.fire({
            title: "Error",
            text: "Error actualizando Vendedor",
            icon: "error",
            confirmButtonText: "Error"
        })
    }
}
</script>