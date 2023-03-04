import { toast } from "vue3-toastify";
import { axiosInstance } from "../plugin/axios_service"

export const note = {
    namespaced:true,
    state:{
        detailNote:null,
        listNote:null
    },
    actions:{
        async createNote(context, noteDat){
            return new Promise((resolve, reject) => {
                axiosInstance.post('/api/note/save',noteDat)
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
        }
    }
}