import axios from 'axios';

export default {
    namespaced:true,

    state:{
        orderList:[]
    },

    mutations:{
        setOrderListData(state,payload){
            console.log(payload);
            state.orderList = payload;
        }
    },

    actions:{
        //获取某用户的所有订单
        async requestOrderListData(context,payload){
            const result = await axios.get('/api/order/userall', {
                params:payload
            });

            const newData = result.data.data;

            context.commit('setOrderListData',newData);
        },
    }
}