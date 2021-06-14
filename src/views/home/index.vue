<template>
  <div class="container">
    <menus />
    <content />
    <controls />
  </div>
</template>

<script setup>
import controls from '../controls/index.vue'
import content from '../content/index.vue'
import menus from '../menus/index.vue'
</script>

<style scoped lang="less">
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
