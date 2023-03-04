import { toast } from "vue3-toastify";
import { axiosInstance, axiosHeaders } from "../plugin/axios_service"

export const note = {
    namespaced:true,
    state:{
        detailNote:null,
        listNote:null
    },
    actions:{
        async listNote(context){
            return new Promise((resolve, reject) => {
                axiosInstance.get('/api/note/list', axiosHeaders()).then(dat=>{
                    const noteDat = dat.data.data.data;
                    context.commit('listNoteSuccess', noteDat);
                    resolve(dat);
                }).catch(err => {
                    const errMsg = err.response.data.message;
                    toast(errMsg);
                    reject(err);
                });
            })
        },
        async createNote(context, noteDat){
            return new Promise((resolve, reject) => {
                axiosInstance.post('/api/note/save',noteDat, axiosHeaders())
                .then(data => {
                    toast('Save Note Success');
                    resolve(data);
                })
                .catch(err => {
                    const errMsg = err.response.data.message;
                    toast(errMsg);
                    reject(err);
                });
            })
        },

        async detailNote(context, idNote){
            return new Promise((resolve, reject) => {
                axiosInstance.get(`/api/note/detail/${idNote}`, axiosHeaders()).then(dat => {
                    const noteDat = dat.data.data;
                    context.commit('detailNoteSuccess', noteDat);
                    resolve(dat);
                }).catch(err =>{
                    const errMsg = err.response.data.message;
                    toast(errMsg);
                    reject(err);
                });
            })
        },

        async updateNote(context, noteDat){
            return new Promise((resolve, reject)=>{
                axiosInstance.patch(`/api/note/update/${noteDat.id}`, noteDat, axiosHeaders()).then(dat =>{
                    toast('Success Update Note');
                    console.log('success update');
                    resolve(dat);
                }).catch(err =>{
                    const errMsg = err.response.data.message;
                    toast(errMsg);
                    reject(err);
                });
            });
        }
    },
    
    mutations:{
        listNoteSuccess(state, data){
            state.listNote = data;
        },
        detailNoteSuccess(state, data){
            state.detailNote = data;
        }
    }
}