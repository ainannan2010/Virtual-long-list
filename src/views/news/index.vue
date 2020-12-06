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
          v-for="item in showList"
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
      indexStart: 0,
    }
  },
  created() {
    this.getInfo(20)
  },
  mounted() {
    // 获取dom元素一般要在mounted里获取
    window.onresize = this.myResize
    window.orientationchange = this.myResize
  },
  methods: {
    myResize() {
      // ~~ 表示2次取反，就会取到整数，向上取整
      this.screenContainSize =
        ~~(
          (this.$refs.scrollContainer.offsetHeight - this.navMarginTop) /
          this.oneItemHeight
        ) + 2
    },
    handleScroll() {
      // 截流，优化性能
      this.handlejieliu()
    },
    // 截流
    handlejieliu() {
      let oldTime = Date.now()
      window.requestAnimationFrame(() => {
        const newTime = Date.now()
        this.setIndexStart()
        if (newTime - oldTime > 30) {
          oldTime = newTime
          // 递归
          window.requestAnimationFrame(arguments.callee)
        }
      })
    },

    // 设置当前起始索引位置
    setIndexStart() {
      const indexStart = ~~(
        this.$refs.scrollContainer.scrollTop / this.oneItemHeight
      )

      // 如果滚动的时候，this.indexStart 没有发生变化说明展示的数据没有发生变化，就不用做赋值等操作了
      if (this.indexStart === indexStart) return
      this.indexStart = indexStart
      // 结束节点到达底部， 就在加载数据
      if (this.indexEnd === this.newsList.length && !this.loading) {
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
      return this.newsList.slice(this.indexStart, this.indexEnd)
    },
    // 索引结束位置
    indexEnd() {
      let indexEnd = this.indexStart + this.screenContainSize
      if (!this.newsList[indexEnd]) {
        indexEnd = this.newsList.length
      }
      return indexEnd
    },
    handleStyle() {
      // 上占位、下占位
      const paddingTop = `${this.indexStart * this.oneItemHeight}px`
      const paddingBottom = `${
        (this.newsList.length - this.indexEnd) * this.oneItemHeight
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
  height: calc(100% - 60px);
  .el-dev-list {
    overflow: auto;
    height: calc(100% - 60px);
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
