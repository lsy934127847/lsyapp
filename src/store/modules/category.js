import axios from 'axios';

export default {
    namespaced:true,
    
    state:{
        navigationList:[],
        Recommend: [],
    },

    mutations:{
        //获取导航栏目的数据
        setnavigationListData(state,payload){
            // console.log(payload);
            state.navigationList = payload;
        },
        //获取全部演出的数据
        setRecommendData(state,payload){
            // console.log(payload);
            state.Recommend = payload;
        }
    },

    actions:{
        //导航栏目的axios
        async  requestnavigationListData(context,payload){
            const result = await axios.get("/api/category/all");

            const newData = result.data.data;

            newData.unshift({"categoryName":"全部"});

            context.commit('setnavigationListData',newData);
        },
        //全部演出的的axios
        async requestRecommendData(context,payload){
            const result = await axios.get("/api/perfom/all",{
                params:payload
            });
            const newData = result.data.data;
            console.log(newData)
            context.commit('setRecommendData',newData);
        }

    }







}