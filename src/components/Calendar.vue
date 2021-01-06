<template>
  <div class="calendar">
        <van-cell title="选择单个日期" :value="date" @click="show = true" />
        <van-calendar v-model="show" @confirm="onConfirm" position="top"/>
  </div>
</template>

<script>
import { mapState,mapActions } from "vuex";
import { Calendar } from "vant";
export default {
    name:'calendar',
    props:["value"],
    data() {
        return{
            date: '',
            show: true,
        };
    },
    computed:{
        ...mapState({
            recommend:(state) => state.category.Recommend,
        })
    },
    methods: {
        ...mapActions('category',{
        requestRecommend:'requestRecommendData',
        }),
        formatDate(date) {
            return `${date.getMonth() + 1}/${date.getDate()}`;
        },
        onConfirm(date) {
            this.show = false;
            this.date = this.formatDate(date);
            var myDate = new Date();
            var tYear = myDate.getFullYear();
            this.date = tYear + "/" + this.date;
            // alert(this.date)
            this.requestRecommend(this.date);
        },
    },
}
</script>

<style>

</style>