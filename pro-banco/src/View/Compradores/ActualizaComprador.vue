<template>
    <MiHeader></MiHeader>
    
    <fieldset>
        <form @submit.prevent="buscaComprador">
            <label for="">Id Comprador</label>
            <input type="text" v-model="documento" required>
            <button type="submit">Buscar comprador</button>
        </form>

        <div>{{ mensaje }}</div>

        <section v-if="regComprador">
            <form @submit.prevent="actualizaComprador">
                <div>
                    <label for="">Documento</label> 
                    <input type="text" v-model="regComprador.documento" disabled>
                </div>
                <div>
                    <label for="">Cuenta</label> 
                    <input type="text" v-model="regComprador.cuenta.cuenta" disabled>
                </div>
                <div>
                    <label for="">Nombre Completo</label> 
                    <input type="text" v-model="regComprador.nombreApellido">
                </div>
                <div>
                    <label for="">Correo</label> 
                    <input type="text" v-model="regComprador.correo">
                </div>
                <div>
                    <label for="">Celular</label> 
                    <input type="text" v-model="regComprador.celular">
                </div>
                <div>
                    <label for="">Direccion</label> 
                    <input type="text" v-model="regComprador.direccion">
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
const regComprador=ref(null)
const mensaje=ref(null)


const buscaComprador=async()=>{
    alert("consultando")
    try{
        const datosComprador=await fetch(`http://localhost:8080/compradores/${documento.value}`,{
            method:"GET"
        })
        console.log(datosComprador)
        if(!datosComprador.ok){
            throw new Error ("No se encuentra Comprador")
        }
    
        regComprador.value=await datosComprador.json()
        //mensaje.value=("Consulta ok")
    }catch{
        mensaje.value=error.mensaje
    }

}

const actualizaComprador=async()=>{
    alert("Actualizando")
    try{
        const datosComprador=await fetch(`http://localhost:8080/compradores/${documento.value}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(regComprador.value)
        })
    
        if (!datosComprador.ok){
            throw new error("Error al actualizar Comprador")
        }

        Swal.fire({
            title: "Registro ok",
            text: "Ha actualizado Comprador de forma correcta",
            icon: "success",
            confirmButtonText: "Aceptar"
        })

        mensaje.value="Registro exitoso"
        regComprador.value={
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
            text: "Error actualizando comprador",
            icon: "error",
            confirmButtonText: "Error"
        })
    }
}
</script>