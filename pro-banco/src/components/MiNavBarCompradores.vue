<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/compradores/insertar">Registrar Comprador</router-link></li>
            <li><router-link to="/compradores/consultar">Consultar Comprador</router-link></li>
            <li><router-link to="/compradores/actualizar">Actualizar Comprador</router-link></li>
            <li><router-link to="/compradores/borrar">Borrar Comprador</router-link></li>>
        </ul>
    </nav>
</template>

<style scoped>
nav ul {
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
}
nav ul li a {
  text-decoration: none;
  color: rgb(9, 40, 41);
}
nav ul li a:hover {
  text-decoration: underline;
  background-color: rgba(0, 255, 76, 0.571);
}
</style>