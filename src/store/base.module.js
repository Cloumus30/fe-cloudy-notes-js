
export const base = {
    namespaced:true,
    state:{
        navsideActive:false,
        isDarkTheme: true,
    },
    actions:{
        activateNavside(context){
            context.commit('activatedNavside');
        },
        deactivateNavside(context){
            context.commit('deactivatedNavside');
        },
        activateDarkTheme(context){
            context.commit('activateDarkTheme');
        },
        deactivateDarkTheme(context){
            context.commit('deactivateDarkTheme');
        }
    },
    mutations:{
        activatedNavside(state){
            state.navSideActive = true;
        },
        deactivatedNavside(state){
            state.navSideActive = false;
        },
        activateDarkTheme(state){
            state.isDarkTheme = true;
        },
        deactivateDarkTheme(state){
            state.isDarkTheme = false;
        }
    }
}