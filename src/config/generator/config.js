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
      type: 'input',
      span: 24
    },
    // 其余的为可直接写在组件标签上的属性
    label: '单行文本',
    placeholder: '',
    addonAfter: '',
    addonBefore: '',
    disabled: false,
    required: false,
    allowClear: true,
    type: 'text'
  },
  {
    __config__: {
      type: 'row',
      layout: 'rowFormItem',
      tagIcon: 'row',
      label: '行容器',
      layoutTree: true
    },
    type: 'default',
    children: [],
    justify: 'start',
    align: 'top'
  }
]
