<template>

    <MiHeader></MiHeader>

    <fieldset>

        <label for="">Inserta Productos</label>

        <form @submit.prevent="insertaProducto">
            <div>
                <label for="Id Producto">ID producto</label>
                <input type="text" v-model="frm.productoId.producto" required>
            </div>
            <div>
                <label for="Cuenta">Cuenta</label>
                <input type="text" v-model="frm.productoId.cuenta.cuenta" required>
            </div>
            <div>
                <label for="Nombre Producto">Nombre Producto</label>
                <input type="text" v-model="frm.nombreProducto" required>
            </div>
            <div>
                <label for="Categoria Producto">Categoria Producto</label>
                <input type="text" v-model="frm.categoriaProducto" required>
            </div>
            <div>
                <label for="Cantidad Producto">Cantidad Producto</label>
                <input type="text" v-model="frm.cantidadProducto" required>
            </div>
            <div>
                <label for="Precio Producto">Precio Producto</label>
                <input type="text" v-model="frm.precioProducto" required>
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
    productoId:{producto:"",
                cuenta:{cuenta:""}},
    nombreProducto:"",
    categoriaProducto:"",
    cantidadProducto:"",
    precioProducto:"",
})

const mensaje = ref("")
const insertaProducto = async ()=> {
    
    try{
        const respuesta= await fetch("http://localhost:8080/productos",
        {
        method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(frm.value)
        })

        console.log(respuesta)

        if(!respuesta.ok){
            throw new Error("No se ha podido crear Producto (InsertaProducto)")
        }

        Swal.fire({
            title: "Registro ok",
            text: "Ha creado Producto de forma correcta",
            icon: "success",
            confirmButtonText: "Aceptar"
        })

        mensaje.value="Registro exitoso"
        frm.value={
                productoId:{producto:"",
                            cuenta:{cuenta:""}},
                nombreProducto:"",
                categoriaProducto:"",
                cantidadProducto:"",
                precioProducto:"",
}

    }catch(error){
        mensaje.value= error.mensaje
        
        Swal.fire({
            title: "Error",
            text: "Error creando producto",
            icon: "error",
            confirmButtonText: "Error"
        })
    }
}

</script>.