<template>
    <MiHeader></MiHeader>

    <fieldset>
        <form @submit.prevent="buscaVenta">
            <label for="">Id Factura</label>
            <input type="text" v-model="frm.factura" required>
            <label for="">Id Producto</label>
            <input type="text" v-model="frm.productoId.productoId.producto" required>
            <label for="">Id Cuenta Vendedor</label>
            <input type="text" v-model="frm.productoId.productoId.cuenta.cuenta" required>
            
            <button type="submit">Buscar Venta</button>
        </form>
    
      <div>{{ mensaje }}</div>
    
      <section v-if="regVenta">
          <label for="">Id factura</label> <div>{{ regVenta.ventaId.factura }}</div>
          <label for="">Id Producto</label> <div>{{ regVenta.ventaId.productoId.productoId.producto }}</div>
          <label for="">Id Cuenta Vendedor</label> <div>{{ regVenta.ventaId.productoId.productoId.cuenta.cuenta }}</div>
          <label for="">Nombre de producto</label> <div>{{ regVenta.nombreProducto }}</div>
          <label for="">Cantidad de producto (L)</label> <div>{{ regVenta.cantidadProducto }}</div>
          <label for="">Cedula</label> <div>{{ regVenta.compradores.documento }}</div>
          <label for="">Total</label> <div>{{ regVenta.totalVenta }}</div>
      
          <button @click="eliminaVenta">Elimina Venta</button>
      </section> 

    </fieldset>

</template>

<script setup>
import MiHeader from '@/components/MiHeader.vue';
import { ref } from 'vue';

const documento=ref("")
const regVenta=ref(null)
const mensaje=ref(null)

const frm= ref({
		factura: "",
        productoId: {
            productoId:{
                producto: "",
                cuenta: {
                    cuenta: ""
                }
            }
        }
	})


const buscaVenta=async()=>{
    //alert("consultando")
    try{
        const datosVenta=await fetch("http://localhost:8080/ventas/id",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(frm.value)
        })
        console.log(datosVenta)
        if(!datosVenta.ok){
            throw new Error ("No se encuentra Comprador")
        }
    
        regVenta.value=await datosVenta.json()
        //mensaje.value=("Consulta ok")
    }catch{
        mensaje.value=error.mensaje
    }

}


const eliminaVenta =async ()=>{
    //alert("Eliminar")

    try{
        const eliminaVenta =await fetch("http://localhost:8080/ventas",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(frm.value)
        })
        
        if(!eliminaVenta.ok){
            throw new Error ("No se pudo eliminar Venta")
        }
        mensaje.value=("Venta eliminado")
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
  background-color: rgba(0, 255, 76, 0.571); /* Azul más oscuro al pasar el mouse */
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