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
            <form @submit.prevent="actualizaProducto">
                <div>
                    <label for="">Id Producto</label> 
                    <input type="text" v-model="regProducto.productoId.producto" disabled>
                </div>
                <div>
                    <label for="">Id Cuenta</label> 
                    <input type="text" v-model="regProducto.productoId.cuenta.cuenta" disabled>
                </div>
                <div>
                    <label for="">Nombre Producto</label> 
                    <input type="text" v-model="regProducto.nombreProducto">
                </div>
                <div>
                    <label for="">Categoria Producto</label> 
                    <input type="text" v-model="regProducto.categoriaProducto">
                </div>
                <div>
                    <label for="">Cantidad Producto</label> 
                    <input type="text" v-model="regProducto.cantidadProducto">
                </div>
                <div>
                    <label for="">Precio Producto</label> 
                    <input type="text" v-model="regProducto.precioProducto">
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

const actualizaProducto=async()=>{
    //alert("Actualizando")
    const nuevoObj = ref({
                    "productosEmbeddable":{
                        "producto": regProducto.value.productoId.producto,
                            "cuenta": {
                                "cuenta": regProducto.value.productoId.cuenta.cuenta
                            }
                    },
                    "productos":{
                        "productoId": {
                                "producto": regProducto.value.productoId.producto,
                                "cuenta": {
                                    "cuenta": regProducto.value.productoId.cuenta.cuenta
                                }
                            },
                        "nombreProducto": regProducto.value.nombreProducto,
                        "categoriaProducto": regProducto.value.categoriaProducto,
                        "cantidadProducto": regProducto.value.cantidadProducto,
                        "precioProducto": regProducto.value.precioProducto
                    }	
                })

    try{
        const datosProducto=await fetch("http://localhost:8080/productos",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(nuevoObj.value)
        })
    
        if (!datosProducto.ok){
            throw new error("Error al actualizar Producto")
        }

        Swal.fire({
            title: "Registro ok",
            text: "Ha actualizado Producto de forma correcta",
            icon: "success",
            confirmButtonText: "Aceptar"
        })

        mensaje.value="Registro exitoso"
        regProducto.value={
                            "productosEmbeddable":{
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


    }catch(error)
    {
        mensaje.value= error.mensaje

        Swal.fire({
            title: "Error",
            text: "Error actualizando Producto",
            icon: "error",
            confirmButtonText: "Error"
        })
    }
}
</script>