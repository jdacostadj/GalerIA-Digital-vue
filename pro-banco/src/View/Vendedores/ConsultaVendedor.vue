<template>
    <MiHeader></MiHeader>
    <div v-if="cargaDatos">Cargando Datos</div>
    <h1>Consultar Vendedores</h1>
    <table>
        <thead>
            <tr>
                <th>Cod Docum</th>
                <th>Cuenta</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Celular</th>
                <th>Dirección</th>
            </tr>
        </thead>

        <tr v-for="(item, index) in data" :key="index">
            <td>{{ item.documento 	  }}</td>
            <td>{{ item.cuenta.cuenta }}</td>
            <td>{{ item.nombreApellido}}</td>
            <td>{{ item.correo 		  }}</td>
            <td>{{ item.celular		  }}</td>
            <td>{{ item.direccion 	  }}</td>
        </tr>
    </table>
</template>

<script setup>
    import MiHeader from '@/components/MiHeader.vue';
    import { ref, onMounted } from 'vue';
    const data = ref([])
    const cargaDatos = ref(true)
    const mensaje = ref(null)

    const consultaDatosVendedores=async()=>{
        try{
            const respuesta = await fetch("http://localhost:8080/vendedores")

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
        consultaDatosVendedores()

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