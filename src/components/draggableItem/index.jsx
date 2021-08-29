import {defineComponent, inject, computed, h, createVNode, Fragment, toRaw, getCurrentInstance} from "vue"
import eventBus from '@/utils/eventBus'
import render from './render.jsx'

const layouts = {
  rowFormItem: (currentItem, active) => {
    const slots = {
      item: ({element}) => <draggableItem currentItem={element}/>
    }
    const {
      tagConfig: {isFlex, justify, align},
    } = currentItem
    currentItem.children = currentItem.children ? currentItem.children : []
    return (
      <div className={`drawing-item ${active === currentItem.unitKey ? 'active' : ''}`}
           onClick={event => {
             eventBus.$emit('action', currentItem);
             event.stopPropagation();
           }}>
        <draggable tag='a-row' component-data={{flex: isFlex, justify, align}} v-model={currentItem.children}
                   group={{name: 'form', pull: true, put: true}} animation={100} v-slots={slots}/>
      </div>
    )
  },
  colFormItem: (currentItem, active) => {
    const {
      itemConfig: {label, span},
      tagConfig
    } = currentItem
    return (
      <a-col onClick={event => {
        event.stopPropagation();
        eventBus.$emit('action', currentItem)
      }} span={span}>
        <div className={`drawing-item drawing-box ${active === currentItem.unitKey ? 'active' : ''}`}>
          <a-form-item label={label} >
            <render currentItem={currentItem}/>
          </a-form-item>
        </div>
      </a-col>
    )
  }
}

function layoutIsNotFound(currentItem) {
  throw new Error(`没有与${currentItem.__config__.layout}匹配的layout`)
}


export default defineComponent({
  name: 'draggableItem',
  props: ['currentItem'],
  setup(props) {
    const mainState = inject('mainStore')
    const {__config__: {layout}} = props.currentItem
    const layoutTemplate = layouts[layout]
    return () => {
      if (layoutTemplate) {
        return layoutTemplate(props.currentItem, mainState.curUnitKey)
      }
      return layoutIsNotFound.call(props)
    }
  }
})