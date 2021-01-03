<template>
  <div class="el-dev-box">
    <Header></Header>
    <VScroll
      :requestUrl="requestUrl"
      :pageSize="pageSize"
      :oneItemHeight='oneItemHeight'
      v-slot="father"
    >
      <div
        class="el-dev-item"
        @click="gotoDetail(father.dataItem.id)"
      >
        <div class="el-dev-left">
          <div class="el-dev-title">{{father.dataItem.id}}.{{father.dataItem.title}}</div>
          <div class="el-dev-bottom">
            <div class="el-dev-zhibiao">
              <div class="el-dev-num">
                <img
                  :src="Iguanzhu"
                  alt
                  class="el-dev-icon"
                />
                <span>{{father.dataItem.reads}}</span>
              </div>
              <div class="el-dev-num">
                <img
                  :src="Ilove"
                  alt
                  class="el-dev-icon"
                />
                <span>{{father.dataItem.reads}}</span>
              </div>
            </div>
            <div class="el-dev-time">{{father.dataItem.date}}</div>
          </div>
        </div>
        <img
          class="el-dev-right"
          :src="father.dataItem.image"
          alt
        />
      </div>
    </VScroll>
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
      Iguanzhu,
      Ilove,
      requestUrl: '',
      pageSize: 20,
      // 单条元素的高度
      oneItemHeight: 100,
    }
  },
}
</script>

<style scoped lang='less'>
.el-dev-box {
  margin-top: 60px;
  height: 100%;
}
</style>
