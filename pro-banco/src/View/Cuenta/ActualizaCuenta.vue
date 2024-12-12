<template>

    <MiHeader></MiHeader>

    
    <fieldset>
        <form @submit.prevent="buscaCuenta">
            <label for="">Id Cuenta</label>
            <input type="text" v-model="cuenta" required>
            <button type="submit">Buscar cuenta</button>
        </form>

        <div>{{ mensaje }}</div>

        <section v-if="regCuenta">
            <form @submit.prevent="actualizaCuenta">
                <div>
                    <label for="">Cuenta</label> 
                    <input type="text" v-model="regCuenta.cuenta" disabled>
                </div>
                <div>
                    <label for="">Contraseña</label> 
                    <input type="text" v-model="regCuenta.contrasena">
                </div>
                <div>
                    <label for="">Rol</label> 
                    <input type="text" v-model="regCuenta.rol">
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

const cuenta=ref("")
const regCuenta=ref(null)
const mensaje=ref(null)


const buscaCuenta=async()=>{
    alert("consultando")
    try{
        const datosCuenta=await fetch(`http://localhost:8080/cuenta/${cuenta.value}`,{
            method:"GET"
        })
        console.log(datosCuenta)
        if(!datosCuenta.ok){
            throw new Error ("No se encuentra cuenta")
        }
    
        regCuenta.value=await datosCuenta.json()
        //mensaje.value=("Consulta ok")
    }catch{
        mensaje.value=error.mensaje
    }

}

const actualizaCuenta=async()=>{
    alert("Actualizando")
    try{
        const datosCuenta=await fetch(`http://localhost:8080/cuenta/${cuenta.value}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(regCuenta.value)
        })
    
        if (!datosCuenta.ok){
            throw new error("Error al actualizar cuenta")
        }

        Swal.fire({
            title: "Registro ok",
            text: "Ha actualizado cuenta de forma correcta",
            icon: "success",
            confirmButtonText: "Aceptar"
        })

        mensaje.value="Registro exitoso"
        regCuenta.value={cuenta:"", contrasena:"", rol:""}


    }catch(error)
    {
        mensaje.value= error.mensaje

        Swal.fire({
            title: "Error",
            text: "Error actualizando cuenta",
            icon: "error",
            confirmButtonText: "Error"
        })
    }
}
</script>