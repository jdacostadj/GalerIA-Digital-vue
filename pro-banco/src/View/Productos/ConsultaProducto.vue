<template>
    <MiHeader></MiHeader>
    <div v-if="cargaDatos">Cargando Datos</div>
    <h1>Consultar Productos</h1>
    <table>
        <tr>
            <th>Id Producto</th>
            <th>Id Cuenta</th>
            <th>Nombre Producto</th>
            <th>Categoria Producto</th>
            <th>Cantidad Producto</th>
            <th>Precio Producto</th>
        </tr>

        <tr v-for="(item, index) in data" :key="index">
            <td>{{ item.productoId.producto }}</td>
            <td>{{ item.productoId.cuenta.cuenta }}</td>
            <td>{{ item.nombreProducto }}</td>
            <td>{{ item.categoriaProducto }}</td>
            <td>{{ item.cantidadProducto }}</td>
            <td>{{ item.precioProducto }}</td>
        </tr>
    </table>
</template>

<script setup>
    import MiHeader from '@/components/MiHeader.vue';
    import { ref, onMounted } from 'vue';
    const data = ref([])
    const cargaDatos = ref(true)
    const mensaje = ref(null)

    const consultaDatosProducto=async()=>{
        try{
            const respuesta = await fetch("http://localhost:8080/productos")

            if (!respuesta.ok){
                throw new error("Datos no existentes")
            }
            data.value= await respuesta.json()
        }catch(error){
            mensaje.value= error.mensaje
        }finally{
            cargaDatos.value= false
        }
    }

    onMounted(()=>{
        consultaDatosProducto()

    })
</script>

<style>
    h1{
    color: #1f90a916;
    margin: auto;
    font-size: 25px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 50%;
    text-align: center;
    }
    table {
    border-collapse: collapse;
    width: 50%;
    margin: auto;
    }
    th, td {
    border: 2px solid #091258;
    padding: 8px;
    text-align: left;
    }
    th {
    background-color: #1f90a9;
    font-weight: bold;
    }
</style>