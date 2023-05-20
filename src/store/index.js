import {createStore} from 'vuex';
import {auth} from './auth.module';
import { note } from './note.module';
import { base } from './base.module';
import { profile } from './profile.module';

const store = createStore({
    modules:{
        auth,
        note,
        base,
        profile,
    }
})

export default store;