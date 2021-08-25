<template>
  <div class="drawing-row-item" v-if="currentItem.__config__.tag === 'a-input'" @click="clickItem">
    <span class="component-name">{{currentItem.unitKey}}</span>
    <a-form-item :label="itemConfig.label" :name="itemConfig.name">
      <a-input v-model:value="tagConfig.value"
               :addonAfter="tagConfig.addonAfter"
               :addonBefore="tagConfig.addonBefore"
               :placeholder="tagConfig.placeholder"
               :disabled="tagConfig.disabled"
               :default-value="tagConfig.defaultValue"
               :allow-clear="tagConfig.allowClear"
               :type="tagConfig.type ? tagConfig.type:'input'"
               :maxlength="tagConfig.maxlength"/>
    </a-form-item>
  </div>
  <div class="drawing-row-item" v-if="currentItem.__config__.tag === 'a-row'">
    <span class="component-name">{currentItem.unitKey}</span>
    <draggable :list="currentItem.list" class="drawing-board" :group="{ name: 'form', pull: true, put: true }"
               item-key="id" :animation="300">
      <template #item="{ element }">
        <a-row :align="tagConfig.align" :gutter="tagConfig.gutter" :justify="tagConfig.justify">
          <draggableItem :currentItem="element"/>
        </a-row>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, h, createVNode, Fragment, toRaw, getCurrentInstance} from "vue"

export default defineComponent({
  name: 'draggableItem',
  props: ['currentItem'],
  setup(props, context) {
    const {proxy} = getCurrentInstance()
    const currentItem = props.currentItem
    console.log('currentItem', currentItem)
    const {itemConfig = {}, tagConfig = {}} = currentItem
    const clickItem = event => {
      console.log(event)
      console.log(context)
      event.stopPropagation()
      proxy.$eventBus.$emit('action', currentItem)
    }
    return {
      currentItem, itemConfig, tagConfig, clickItem
    }
  }
})
</script>
<style lang="less">
.drawing-row-item {
  position: relative;
  cursor: move;
  min-height: 80px;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed #ccc;
  border-radius: 3px;
  padding: 10px 3px;
  margin: 10px 0 0;

  .component-name {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    font-size: 10px;
    line-height: 1;
    color: #bbb;
    display: inline-block;
  }
}
</style>