// 表单属性【右面板】
export const formConf = {
  formRef: 'elForm',
  formModel: 'formData',
  size: 'medium',
  labelPosition: 'right',
  labelWidth: 100,
  formRules: 'rules',
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: true
}

// 输入型组件 【左面板】
export const inputComponents = [
  {
    // 组件的自定义配置
    __config__: {
      label: '单行文本',
      tag: 'a-input',
      layout: 'formItem'
    },
    tagConfig: {
      placeholder: '', // 占位
      addonAfter: '', // 后置标签
      addonBefore: '', // 前置标签
      disabled: false, // 是否
      allowClear: false // 清空
    },
    itemConfig: {
      label: '单行文本', // label
      required: false, // 是否必填
      span: 6
    }
  }
]
// 布局型组件 【左面板】
export const layoutComponents = [
  {
    __config__: {
      label: '行容器',
      tag: 'a-row',
      layout: 'row'
    },
    tagConfig: {
      align: '',
      justify: '',
      isFlex: false
    }
  }
]