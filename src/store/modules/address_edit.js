import axios from 'axios';

export default {
    namespaced:true,

    state:{
        OneData:{}
    },

    mutations:{
        setOneData(state,payload){
            state.OneData = payload;
        }
    },

    actions:{
        //获取某一条数据
        async requestOneData(context,payload){
            const result = await axios.get('/api/address/one',{
                params:payload
            });

            const newData = result.data.data;
            console.log(newData);
            context.commit('setOneData',newData);
        }
    }
}