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
          <label for="">Cuenta</label> <div>{{ regCuenta.cuenta }}</div>
          <label for="">Contraseña</label> <div>{{ regCuenta.contrasena }}</div>
          <label for="">Rol</label> <div>{{ regCuenta.rol }}</div>
      
          <button @click="eliminaCuenta">Elimina cuenta</button>
      </section> 

    </fieldset>

</template>

<script setup>
import MiHeader from '@/components/MiHeader.vue';
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

const eliminaCuenta =async ()=>{
    alert("Eliminar")

    try{
        const eliminaCuenta =await fetch(`http://localhost:8080/cuenta/${cuenta.value}`,{
            method:"DELETE"
        })
        
        if(!eliminaCuenta.ok){
            throw new Error ("No se pudo eliminar cuenta")
        }
        mensaje.value=("Cuenta eliminada")
    }catch{
        mensaje.value=error.mensaje
    }
}
</script>


<style>
    fieldset {
      border: 0;
      margin-top: 50px;
      border-radius: 5px;
      padding: 20px;
      max-width: 500px;
      margin: auto;
      background-color: #FFFFFFFF; /* Azul muy claro para el fondo */
      width: 70%;
      padding: 30px;
      overflow-x: auto;
      box-shadow: 0 30px 50px rgba(0, 0, 0, 0.5), 
                  0 10px 30px rgba(0, 0, 0, 0.3), 
                  0 5px  15px rgba(0, 0, 0, 0.2);
     transition: transform 0.3s ease, box-shadow 0.3s ease;
    } 
    section{
      display: flex;
      flex-direction: column;
      gap: 15px;
      justify-content: center;  /* Centra verticalmente */
      align-items: center;      /* Centra horizontalmente */
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    div {
      display: flex;
      flex-direction: column;
    }
    label {
      color: #071f24; /* Azul fuerte */
      font-weight: bold;
      margin-bottom: 5px;
    }
    div[v-if] {
      margin-top: 10px;
      color: #00ad31; /* Azul fuerte para el mensaje */
      font-weight: bold;
      text-align: center;
    }
    button {
      background-color: rgb(0, 44, 10); /* Azul para el botón */
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #0BE6F6FF; /* Azul más oscuro al pasar el mouse */
    }
    
    input {
    
    border:1 solid green;
    padding: 8px;
    font-size: 1rem;
    margin-bottom: 20px;
    outline: none;
    transition: border-color 0.3s;
  }
  input:focus {
    border-color: #00ad11; /* Azul más oscuro al enfocar */
  }
</style>