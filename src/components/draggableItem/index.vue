<script lang="jsx">
import render from '@/components/render/render'
import {defineComponent, h, createVNode, Fragment, toRaw, getCurrentInstance} from "vue";
import eventBus from '@/utils/eventBus'

const slot = {
  setup(props, {slots}) {
    return {
      item: () => <p>props</p>
    }
  },
}
const input = (context, currentItem) => {
  return (
      <a-col>
        <a-form-item>
          <a-input/>
        </a-form-item>
      </a-col>
  )
}
const layouts = {
  input(context, currentItem) {
    const {placeholder, label, style} = currentItem
    return (
        <a-col onClick={event => {
          event.stopPropagation()
          eventBus.$emit('action', currentItem)
        }}>
          <a-form-item label={label}>
            <a-input style={{...style}} placeholder={placeholder}/>
          </a-form-item>
        </a-col>
    )
  },
  col(context, currentItem) {
    const slots = {
      item: ({element}) => {
        return element.__config__.type ? layouts[element.__config__.type](context, element) : ''
      }
    }
    return (
        <a-col>
          <div className="drawing-row-item">
            <span className="component-name">{currentItem.unitKey}</span>
            <draggable v-model={currentItem.children} group={{name: 'form', pull: true, put: true}} animation="300"
                       item-key='unitKey' v-slots={slots}/>
          </div>
        </a-col>
    )
  },
  row(context, currentItem) {
    const slots = {
      item: ({element}) => {
        return element.__config__.type ? layouts[element.__config__.type](context, element) : ''
      }
    }
    return (
        <a-row onClick={event => {
          event.stopPropagation()
          eventBus.$emit('action', currentItem)
        }}>
          <div className="drawing-row-item">
            <span className="component-name">{currentItem.unitKey}</span>
            <draggable list={currentItem.children || []} group={{name: 'form', pull: true, put: true}} animation="300"
                       v-slots={slots}/>
          </div>
        </a-row>
    )
  }
}

function layoutIsNotFound(currentItem) {
  throw new Error(`没有与${currentItem.__config__.layout}匹配的layout`)
}


export default defineComponent({
  name: 'draggableItem',
  props: ['currentItem', 'index', 'drawingList'],
  setup(props, context) {
    return () => {
      const layout = layouts[props.currentItem.__config__.type]
      if (layout) {
        return layout.call(context, context, props.currentItem)
      }
      return layoutIsNotFound.call(props)
    }
  }
})
</script>
