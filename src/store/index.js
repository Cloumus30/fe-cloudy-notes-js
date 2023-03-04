import {createStore} from 'vuex';
import {auth} from './auth.module';
import { note } from './note.module';

const store = createStore({
    modules:{
        auth,
        note
    }
})

export default store;