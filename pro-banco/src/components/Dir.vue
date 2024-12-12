<template>
    <div v-for="(items,index) in datos" :key="index">
        <li>{{ items }}</li>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    let datos= ref(["Luis","Ana","Lina"])

</script>