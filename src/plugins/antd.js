import {Button, Col, Divider, Form, Input, Row, Switch, Drawer, Tabs} from "ant-design-vue"

export default {
  install: (app, options) => {
    app.use(Input)
    app.use(Divider)
    app.use(Button)
    app.use(Tabs)
    app.use(Form)
    app.use(Switch)
    app.use(Col)
    app.use(Row)
    app.use(Drawer)
  }
}
