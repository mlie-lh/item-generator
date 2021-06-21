<template>
  <div class="left-board">
    <div class="logo-wrapper">
      <a href="https://mlielh.com/lab" target="_Blank">lab</a>
    </div>
    <div class="components-list">
      <div>
        <div class="components-title" v-for="(item,index) in leftComponents">
          {{ item.title }}
          <draggable class="dragArea list-group" v-model="item.list"
                     ghostClass="ghost"
                     :group="{ name: 'form', pull: 'clone', put: false }"
                     :sort="false"
                     :clone="clone"
                     :start="start"
                     :move="move"
                     :onEnd="end"
                     item-key="id"
          >
            <template #item="{ element }">
              <div class="components-item">
                <div class="components-body">
                  {{ element.__config__.label }}
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, inject} from "vue";
import {inputComponents} from '@/config/generator/config'
import {UUID, deepClone} from "@/utils";

const leftComponents = [
  {
    title: '输入型组件',
    list: inputComponents
  }
]
const mainStore = inject('mainStore')

function initItemParams(item) {
  const unitKey = `${item.__config__.type}-${UUID()}`
  return deepClone({...item, unitKey})
}

const clone = e => {
  // console.log('clone', e)
  return initItemParams(e)
}
const start = e => {
  // console.log('start', e)
}
const move = e => {
  // console.log('move', e)
}
const end = e => {
}
</script>
<style lang="less">
.logo-wrapper{
  padding: 0 20px;
  display: flex;
  align-items: center;
}
</style>