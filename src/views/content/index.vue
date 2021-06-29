<template>
  <div class="center-board">
    <div class="action-bar">
      <a href="javascript:;" @click="clearAll">清除全部</a>
      <a href="javascript:;" class="ml-10" @click="makeCode">运行</a>
    </div>
    <div class="center-scrollbar">
      <draggable v-model="list" class="drawing-board" :group="{ name: 'form', pull: true, put: true }" item-key="id" :animation="300">
        <template #item="{ element }">
          <draggableItem :currentItem="element"/>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import draggableItem from '@/components/draggableItem/index.jsx'
import {ref, watch, watchEffect, toRaw, useContext, inject} from "vue"
import eventBus from '@/utils/eventBus'
import {findNode} from '@/utils/index'

const mainState = inject('mainStore')
const list = ref([])

eventBus.$on('action', event => {
  const {unitKey} = event
  mainState.controls = findNode(unitKey, list.value)
})
const clearAll = () => {
  list.value = []
}
const makeCode = () => {
  mainState.showDrawer = true
  mainState.makeData = list
}
</script>
