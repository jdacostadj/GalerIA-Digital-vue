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
            <form @submit.prevent="actualizaVenta">
                <div>
                    <label for="">Id factura</label> 
                    <input type="text" v-model="regVenta.ventaId.factura" disabled>
                </div>
                <div>
                    <label for="">Id Producto</label> 
                    <input type="text" v-model="regVenta.ventaId.productoId.productoId.producto" disabled>
                </div>
                <div>
                    <label for="">Id Cuenta Vendedor</label> 
                    <input type="text" v-model="regVenta.ventaId.productoId.productoId.cuenta.cuenta" disabled>
                </div>
                <div>
                    <label for="">Nombre de producto</label> 
                    <input type="text" v-model="regVenta.nombreProducto">
                </div>
                <div>
                    <label for="">Cantidad de producto (L)</label> 
                    <input type="text" v-model="regVenta.cantidadProducto">
                </div>
                <div>
                    <label for="">Cedula Comprador</label> 
                    <input type="text" v-model="regVenta.compradores.documento">
                </div>
                <div>
                    <label for="">Total</label> 
                    <input type="text" v-model="regVenta.totalVenta">
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

const actualizaVenta=async()=>{
    //alert("Actualizando")

    const objNuevo = ref({ventasEmbeddable:{
	                    					factura: regVenta.value.ventaId.factura,
	                    					productoId: {
	                    						productoId:{
	                    							producto: regVenta.value.ventaId.productoId.productoId.producto,
	                    							cuenta: {
	                    								cuenta: regVenta.value.ventaId.productoId.productoId.cuenta.cuenta
	                    							}
	                    						}
	                    					}
	                    					},
	                    ventas:{
	                    		ventaId:{
	                    			factura: regVenta.value.ventaId.factura,
	                    			productoId: {
	                    				productoId:{
	                    					producto: regVenta.value.ventaId.productoId.productoId.producto,
	                    					cuenta: {
	                    						cuenta: regVenta.value.ventaId.productoId.productoId.cuenta.cuenta
	                    					}
	                    				}
	                    			}
	                    		},
	                    		nombreProducto: regVenta.value.nombreProducto,
	                    		cantidadProducto: regVenta.value.cantidadProducto,
	                    		compradores:{
	                    			documento: regVenta.value.compradores.documento
	                    		},
	                    		totalVenta: regVenta.value.totalVenta
	                    		}
                        })

    try{
        const datosVenta=await fetch("http://localhost:8080/ventas",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(objNuevo.value)
        })
    
        if (!datosVenta.ok){
            throw new error("Error al actualizar Venta")
        }

        Swal.fire({
            title: "Registro ok",
            text: "Ha actualizado Venta de forma correcta",
            icon: "success",
            confirmButtonText: "Aceptar"
        })

        mensaje.value="Registro exitoso"
        regVenta.value={ventasEmbeddable:{
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
	                    ventas:{
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
                        }


    }catch(error)
    {
        mensaje.value= error.mensaje

        Swal.fire({
            title: "Error",
            text: "Error actualizando venta",
            icon: "error",
            confirmButtonText: "Error"
        })
    }
}
</script>