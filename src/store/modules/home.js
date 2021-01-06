import axios from 'axios'

export default {
    namespaced:true,

    state:{
        navlist:[],
        weekList:[],
        options:[],
        weekList1:[]
    },

    mutations:{
        setNavlistData(state, payload){
            console.log(payload);
            state.navlist = payload.newData;
            state.options = payload.options;
        },
        setweekListData(state,payload){
            state.weekList = payload;
        },
        setweekListData1(state, payload) {
          state.weekList1 = payload;
        }
    },

    actions:{
        async requestNavlistData(context,payload){
            const result = await axios.get("/api/category/all");
            const newData = result.data.data.map(item => ({
                id: item.categoryId,
                name: item.categoryName,
                pic: item.picUrl
            }));
            // console.log(newData);
            const options = newData.map(item => ({
              text: item.name,
              value: item.name,
            }));
            // console.log(options);
            context.commit('setNavlistData', {newData,options});
        },
        async requesttweekListData(context,payload){
            const result = await axios.get("/api/perfom/all",{
                params:payload
            });
            
            if(result.data.code==0){
                const newData = result.data.data;
                if (payload&&payload.date && !payload.categoryName && !payload.cityName) {
                    //获取星期所得到的数据
                    context.commit('setweekListData1', newData)
                }else{
                    //其他所有情况(无参数/分类);
                    context.commit('setweekListData', newData)
                }
                
            }
          

            
        }

    }















}