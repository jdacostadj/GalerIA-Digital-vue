<template>
    <MiHeader></MiHeader>

    <fieldset>
      
      <form @submit.prevent="buscaProducto">
            <label for="">Id Producto</label>
            <input type="text" v-model="frm.producto" required>
            <label for="">Id Cuenta</label>
            <input type="text" v-model="frm.cuenta.cuenta" required>
            <button type="submit">Buscar Producto</button>
        </form>
    
      <div>{{ mensaje }}</div>
    
      <section v-if="regProducto">
          <label for="">Id Producto</label> <div>{{ regProducto.productoId.producto }}</div>
          <label for="">Id Cuenta</label> <div>{{ regProducto.productoId.cuenta.cuenta }}</div>
          <label for="">Nombre Producto</label> <div>{{ regProducto.nombreProducto }}</div>
          <label for="">Categoria Producto</label> <div>{{ regProducto.categoriaProducto }}</div>
          <label for="">Cantidad Producto</label> <div>{{ regProducto.cantidadProducto }}</div>
          <label for="">Precio Producto</label> <div>{{ regProducto.precioProducto }}</div>
      
          <button @click="eliminaProducto">Elimina Producto</button>
      </section> 

    </fieldset>

</template>

<script setup>
import MiHeader from '@/components/MiHeader.vue';
import { ref } from 'vue';

const producto=ref("")
const cuenta=ref("")
const regProducto=ref(null)
const mensaje=ref(null)

const frm= ref({
    producto:"",
    cuenta:{cuenta:""}
    })

const buscaProducto=async()=>{
    //alert("consultando")
    try{
        const datosProducto=await fetch("http://localhost:8080/productos/id",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(frm.value)
        })
        
        if(!datosProducto.ok){
            throw new Error ("No se encuentra Producto")
        }
  
        regProducto.value=await datosProducto.json()
        
    }catch{
        mensaje.value=error.mensaje
    }

}

const eliminaProducto =async ()=>{
    //alert("Eliminar")

    try{
        const eliminaProducto =await fetch("http://localhost:8080/productos",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(frm.value)
        })
        
        if(!eliminaProducto.ok){
            throw new Error ("No se pudo eliminar Producto")
        }
        mensaje.value=("Producto eliminada")
    }catch{
        mensaje.value=error.mensaje
    }
    regProducto.value={"productosEmbeddable":{
                          "producto": "",
                              "cuenta": {
                                  "cuenta": ""
                              }
                      },
                      "productos":{
                          "productoId": {
                                  "producto": "",
                                  "cuenta": {
                                      "cuenta": ""
                                  }
                              },
                          "nombreProducto": "",
                          "categoriaProducto": "",
                          "cantidadProducto": "",
                          "precioProducto": ""
                      }	
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