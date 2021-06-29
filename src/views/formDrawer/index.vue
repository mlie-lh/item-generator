<template>
  <a-drawer
      placement="right"
      width="100%"
      :closable="false"
      :bodyStyle="{padding:0,height:'100%',background:'#000000'}"
      v-model:visible="mainState.showDrawer"
  >
    <a-tabs type="card" v-model:activeKey="activeKey" :forceRender="true"
            :tabBarStyle="{color:' #888a8e',  borderLeft: '1px solid #121315', background:'#363636',border: 0}"
    >
      <template #tabBarExtraContent>
        <div class="extraContent">
          <a href="javascript:;" @click="mainState.showDrawer = false">close</a>
        </div>
      </template>
      <a-tab-pane key="1" tab="template" class="pane-wrap">
        <div id="editorHtml" class="tab-editor"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="css" class="pane-wrap">
        <div id="editorCss" class="tab-editor"/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="script" class="pane-wrap">
        <div id="editorJs" class="tab-editor"/>
      </a-tab-pane>
    </a-tabs>

  </a-drawer>
</template>

<script setup>
import {inject, ref, watchEffect,toRaw} from 'vue'
import loadMonaco from '../../utils/loadMonaco'
import loadBeautifier from '../../utils/loadBeautifier'
import beautifierConf from '../../config/beautifierConf'
import makeUpHtml from '../../utils/makeHtml'

const activeKey = ref('1')
const mainState = inject('mainStore')
let beautifier, monaco
const htmlCode = ref('')
const jsCode = ref('')
const initDrawer = () => {
  htmlCode.value = makeUpHtml(toRaw(mainState.makeData))
  // jsCode.value = makeUpJs()

  loadBeautifier(btf => {
    beautifier = btf
    htmlCode.value = beautifier.html(htmlCode.value, beautifierConf.html)
    jsCode.value = beautifier.js(jsCode.value, beautifierConf.js)
    loadMonaco(val => {
      monaco = val
      setEditorValue('editorHtml', 'html',  htmlCode.value)
    })
  })
}


const editorObj = {
  html: null,
  javascript: null,
  css: null
}
const setEditorValue = (id, type, codeStr) => {
  if (editorObj[type]) {
    editorObj[type].setValue(codeStr)
  } else {
    editorObj[type] = monaco.editor.create(document.getElementById(id), {
      value: codeStr,
      theme: 'vs-dark',
      language: type,
      automaticLayout: true
    })
  }
}
watchEffect(() => {
  if (mainState.showDrawer) initDrawer()
})

</script>
<style scoped lang="less">
:deep(.ant-tabs-bar) {
  margin: 0;
}

.pane-wrap {
  height: calc(100vh - 100px);
  background: #121315;
}

:deep(.ant-tabs-tab) {
  color: #888a8e;
  background: #363636 !important;
  border: 0 !important;

  &.ant-tabs-tab-active {
    background: #1e1e1e !important;
    border-bottom-color: #1e1e1e !important;
    color: #fff !important;
  }
}

.tab-editor {
  height: 100%;
}
.extraContent{
  padding: 0 20px;
}
</style>
