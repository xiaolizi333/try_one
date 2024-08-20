<template>
  <RouterView v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </RouterView>
</template>

<script setup>

</script>

<style>


</style>
