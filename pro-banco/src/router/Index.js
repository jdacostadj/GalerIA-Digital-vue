import { createRouter, createWebHistory } from "vue-router";

/*****************************HOME*************************************/
import Home from "@/View/Home.vue"; 
import Cuenta from "@/View/Cuenta/Home.vue";
import Compradores from "@/View/Compradores/Home.vue";
import Vendedores from "@/View/Vendedores/Home.vue";
import Productos from "@/View/Productos/Home.vue";
import Ventas from "@/View/Ventas/Home.vue";
/*****************************CUENTA*************************************/
import InsertaCuenta from "@/View/Cuenta/InsertaCuenta.vue";
import ActualizaCuenta from "@/View/Cuenta/ActualizaCuenta.vue";
import ConsultaCuenta from "@/View/Cuenta/ConsultaCuenta.vue";
import EliminaCuenta from "@/View/Cuenta/EliminaCuenta.vue";
/*****************************COMPRADORES*************************************/
import ConsultaComprador from "@/View/Compradores/ConsultaComprador.vue";
import InsertaComprador from "@/View/Compradores/InsertaComprador.vue";
import ActualizaComprador from "@/View/Compradores/ActualizaComprador.vue";
import EliminaComprador from "@/View/Compradores/EliminaComprador.vue";
/*****************************VENDEDORES*************************************/
import ConsultaVendedor from "@/View/Vendedores/ConsultaVendedor.vue";
import InsertaVendedor from "@/View/Vendedores/InsertaVendedor.vue";
import ActualizaVendedor from "@/View/Vendedores/ActualizaVendedor.vue";
import EliminaVendedor from "@/View/Vendedores/EliminaVendedor.vue";
/*****************************PRODUCTOS*************************************/
import ConsultaProducto from "@/View/Productos/ConsultaProducto.vue";
import InsertaProducto from "@/View/Productos/InsertaProducto.vue";
import ActualizaProducto from "@/View/Productos/ActualizaProducto.vue";
import EliminaProducto from "@/View/Productos/EliminaProducto.vue";
/*****************************VENTAS*************************************/
import ConsultaVenta from "@/View/Ventas/ConsultaVenta.vue";
import InsertaVenta from "@/View/Ventas/InsertaVenta.vue";
import ActualizaVenta from "@/View/Ventas/ActualizaVenta.vue";
import EliminaVenta from "@/View/Ventas/EliminaVenta.vue";

const routes= [
    /*****************************HOME*************************************/
    {
        path:'/',
        name:'home',
        component: Home
    },

    {
        path:'/cuenta',
        name:'Cuenta',
        component: Cuenta
    },

    {
        path:'/compradores',
        name:'Compradores',
        component: Compradores
    },
    
    {
        path:'/vendedores',
        name:'Vendedores',
        component: Vendedores
    },
    
    {
        path:'/productos',
        name:'Productos',
        component: Productos
    },
    
    {
        path:'/ventas',
        name:'Ventas',
        component: Ventas
    },
    /*****************************CUENTA*************************************/
    {
        path:'/cuenta/insertar',
        name:'InsertaCuenta',
        component: InsertaCuenta
    },

    {
        path:'/cuenta/consultar',
        name:'ConsultaCuenta',
        component: ConsultaCuenta
    },

    {
        path:'/cuenta/actualizar',
        name:'ActualizaCuenta',
        component: ActualizaCuenta
    },

    {
        path:'/cuenta/borrar',
        name:'BorraCuenta',
        component: EliminaCuenta
    },
    /*****************************COMPRADORES*************************************/
    {
        path:'/compradores/consultar',
        name:'ConsultaComprador',
        component: ConsultaComprador
    },
    
    {
        path:'/compradores/insertar',
        name:'InsertaComprador',
        component: InsertaComprador
    },
    
    {
        path:'/compradores/actualizar',
        name:'ActualizaComprador',
        component: ActualizaComprador
    },
    
    {
        path:'/compradores/borrar',
        name:'EliminaComprador',
        component: EliminaComprador
    },
    /*****************************VENDEDORES*************************************/
    {
        path:'/vendedores/consultar',
        name:'ConsultaVendedor',
        component: ConsultaVendedor
    },
    
    {
        path:'/vendedores/insertar',
        name:'InsertaVendedor',
        component: InsertaVendedor
    },
    
    {
        path:'/vendedores/actualizar',
        name:'ActualizaVendedor',
        component: ActualizaVendedor
    },
    
    {
        path:'/vendedores/borrar',
        name:'EliminaVendedor',
        component: EliminaVendedor
    },
    /*****************************PRODUCTOS*************************************/
    {
        path:'/productos/consultar',
        name:'ConsultaProducto',
        component: ConsultaProducto
    },
    
    {
        path:'/productos/insertar',
        name:'InsertaProducto',
        component: InsertaProducto
    },
    
    {
        path:'/productos/actualizar',
        name:'ActualizaProducto',
        component: ActualizaProducto
    },
    
    {
        path:'/productos/borrar',
        name:'EliminaProducto',
        component: EliminaProducto
    },
    /*****************************VENTAS*************************************/
    {
        path:'/ventas/consultar',
        name:'ConsultaVenta',
        component: ConsultaVenta
    },
    
    {
        path:'/ventas/insertar',
        name:'InsertaVenta',
        component: InsertaVenta
    },
    
    {
        path:'/ventas/actualizar',
        name:'ActualizaVenta',
        component: ActualizaVenta
    },
    
    {
        path:'/ventas/borrar',
        name:'EliminaVenta',
        component: EliminaVenta
    }
]

const router= createRouter({
    history:createWebHistory(),
    routes
})

export default router