import axios from 'axios';

export default {
    namespaced:true,

    state:{
        address:[],
    },

    mutations:{
        setAddressData(state,payload){
            state.address = payload;
        },
    },

    actions:{
        //获取收货地址信息
        async requestAddressData(context,payload){
            const result = await axios.get('/api/address/all');
            //USERID在result中，只是没取出来
            // console.log(result.data.data);
            const newData = result.data.data.map(item =>({
                id:item.addressId,
                name:item.name,
                tel:item.tel,
                address:item.address,
            }));
            console.log(newData);
            context.commit('setAddressData',newData);
        }
    }












}