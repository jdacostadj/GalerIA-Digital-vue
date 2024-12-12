<template>
    <header>
     <div class="logotitulo">
        <h1>GalerIA</h1>
        <img src="../../public/Imagenes/GalerIA.png" alt="GalerIA">
        </div>
        
        <!-- MiNavBar solo se muestra cuando la ruta es "/" -->
        <MiNavBar v-if="route.path === '/'" />
        <MiNavBarCuenta v-if="route.path.includes('/cuenta')" />
        <MiNavBarCompradores v-if="route.path.includes('/compradores')" />
        <MiNavBarVendedores v-if="route.path.includes('/vendedores')" />   
        <MiNavBarProductos v-if="route.path.includes('/productos')" />   
        <MiNavBarVentas v-if="route.path.includes('/ventas')" />   

    </header>
</template>

<script setup>
    import MiNavBar from './MiNavBar.vue';
    import MiNavBarCuenta from './MiNavBarCuenta.vue';
    import MiNavBarCompradores from './MiNavBarCompradores.vue';
    import MiNavBarVendedores from './MiNavBarVendedores.vue';
    import MiNavBarProductos from './MiNavBarProductos.vue';
    import MiNavBarVentas from './MiNavBarVentas.vue';
    
    import { useRoute } from 'vue-router';

    const route = useRoute();
    console.log(route.path); // Obtienes la ruta actual

</script>

<style>
    header{
      background:rgb(210, 218, 200) ;
       display: flex;
       height: 200px;

    }
    h1{
        background-color: 0;
        display: flex;
        align-items: center;
        margin-left: 20px;
        color: #fff;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
    .logotitulo{
      display: flex;  
      align-items: center;
      justify-content: center;
      flex-direction: row;
      background: 0; 
    }
    img{
        background-size: contain;
        width: 150px;
        height: 110px;   
    }
    nav{
        background-color:0;
        margin-left: auto;
        width: 40%;
        display: flex;
        align-items: center;
    }
    ul{
        background-color: 0;
    }
    li{
        background-color:rgba(255,255,255,0.2);
        display: inline;
        margin-right: 10px;
        padding: 20px;
        border-radius: 10px;
    }
    a{
        text-decoration: none;
        color: #05d6fa;
        font-size: 18px;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    }

    #contenedor1{
        background-color: 0;
        display: flex;
        flex-wrap: nowrap;
    }

    .art{
        background-color: rgb(6, 124, 228);
        height: 100%;
        width: 40%;
        margin: 10px;
    }
    #contenedor2{
        background: red;
        height: 600px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
    }
    .div{
        height: 200px;
        background: blue;
        margin: 2px;
        width: 30% ;
    }


</style>