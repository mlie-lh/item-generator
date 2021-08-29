import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Switch,
  Drawer,
  Tabs,
  Radio,
  Slider
} from "ant-design-vue"

export default {
  install: (app, options) => {
    app.use(Input)
    app.use(InputNumber)
    app.use(Select)
    app.use(Divider)
    app.use(Button)
    app.use(Tabs)
    app.use(Form)
    app.use(Switch)
    app.use(Col)
    app.use(Row)
    app.use(Drawer)
    app.use(Radio)
    app.use(Slider)
  }
}
