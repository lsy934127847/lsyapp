import Homedatatoday from './HomedataToday.vue'
import HomedataYestoday from './HomedataYestoday.vue'

const Qflayout = ()=>import('./common/layout/Qflayout.vue') 
const CateSelect = ()=>import('./good/CateSelect.vue') 

const Login = ()=>import('./common/login/Login.vue')

export {
    Homedatatoday,
    HomedataYestoday,
    Qflayout,
    CateSelect,
    Login
}