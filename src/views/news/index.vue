<template>
  <div class="el-dev-box">
    <Header></Header>
    <div
      class="el-dev-list"
      ref="scrollContainer"
      @scroll.passive="handleScroll"
    >
      <div
        class="el-dev-container"
        :style="handleStyle"
      >
        <div
          class="el-dev-item"
          v-for="(item) in showList"
          :key="item.id"
          @click="gotoDetail(item.id)"
        >
          <div class="el-dev-left">
            <div class="el-dev-title">{{item.id}}.{{item.title}}</div>
            <div class="el-dev-bottom">
              <div class="el-dev-zhibiao">
                <div class="el-dev-num">
                  <img
                    :src="Iguanzhu"
                    alt
                    class="el-dev-icon"
                  />
                  <span>{{item.reads}}</span>
                </div>
                <div class="el-dev-num">
                  <img
                    :src="Ilove"
                    alt
                    class="el-dev-icon"
                  />
                  <span>{{item.reads}}</span>
                </div>
              </div>
              <div class="el-dev-time">{{item.date}}</div>
            </div>
          </div>
          <img
            class="el-dev-right"
            :src="item.image"
            alt
          />
        </div>
      </div>
      <div
        v-if="loading"
        class="el-dev-loading"
      >{{loadingMsg}}</div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { dataService } from '@/api'
import { Iguanzhu, Ilove } from '@/img'
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      newsList: [],
      Iguanzhu,
      Ilove,
      loading: false,
      loadingMsg: '稍等下，行不行',
      // 单条元素的高度
      oneItemHeight: 100,
      // 屏幕最大容积数量
      screenContainSize: 10,
      // 顶部导航条的高度
      navMarginTop: 60,
      // 索引开始位置
      startIndex: 0,
      scrollTop: 0,
    }
  },
  created() {
    this.getInfo(20)
  },
  mounted() {
    // 获取dom元素一般要在mounted里获取
    this.myResize()
    window.onresize = this.myResize
    window.orientationchange = this.myResize
  },
  activated() {
    // 滚动条回到之前滚动位置
    this.$nextTick(() => {
      this.$refs.scrollContainer.scrollTop = this.scrollTop
    })
  },
  methods: {
    myResize() {
      // ~~ 表示2次取反，就会取到整数，向上取整
      this.screenContainSize = ~~(
        (this.$refs.scrollContainer.offsetHeight - this.navMarginTop) /
        this.oneItemHeight
      )
    },
    handleScroll() {
      // 保存当前的滚动位置
      this.scrollTop = this.$refs.scrollContainer.scrollTop
      // 滚动的时候获取数据
      this.handleThrottle()
    },
    // 节流优化性能，（对于一些低性能的设备的优化）
    handleThrottle() {
      let oldTime = Date.now()
      window.requestAnimationFrame(() => {
        const newTime = Date.now()
        this.setStartIndex()
        // 使用30这个值是因为稍微合理一点, 浏览器一般是60hz的就是1s钟60hz， 那大概1hz大概就是需要17ms渲染完
        if (newTime - oldTime > 30) {
          oldTime = newTime
          // 递归
          window.requestAnimationFrame(arguments.callee)
        }
      })
    },

    // 设置当前起始索引位置
    setStartIndex() {
      const startIndex = ~~(
        this.$refs.scrollContainer.scrollTop / this.oneItemHeight
      )
      // 如果滚动的时候，this.startIndex 没有发生变化说明展示的数据没有发生变化，就不用做赋值等操作了
      if (this.startIndex === startIndex) return
      this.startIndex = startIndex
      // 结束节点到达底部， 就再加载数据(并且避免连续发出请求)
      if (this.endIndex === this.newsList.length && !this.loading) {
        this.getInfo(20)
      }
    },
    gotoDetail(id) {
      this.$router.push(`/article/${id}`)
    },
    async getInfo(num) {
      try {
        this.loading = true
        const { list } = await dataService.getNewsList({ num })
        this.newsList = [...this.newsList, ...list]
        this.loading = false
      } catch (error) {
        this.loadingMsg = 'err: 数据请求异常，联系管理员，看他管不管'
        console.log('***-error-*********:', error) // eslint-disable-line
      }
    },
  },
  computed: {
    showList() {
      let startIndex = 0
      const endIndex = 0
      // 处理paddingTop
      if (this.startIndex > this.screenContainSize) {
        startIndex = this.startIndex - this.screenContainSize
      } else {
        startIndex = 0
      }

      return this.newsList.slice(startIndex, this.endIndex)
    },
    // 索引结束位置
    endIndex() {
      let endIndex = this.startIndex + this.screenContainSize * 2
      if (!this.newsList[endIndex]) {
        endIndex = this.newsList.length
      }
      return endIndex
    },
    handleStyle() {
      // 上占位、下占位
      let paddingTop = '0px'
      let paddingBottom = '0px'
      if (this.startIndex > this.screenContainSize) {
        paddingTop = `${
          (this.startIndex - this.screenContainSize) * this.oneItemHeight
        }px`
      }

      paddingBottom = `${
        (this.newsList.length - this.endIndex) * this.oneItemHeight
      }px`

      return {
        paddingTop,
        paddingBottom,
      }
    },
  },
}
</script>

<style scoped lang='less'>
.el-dev-box {
  margin-top: 60px;
  height: 100%;
  .el-dev-list {
    overflow: auto;
    height: calc(100% - 50px);
    // height: 100%
  }
  .el-dev-item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed #000;
    padding: 14px 2% 5px;
    .el-dev-left {
      flex: 1;
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-right: 10px;
      .el-dev-title {
        font-size: 16px;
        color: #000;
        font-weight: 600;
      }
      .el-dev-bottom {
        display: flex;
        justify-content: space-between;
        .el-dev-zhibiao {
          display: flex;
          .el-dev-num {
            display: flex;
            align-items: center;
            margin-right: 15px;
            .el-dev-icon {
              width: 18px;
              height: 18px;
              margin-right: 5px;
            }
          }
        }
      }
    }

    .el-dev-right {
      width: 60px;
      height: 60px;
    }
  }
}
.el-dev-loading {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
</style>
