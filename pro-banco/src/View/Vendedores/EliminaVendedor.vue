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
          <label for="">Documento</label> <div>{{ regVendedor.documento }}</div>
          <label for="">Cuenta</label> <div>{{ regVendedor.cuenta.cuenta }}</div>
          <label for="">Nombre Completo</label> <div>{{ regVendedor.nombreApellido }}</div>
          <label for="">Correo</label> <div>{{ regVendedor.correo }}</div>
          <label for="">Celular</label> <div>{{ regVendedor.celular }}</div>
          <label for="">Direccion</label> <div>{{ regVendedor.direccion }}</div>
      
          <button @click="eliminaVendedor">Elimina Vendedor</button>
      </section> 

    </fieldset>

</template>

<script setup>
import MiHeader from '@/components/MiHeader.vue';
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

const eliminaVendedor =async ()=>{
    alert("Eliminar")

    try{
        const eliminaVendedor =await fetch(`http://localhost:8080/vendedores/${documento.value}`,{
            method:"DELETE"
        })
        
        if(!eliminaVendedor.ok){
            throw new Error ("No se pudo eliminar Vendedor")
        }
        mensaje.value=("Vendedor eliminado")
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