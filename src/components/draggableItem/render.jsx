import {defineComponent, inject, computed, h, createVNode, Fragment, toRaw, getCurrentInstance} from "vue"

const layouts = {
  'a-input': currentItem => {
    return <a-input {...currentItem.tagConfig}/>
  },
  'a-input-number': currentItem => {
    return <a-input-number {...currentItem.tagConfig}/>
  },
  'a-select': currentItem => {
    return <a-select {...currentItem.tagConfig}/>
  },
}

export default defineComponent({
  props: ['currentItem'],
  setup(props) {
    const {__config__: {tag}} = props.currentItem
    return () => layouts[tag]?.(props.currentItem)
  }
})