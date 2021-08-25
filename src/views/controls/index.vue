<template>
  <div class="right-board">
    <a-tabs v-model:activeKey="currentTab">
      <a-tab-pane key="1" tab="组件属性">
        <div class="board-pane">
          <a-form :model="form" :labelCol="{span: 6}" :wrapperCol="{span: 18}">
            <div v-if="form.itemConfig">
              <a-divider dashed orientation="left">item属性</a-divider>
              <a-form-item v-if="form.itemConfig.label !== undefined" label="标签名">
                <a-input v-model:value="form.itemConfig.label"/>
              </a-form-item>
              <a-form-item v-if="form.itemConfig.required !== undefined" label="是否必填">
                <a-switch v-model:checked="form.itemConfig.required"/>
              </a-form-item>
              <a-form-item v-if="form.itemConfig.span !== undefined" label="栅格占位">
                <a-slider v-model:value="form.itemConfig.span"
                          :min="0"
                          :max="24"
                          :marks="{4:4,8:8,12:12,24:24}"
                          :step="2"
                />
              </a-form-item>
            </div>
            <div v-if="form.tagConfig">
              <a-divider dashed orientation="left">tag属性</a-divider>
              <!--input-->
              <a-form-item v-if="form.tagConfig.placeholder !== undefined" label="占位">
                <a-input v-model:value="form.tagConfig.placeholder"/>
              </a-form-item>
              <a-form-item v-if="form.tagConfig.disabled !== undefined" label="是否禁用">
                <a-switch v-model:checked="form.tagConfig.disabled"/>
              </a-form-item>
              <a-form-item v-if="form.tagConfig.allowClear !== undefined" label="allowClear">
                <a-switch v-model:checked="form.tagConfig.allowClear"/>
              </a-form-item>
              <a-form-item v-if="form.tagConfig.addonAfter !== undefined" label="addonAfter">
                <a-input v-model:value="form.tagConfig.addonAfter"/>
              </a-form-item>
              <a-form-item v-if="form.tagConfig.addonBefore !== undefined" label="addonBefore">
                <a-input v-model:value="form.tagConfig.addonBefore"/>
              </a-form-item>
              <!--row-->
              <a-form-item v-if="form.tagConfig.isFlex !== undefined" label="flex布局">
                <a-switch v-model:checked="form.tagConfig.isFlex"/>
              </a-form-item>
              <a-form-item v-if="form.tagConfig.align !== undefined" label="align对齐">
                <a-radio-group v-model:value="form.tagConfig.align" button-style="solid">
                  <a-radio-button value="top">top</a-radio-button>
                  <a-radio-button value="middle">middle</a-radio-button>
                  <a-radio-button value="bottom">bottom</a-radio-button>
                </a-radio-group>
              </a-form-item>
            </div>

          </a-form>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="表单属性">表单属性</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import {inject, watch, ref, reactive} from "vue"

const currentTab = ref('1')
const mainState = inject('mainStore')

const form = ref({})
watch(() => mainState.controls, nVal => {
  console.log(nVal)
  form.value = nVal
})
</script>

<style scoped lang="less">
.board-pane {
  padding: 0 20px;
}
</style>
