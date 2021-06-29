import {defineComponent, h, createVNode, Fragment, toRaw, getCurrentInstance} from "vue"
import eventBus from '@/utils/eventBus'

const layouts = {
  'a-input': (context, currentItem) => {
    const {
      itemConfig: {label, required, span},
      tagConfig: {placeholder, addonAfter, addonBefore, disabled, allowClear}
    } = currentItem
    return (
      <a-col onClick={event => {
        event.stopPropagation()
        eventBus.$emit('action', currentItem)
      }}
             span={span}
      >
        <a-form-item label={label} required={required}>
          <a-input placeholder={placeholder}
                   addonAfter={addonAfter}
                   addonBefore={addonBefore}
                   allowClear={allowClear}
                   disabled={disabled}
          />
        </a-form-item>
      </a-col>
    )
  },
  'a-row': (context, currentItem) => {
    const slots = {
      item: ({element}) => {
        const {__config__: {tag}} = element
        return tag ? layouts[tag](context, element) : ''
      }
    }
    const {
      tagConfig: {isFlex, justify, align}
    } = currentItem
    currentItem.children = currentItem.children ? currentItem.children : []
    return (
      <a-row onClick={event => {
        event.stopPropagation()
        eventBus.$emit('action', currentItem)
      }}
             flex={isFlex}
             justify={justify}
             align={align}
      >
        <div className="drawing-row-item">
          <span className="component-name">{currentItem.unitKey}</span>
          <draggable list={currentItem.children || []} group={{name: 'form', pull: true, put: true}} animation="300"
                     v-slots={slots}
          />
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
      const {__config__: {tag}} = props.currentItem
      const layout = layouts[tag]
      if (layout) {
        return layout.call(context, context, props.currentItem)
      }
      return layoutIsNotFound.call(props)
    }
  }
})