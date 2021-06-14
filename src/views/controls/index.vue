<template>
  <div class="right-board">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="组件属性">
        组件属性
      {{mainState}}

      </a-tab-pane>
      <a-tab-pane key="2" tab="表单属性">表单属性</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import {inject, ref} from "vue";
const mainState = inject('mainStore')
const activeKey = ref('1')

</script>
