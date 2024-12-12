<template>

    <MiHeader></MiHeader>

    <fieldset>

        <label for="">Crear cuenta</label>

        <form @submit.prevent="insertaCuenta">
            <div>
                <label for="Id Cuenta">Id cuenta</label>
                <input type="text" v-model="frm.cuenta" required>
            </div>
            <div>
                <label for="Contrasena">Contraseña</label>
                <input type="text" v-model="frm.contrasena" required>
            </div>
            <div>
                <label for="Rol de cuenta">Rol</label>
                <input type="text" v-model="frm.rol" required>
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
    cuenta:"",
    contrasena:"",
    rol:""
})

const mensaje = ref("")
const insertaCuenta = async ()=> {
    
    try{
        const respuesta= await fetch("http://localhost:8080/cuenta",
        {
        method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(frm.value)
        })

        console.log(respuesta)

        if(!respuesta.ok){
            throw new Error("No se ha podido crear cuenta (InsertaCuenta)")
        }

        Swal.fire({
            title: "Registro ok",
            text: "Ha creado cuenta de forma correcta",
            icon: "success",
            confirmButtonText: "Aceptar"
        })

        mensaje.value="Registro exitoso"
        frm.value={cuenta:"", contrasena:"", rol:""}

    }catch(error){
        mensaje.value= error.mensaje
        
        Swal.fire({
            title: "Error",
            text: "Error creando cuenta",
            icon: "error",
            confirmButtonText: "Error"
        })
    }
}

</script>