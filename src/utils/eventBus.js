import mitt from 'mitt'

const emitter = mitt()
const eventBus = {
  $on: emitter.on,
  $off: emitter.off,
  $emit: emitter.emit
}
export default eventBus
