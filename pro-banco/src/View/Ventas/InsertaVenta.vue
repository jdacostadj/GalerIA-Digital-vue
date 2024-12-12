<template>

    <MiHeader></MiHeader>

    <fieldset>

        <label for="">Crear Venta</label>

        <form @submit.prevent="insertaVenta">
            <div>
                <label for="Codigo documento">Id factura</label>
                <input type="text" v-model="frm.ventaId.factura" required>
            </div>
            <div>
                <label for="Cuenta">Id Producto</label>
                <input type="text" v-model="frm.ventaId.productoId.productoId.producto" required>
            </div>
            <div>
                <label for="Nombre Completo">Id Cuenta Vendedor</label>
                <input type="text" v-model="frm.ventaId.productoId.productoId.cuenta.cuenta" required>
            </div>
            <div>
                <label for="Correo">Nombre de producto</label>
                <input type="text" v-model="frm.nombreProducto" required>
            </div>
            <div>
                <label for="Celular">Cantidad de producto (L)</label>
                <input type="text" v-model="frm.cantidadProducto" required>
            </div>
            <div>
                <label for="Direccion">Cedula Comprador</label>
                <input type="text" v-model="frm.compradores.documento" required>
            </div>
            <div>
                <label for="Direccion">Total</label>
                <input type="text" v-model="frm.totalVenta" required>
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
    ventaId:{
		factura: "",
        productoId: {
            productoId:{
                producto: "",
                cuenta: {
                    cuenta: ""
                }
            }
        }
	},
    nombreProducto: "",
    cantidadProducto: "",
    compradores:{
        documento: ""
    },
    totalVenta: ""
})

const mensaje = ref("")
const insertaVenta = async ()=> {
    
    try{
        const respuesta= await fetch("http://localhost:8080/ventas",
        {
        method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(frm.value)
        })

        console.log(respuesta)

        if(!respuesta.ok){
            throw new Error("No se ha podido crear venta (InsertaVenta)")
        }

        Swal.fire({
            title: "Registro ok",
            text: "Ha creado venta de forma correcta",
            icon: "success",
            confirmButtonText: "Aceptar"
        })

        mensaje.value="Registro exitoso"
        frm.value={
                    ventaId:{
                		factura: "",
                        productoId: {
                            productoId:{
                                producto: "",
                                cuenta: {
                                    cuenta: ""
                                }
                            }
                        }
                	},
                    nombreProducto: "",
                    cantidadProducto: "",
                    compradores:{
                        documento: ""
                    },
                    totalVenta: ""
                }

    }catch(error){
        mensaje.value= error.mensaje
        
        Swal.fire({
            title: "Error",
            text: "Error creando venta",
            icon: "error",
            confirmButtonText: "Error"
        })
    }
}

</script>.