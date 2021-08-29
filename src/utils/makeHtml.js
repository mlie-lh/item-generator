let confGlobal

function formWrapper(scheme, str) {
  return `<a-form :model="formState">${str}</a-form>`
}

function colWrapper(scheme, str) {
  return `<a-col>${str}</a-col>`
}

const tags = {
  'a-input': scheme => {
    console.log('scheme', scheme)
    const {tagConfig, __config__: {tag}} = scheme
    const placeholder = tagConfig.placeholder ? `placeholder="${tagConfig.placeholder}"` : ''
    const addonAfter = tagConfig.addonAfter ? `addonAfter="${tagConfig.addonAfter}"` : ''
    const addonBefore = tagConfig.addonBefore ? `addonBefore="${tagConfig.addonBefore}"` : ''
    const disabled = tagConfig.disabled ? 'disabled' : ''
    const allowClear = tagConfig.allowClear ? 'allowClear' : ''
    return `<${tag} ${placeholder} ${addonAfter} ${addonBefore} ${disabled} ${allowClear} />`
  }
}

const layouts = {
  colFormItem(scheme) {
    const {
      itemConfig: {label, required},
      __config__: {tag}
    } = scheme
    const tagDom = tags[tag] ? tags[tag](scheme) : null
    let str = `<a-form-item label="${label}" ${required ? 'required' : ''}>${tagDom}</a-form-item>`
    str = colWrapper(scheme, str)
    return str
  },
  rowFormItem(scheme) {
    const children = scheme.children.map(el => layouts[el.__config__.layout](el))
    return `<a-row>
      ${children.join('\n')}
        </a-row>`
  }
}
export default function makeUpHtml(formConfig = []) {
  const htmlList = []
  confGlobal = formConfig
  // 遍历渲染每个组件成html
  formConfig.forEach(el => {
    console.log(el)
    htmlList.push(layouts[el.__config__.layout](el))
  })
  let htmlStr = htmlList.join('\n')
  htmlStr = formWrapper('', htmlStr)
  confGlobal = null
  return htmlStr
}
