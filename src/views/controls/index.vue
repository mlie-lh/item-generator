<template>
  <div class="right-board">
    <a-tabs v-model:activeKey="currentTab">
      <a-tab-pane key="1" tab="组件属性">
        <div class="board-pane">
          <a-form :model="form" :labelCol="{span: 6}" :wrapperCol="{span: 18}">
            <a-form-item v-if="form.label !== undefined" label="标签名:">
              <a-input v-model:value="form.label"/>
            </a-form-item>
            <a-form-item v-if="form.placeholder !== undefined" label="占位:">
              <a-input v-model:value="form.placeholder"/>
            </a-form-item>
            <a-form-item v-if="form.disabled !== undefined" label="是否禁用:">
              <a-switch v-model:checked="form.disabled"/>
            </a-form-item>
            <a-form-item v-if="form.required !== undefined" label="是否必填:">
              <a-switch v-model:checked="form.required"/>
            </a-form-item>
          </a-form>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="表单属性">表单属性</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import {inject, watch, ref, reactive} from "vue"

const mainState = inject('mainStore')
const formData = reactive({
  form: {}
})
const form = ref({})
watch(() => mainState.controls, (nVal) => {
  form.value = nVal
})
const currentTab = ref('1')
</script>

<style scoped lang="less">
.board-pane {
  padding: 0 20px;
}
</style>
