import axios from 'axios'

export default {
    namespaced:true,

    state:{
        hotcity:[],
        cityall:[],
    },

    mutations:{
        setHotcityData(state,payload){
            state.hotcity = payload;
        },
        setCityData(state,payload){
            state.cityall = payload;
        }
    },

    actions:{
        async  requestHotcityData(context,payload){
            const result = await axios.get("/api/cities/hot");

            const newData = result.data.data;

            context.commit('setHotcityData',newData);
            
        },

        async requestCityData(context, payload) {
            const result = await axios.get("/api/cities/all");
            
            const newData = result.data.data;
            
            context.commit('setCityData', newData);

        },

    }

}