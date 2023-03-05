
export const base = {
    namespaced:true,
    state:{
        navsideActive:false,
    },
    actions:{
        activateNavside(context){
            context.commit('activatedNavside');
        },
        deactivateNavside(context){
            context.commit('deactivatedNavside');
        }
    },
    mutations:{
        activatedNavside(state){
            state.navSideActive = true;
        },
        deactivatedNavside(state){
            state.navSideActive = false;
        }
    }
}