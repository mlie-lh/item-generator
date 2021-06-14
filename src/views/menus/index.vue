<template>
  <div class="left-board">
    <div class="logo-wrapper"></div>
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

<style scoped lang="less">
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.components-title {
  font-size: 14px;
  color: #222;
  margin: 6px 2px;

  .svg-icon {
    color: #666;
    font-size: 18px;
  }
}

.left-board {
  width: 260px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;

  .logo-wrapper {
    position: relative;
    height: 45px;
    background: #fff;
    border-bottom: 1px solid #f1e8e8;
    box-sizing: border-box;
  }
}

.components-list {
  padding: 8px;
  box-sizing: border-box;

  .components-item {
    display: inline-block;
    width: 48%;
    margin: 1%;
    transition: transform 0ms !important;

    .components-body {
      padding: 8px 10px;
      background: #f6f7ff;
      font-size: 12px;
      cursor: move;
      border: 1px dashed #f6f7ff;
      border-radius: 3px;
      user-select: none;

      .svg-icon {
        color: #777;
        font-size: 15px;
      }

      &:hover {
        border: 1px dashed #787be8;
        color: #787be8;

        .svg-icon {
          color: #787be8;
        }
      }
    }
  }
}
</style>
