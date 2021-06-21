import {reactive} from "vue"
// @ts-ignore
import {IStore} from "@/store"

/**
 * IUserState
 */
declare interface IMainState {
    controls: Object
}

const state: IMainState = reactive({
    controls: {},
    showDrawer: false,
    makeData:[]
})
const store: IStore<IMainState> = {
    persistedState: false,
    state: state
}
export default store
export {state, IMainState}
