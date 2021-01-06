import axios from 'axios';

export default {
    namespaced:true,

    state:{
        Result:[],
    },

    mutations:{
        setResultData(state,payload){
            console.log(payload);
            state.Result = payload;

        }
    },

    actions:{
        async requestResultData(context,payload){
            const result = await axios.get('/api/perfom/search',{
                params:payload
            });
            if(result){
                const newData = result.data.data;
                // console.log(newData);
                context.commit('setResultData', newData);
            }
        }
    },






}