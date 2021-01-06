import {fetchQQmusic} from '@/utills/api.js'

export default  {
    // 开启命名空间
    namespaced:true,
    state:{
        musicList:[]
    },
    getters:{
      
    },
    mutations:{
        updateMusicList(state,payload){
            state.musicList = payload
            console.log(this.musicList)
        }
    },
    actions:{
        getMusic(store,payload){
            fetchQQmusic(payload).then(res=>{
                // let s = res.song.list
                // store.state.musicList = S
                store.commit('updateMusicList',res.song.list)
            })
        }
    }
}