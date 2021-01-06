import axios from 'axios';

export default {
    namespaced:true,

    state:{
        //演出详情页的数据
        detailLists:{},
        //演出详情页的评论数据
        evaluste:[],
        //演出详情页的观看提示
        notice_Buy: [],
        notice_Watch: [],
        BuyNotice_3:[],
        WatchNotice_3:[],
        ServeData:[],
        //演出详情页的推荐数据
        recommend:[],
    },

    mutations:{
        setDetailListData(state,payload){
            console.log(payload);
            state.detailLists = payload;
        },
        setEvalustetData(state, payload) {
            state.evaluste = payload;
        },
        setNoticeData(state,payload){
            // console.log(payload);
            state.notice_Buy = payload.notice_Buy;
            state.notice_Watch = payload.notice_Watch;
            state.BuyNotice_3 = payload.BuyNotice_3;
            state.WatchNotice_3 = payload.WatchNotice_3;
            state.ServeData = payload.ServeData;
            // console.log(state.ServeData);
        },
        setRecommendData(state,payload){
            // console.log(payload)
            state.recommend = payload;
        }
    },

    actions:{
        //请求详情页的数据
        async requestDetailListData(context,payload){
            const result = await axios.get("/api/perfom/one",{
                params:payload
            });
            const newData = result.data.data;
            newData.type = "总票代";
            // console.log(newData);
            context.commit("setDetailListData",newData);
        },
        //请求评论数据
        async requestEvalustetData(context, payload) {
            const result = await axios.post("/api/evaluste/performeva",payload);
            const newData = result.data.data;

            context.commit("setEvalustetData",newData);
        },
        //请求评论须知的数据
        async requestNoticeData(context,payload){
            const result = await axios.get("/api/notice");

            // console.log(result);
            const ServeData = result.data.ticketNotes;
            // console.log(ServeData);
            const newData = result.data.noticeMatter.noticeList;
            const notice_Buy = newData[0].ticketNoteList;
            const notice_Watch = newData[1].ticketNoteList;
            const BuyNotice_3 = notice_Buy.slice(0, 3);
            const WatchNotice_3 = notice_Watch.slice(0, 3);

            context.commit("setNoticeData",{notice_Buy,ServeData,notice_Watch,BuyNotice_3, WatchNotice_3});
        },
        //请求推荐的数据
        async requestRecommendData(context,payload){
            const result = await axios.get("/api/perfom/all", {
                params:payload
            });

            const newData = result.data.data;
            // console.log(newData);
            context.commit("setRecommendData",newData);
        }
    }
}