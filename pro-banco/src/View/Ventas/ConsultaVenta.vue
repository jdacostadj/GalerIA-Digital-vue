<template>
    <MiHeader></MiHeader>
    <div v-if="cargaDatos">Cargando Datos</div>
    <h1>Consultar Ventas</h1>
    <table>
        <thead>
            <tr>
                <th>Id factura</th>
                <th>Id Producto</th>
                <th>Id Cuenta Vendedor</th>
                <th>Nombre de producto</th>
                <th>Cantidad de producto</th>
                <th>Cedula Comprador</th>
                <th>Total</th>
            </tr>
        </thead>

        <tr v-for="(item, index) in data" :key="index">
            <td>{{ item.ventaId.factura 	  }}</td>
            <td>{{ item.ventaId.productoId.productoId.producto }}</td>
            <td>{{ item.ventaId.productoId.productoId.cuenta.cuenta}}</td>
            <td>{{ item.nombreProducto 		  }}</td>
            <td>{{ item.cantidadProducto		  }}</td>
            <td>{{ item.compradores.documento 	  }}</td>
            <td>{{ item.totalVenta 	  }}</td>
        </tr>
    </table>
</template>

<script setup>
    import MiHeader from '@/components/MiHeader.vue';
    import { ref, onMounted } from 'vue';
    const data = ref([])
    const cargaDatos = ref(true)
    const mensaje = ref(null)

    const consultaDatosVentas=async()=>{
        try{
            const respuesta = await fetch("http://localhost:8080/ventas")

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
        consultaDatosVentas()

    })
</script>

<style>
    h1{
    color: #071f24;
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
    border: 2px solid #002104;
    padding: 8px;
    text-align: left;
    }
    th {
    background-color: #00580489;
    font-weight: bold;
    }
</style>