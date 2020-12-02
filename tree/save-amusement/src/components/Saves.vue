<template>
  <div>
    <div>
      <a-breadcrumb>
        <a-breadcrumb-item href="">
          <home-outlined />
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
          <user-outlined />
          <span>Application List</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item> Application </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div>
      <a-card title="记录">
        <a-card-grid
          v-for="(item, i) in list"
          :key="i"
          style="width: 25%; text-align: center"
        >
          <div class="main-txt">￥{{ item.val }}</div>
          <div class="sm-rd-txt">
            {{ new Date(item.date).toLocaleTimeString() }}
          </div>
        </a-card-grid>
      </a-card>
    </div>
    <p>总计：{{ total }}</p>
    <div class="fl-btm">
      <a-input-number
        v-model:value="num"
        :min="1"
        :max="1000"
        @change="onChange"
        class="mg-r-10"
      />
      <a-button type="primary" @click="save"> + 增加 </a-button>
    </div>
  </div>
</template>

<script>
import { HomeOutlined, UserOutlined } from "@ant-design/icons-vue";
export default {
  name: "Saves",
  components: {
    HomeOutlined,
    UserOutlined,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      num: 1,
      list: [],
    };
  },
  computed: {
    total() {
      console.log(this.list);
      return this.list.length > 0
        ? this.list.map((item) => item.val).reduce((a, b) => a + b)
        : 0;
    },
  },
  mounted() {
    this.getMoney();
  },
  methods: {
    save() {
      const dt = JSON.parse(localStorage.getItem("money") || "[]");
      dt.push({ val: this.num, date: new Date() });
      localStorage.setItem("money", JSON.stringify(dt));
      this.list = dt;
    },
    getMoney() {
      this.list = JSON.parse(localStorage.getItem("money") || "[]");
    },
  },
};
</script>
<style lang="less" scoped>
.fl-btm {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.mg-r-10 {
  margin-right: 10px;
}
.sm-rd-txt {
  font-size: 12px;
  color: #d1c5c5;
}
.ant-card-grid {
  padding: 5px;
}
.main-txt {
  font-weight: bold;
}
</style>