<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/cuenta">Cuenta</router-link></li>
            <li><router-link to="/compradores">Compradores</router-link></li>
            <li><router-link to="/vendedores">Vendedores</router-link></li>
            <li><router-link to="/productos">Productos</router-link></li>
            <li><router-link to="/ventas">Ventas</router-link></li>
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