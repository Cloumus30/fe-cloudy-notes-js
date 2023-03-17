import { toast } from "vue3-toastify";
import { axiosInstance, axiosHeaders } from "../plugin/axios_service"
import cryptoJs from "crypto-js";
import { encryptBody } from "../plugin/crypto_service";

export const note = {
    namespaced:true,
    state:{
        detailNote:null,
        listNote:null
    },
    actions:{
        async listNote(context, params = null){
            return new Promise((resolve, reject) => {
                let search = '';
                if(params){
                    search = params.search || '';
                }
                axiosInstance.get(`/api/note/list?q=${search}`, axiosHeaders()).then(dat=>{
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
            const encrypted = encryptBody(noteDat);
            return new Promise((resolve, reject) => {
                axiosInstance.post('/api/note/save',encrypted, axiosHeaders())
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
                const encrypted = encryptBody(noteDat);
                axiosInstance.patch(`/api/note/update/${noteDat.id}`, encrypted, axiosHeaders()).then(dat =>{
                    toast('Success Update Note');
                    resolve(dat);
                }).catch(err =>{
                    console.log(err);
                    const errMsg = err.response.data.message;
                    toast(errMsg);
                    reject(err);
                });
            });
        },

        async deleteNote(context, idNote){
            return new Promise((resolve, reject) => {
                axiosInstance.delete(`/api/note/delete/${idNote}`, axiosHeaders()).then(dat => {
                    toast('Success Delete Note');
                    resolve(dat);
                }).catch(err => {
                    const errMsg = err.response.data.message;
                    toast(errMsg);
                    reject(err);  
                })
            })
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