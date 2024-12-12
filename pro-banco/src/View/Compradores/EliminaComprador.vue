<template>
    <MiHeader></MiHeader>

    <fieldset>
      <form @submit.prevent="buscaComprador">
          <label for="">Id Comprador</label>
          <input type="text" v-model="documento" required>
          <button type="submit">Buscar Comprador</button>
      </form>
    
      <div>{{ mensaje }}</div>
    
      <section v-if="regComprador">
          <label for="">Documento</label> <div>{{ regComprador.documento }}</div>
          <label for="">Cuenta</label> <div>{{ regComprador.cuenta.cuenta }}</div>
          <label for="">Nombre Completo</label> <div>{{ regComprador.nombreApellido }}</div>
          <label for="">Correo</label> <div>{{ regComprador.correo }}</div>
          <label for="">Celular</label> <div>{{ regComprador.celular }}</div>
          <label for="">Direccion</label> <div>{{ regComprador.direccion }}</div>
      
          <button @click="eliminaComprador">Elimina comprador</button>
      </section> 

    </fieldset>

</template>

<script setup>
import MiHeader from '@/components/MiHeader.vue';
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

const eliminaComprador =async ()=>{
    alert("Eliminar")

    try{
        const eliminaComprador =await fetch(`http://localhost:8080/compradores/${documento.value}`,{
            method:"DELETE"
        })
        
        if(!eliminaComprador.ok){
            throw new Error ("No se pudo eliminar Comprador")
        }
        mensaje.value=("Comprador eliminado")
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
      color: #004aad; /* Azul fuerte */
      font-weight: bold;
      margin-bottom: 5px;
    }
    div[v-if] {
      margin-top: 10px;
      color: #004aad; /* Azul fuerte para el mensaje */
      font-weight: bold;
      text-align: center;
    }
    button {
      background-color: #00002CFF; /* Azul para el botón */
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
    border-color: #004aad; /* Azul más oscuro al enfocar */
  }
</style>