import {createStore} from 'vuex';
import {auth} from './auth.module';
import { note } from './note.module';
import { base } from './base.module';

const store = createStore({
    modules:{
        auth,
        note,
        base
    }
})

export default store;