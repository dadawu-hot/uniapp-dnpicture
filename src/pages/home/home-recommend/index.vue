<template>
  <scroll-view 
      @scrolltolower="handleTolower"
      class="recommends_view"
      scroll-y
      v-if="recommends.length>0">
   <!-- 推荐 -->
    <view class="recommend_wrap">
      <navigator class="recommend_item"
                 v-for="item in recommends"
                 :key="item.id"
                 :url="`/pages/album/index?id=${item.target}`">
        <image mode="widthFix" :src="item.thumb">
      </navigator>
    </view>
    <!-- 月份 -->
    <view class="monthes_wrap">
          <!-- 标题 -->
      <view class="monthes_title">
             <!-- 左侧 -->
        <view class="monthes_title_info">
          <view class="monthes_info">
            <text>{{monthes.DD}} /</text>
            {{monthes.MM}}月
          </view>
          <view class="monthes_text">{{monthes.title}}</view>
        </view>
               <!-- 右侧 -->
        <view class="monthes_title_more">更多 ></view>
      </view>
             <!-- 内容 -->
      <view class="monthes_content">
        <view class="monthes_item"
              v-for="(item,index) in monthes.items"
              :key="item.id">
              <!-- <image mode='aspectFill'
                   :src="item.thumb">
            </image> -->
          <!-- 父传子 -->
          <go-detail :list='monthes.items'
                     :index='index'>
            <image mode='aspectFill'
                   :src="item.thumb+item.rule.replace('$<Height>',360)">
            </image>
          </go-detail>
        </view>
      </view>
    </view>
   <!-- 热门 -->
    <view class="hots_wrap">
      <view class="hots_title">
        <text> 热门 </text>
      </view>
      <view class="hots_content">
          <view class="hots_item"
              v-for="(item,index) in hots"
              :key="item.id">
            <!-- <image mode='widthFix'
                   :src="item.src">
            </image> -->
          <go-detail :list='hots'
                     :index='index'>
            <image mode='widthFix'
                   :src="item.thumb">
            </image>
          </go-detail>
        </view>
      </view>
   </view>
</scroll-view>
</template>

<script>
import moment from 'moment';
import goDetail from "@/components/goDetail";
export default {
   components: {
    goDetail
  },
  // 这是一个组件不是页面，能用的生命周期函数mounted
  data(){
    return{
      // 返回列表
      recommends: [],
      monthes: {},
      hots: [
        // {
        //   id:'1',src:"../../../static/mainhot/1.webp",
        // },
        // {
        //   id:'1',src:"../../../static/mainhot/1.webp",
        // },
        // {
        //   id:'1',src:"../../../static/mainhot/1.webp",
        // },
        //  {
        //   id:'1',src:"../../../static/mainhot/2.webp",
        // },
        // {
        //   id:'1',src:"../../../static/mainhot/2.webp",
        // },
        // {
        //   id:'1',src:"../../../static/mainhot/2.webp",
        // },
        //  {
        //   id:'1',src:"../../../static/mainhot/1.webp",
        // },
        // {
        //   id:'1',src:"../../../static/mainhot/1.webp",
        // },
        // {
        //   id:'1',src:"../../../static/mainhot/1.webp",
        // },
        
      ]
      ,
      params: {
        //	获取多少条数据
        limit: 30,
        //	关键字 “hot”
        order: 'hot',
        //	跳过多少条
        skip: 0
      },
        // 是否还有下一页
      hasMore: true
    }
  },
  mounted(){
    this.getList();
    uni.setNavigationBarTitle({title:"推荐"})
  },
  methods:{
    async getList () {
      const { res } = await this.request({
        url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
        data: this.params
      })
      // console.log(res)
       // 	“热门” 列表，如果没有加载的内容了展示弹窗
      if (res.vertical === 0) {
        this.hasMore = false;
          // uni.showToast({
          //       title:"没有了",
          //       icon:"none"
          //   })
          console.log('没有了')
        return;
      }
      if (this.recommends.length === 0) {
        // console.log(res.homepage[1].items);
        this.recommends = res.homepage[1].items;
        this.monthes = res.homepage[2];
        // console.log(res.homepage[2]);
        this.monthes.MM = moment(this.monthes.stime).format('MM')
        this.monthes.DD = moment(this.monthes.stime).format('DD')
      }  else {
        // 请求新的数组，拼接
        this.hots = [...this.hots, ...res.vertical];
      }
      },
      // 滚动条触底事件
     handleTolower () {
      // 修改参数，重新发送请求
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getList();
      } else {
          uni.showToast({
                title:"没有了",
                icon:"none"
            })
            console.log('没有了')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .recommends_view {
    // 分页容器的高度：屏幕高度-头部标题高度
  height: calc(100vh - 36px);
}
  .recommend_wrap {
    display: flex;
    // 换行
    flex-wrap: wrap;
    .recommend_item {
      width: 50%;
      border: 5rpx solid #fff;
    }
}
  .monthes_wrap {
      .monthes_title {
        display: flex;
        justify-content: space-between;
        padding: 20rpx;
        .monthes_title_info {
          color: $color;
          font-size: 30rpx;
          font-weight: 600;
          display: flex;
          .monthes_info {
            text {
              font-size: 36rpx;
            }
          }
          .monthes_text {
            font-size: 34rpx;
            color: #666;
            margin-left: 30rpx;
          }
        }
        .monthes_title_more {
          font-size: 24rpx;
          color: $color;
          padding-top: 5px;
        }
      }
      .monthes_content {
        display: flex;
        flex-wrap: wrap;
        .monthes_item {
          width: 33.33%;
          border: 5rpx solid #fff;
          image{
            background-color: pink;
          }
        }
      }
    }
    .hots_wrap {
      .hots_title {
        padding: 20rpx;
        text {
          border-left: 20rpx solid $color;
          padding-left: 20rpx;
          font-size: 34rpx;
          font-weight: 600;
        }
      }

      .hots_content {
        display: flex;
        flex-wrap: wrap;
        .hots_item {
          width: 33.33%;
          border: 5rpx solid #fff;
          image{
            background-color:green;
          }
        }
      }
}
</style>