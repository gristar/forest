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
          class="list-item"
          :class="item.isDel ? 'sm-rd-txt' : ''"
        >
          <div @click="del(item.id)" v-if="!item.isDel" class="rt">
            <CloseCircleOutlined />
          </div>
          <div class="main-txt">
            <span :class="item.val <= 0 ? 'red' : 'green'"
              >￥{{ item.val }}</span
            >
          </div>
          <div class="small-txt">
            {{ new Date(item.date).toLocaleTimeString() }}
          </div>
          <div v-if="item.isDel">已删除</div>
          <a-tooltip placement="topRight" v-if="item.note">
            <template #title>
              <span>{{ item.note }}</span>
            </template>
            <a-button size="small">{{ item.note }}</a-button>
          </a-tooltip>
        </a-card-grid>
      </a-card>
    </div>
    <p>
      总计：<span class="green total">￥{{ total }}</span>
    </p>
    <div class="fl-btm">
      <a-button
        class="mg-r-10 mgt10"
        v-for="(item, index) in auto"
        :key="index"
        @click="autoSet(item)"
        >{{ item.note }}</a-button
      >
      <div class="mgt10">
        <a-textarea v-model:value="note" placeholder="备注" auto-size />
      </div>
      <div class="fl mgt10">
        <a-input-number
          v-model:value="num"
          :min="1"
          :max="1000"
          @change="onChange"
          class="mg-r-10"
        />
        <a-button type="primary" @click="add" class="mg-r-10">
          + 增加
        </a-button>
        <a-button type="danger" @click="reduce"> - 减少 </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  HomeOutlined,
  UserOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
export default {
  name: "Saves",
  components: {
    HomeOutlined,
    UserOutlined,
    CloseCircleOutlined,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      num: 1,
      list: [],
      note: "",
      auto: [
        { num: 8, note: "没有喝奶茶" },
        { num: 40, note: "健身 40 分钟" },
        { num: 25, note: "没有吃宵夜" },
        { num: 1, note: "" },
      ],
    };
  },
  computed: {
    total() {
      const dt = this.list
        .filter((item) => !item.isDel)
        .map((item) => item.val);
      return dt.length > 0 ? dt.reduce((a, b) => a + b) : 0;
    },
  },
  mounted() {
    this.getMoney();
  },
  methods: {
    add() {
      const dt = JSON.parse(localStorage.getItem("money") || "[]");
      dt.push({
        val: this.num,
        date: new Date(),
        id: Math.random(),
        note: this.note,
      });
      this.save(dt);
    },
    reduce() {
      if (this.total - this.num < 0) {
        message.warning("减少后金额少于 0");
        return;
      }
      const dt = JSON.parse(localStorage.getItem("money") || "[]");
      dt.push({
        val: -this.num,
        date: new Date(),
        id: Math.random(),
        note: this.note,
      });
      this.save(dt);
    },
    getMoney() {
      this.list = JSON.parse(localStorage.getItem("money") || "[]");
    },
    del(id) {
      const item = this.list.find((item) => item.id === id);
      if (this.total - item.val < 0) {
        message.warning("删除后金额少于 0");
        return;
      }
      item.isDel = true;
      item.date = new Date();
      item.note = this.note;
      this.save(this.list);
    },
    save(dt) {
      localStorage.setItem("money", JSON.stringify(dt));
      this.list = dt;
      this.num = 1;
      this.note = "";
    },
    autoSet(item) {
      this.note = item.note;
      this.num = item.num;
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
  text-align: left;
}
.fl {
  display: flex;
}
.mg-r-10 {
  margin-right: 10px;
}
.sm-rd-txt {
  font-size: 12px;
  color: #d1c5c5 !important;
  .red {
    color: #d1c5c5 !important;
  }
  .green {
    color: #d1c5c5 !important;
  }
}
.ant-card-grid {
  padding: 5px;
}
.main-txt {
  font-weight: bold;
}
.rt {
  position: absolute;
  top: 2px;
  right: 2px;
}
::v-deep .ant-card-body {
  display: flex;
  flex-wrap: wrap;
}
.small-txt {
  font-size: 12px;
}
.list-item {
  width: 25%;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.red {
  color: red;
}
.green {
  color: green;
}
.mgt10 {
  margin-top: 10px;
}
.ant-btn-sm {
  font-size: 12px;
  border: 0;
}
::v-deep .ant-btn-sm span {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}
.lg-txt {
  font-size: 18px;
  font-weight: bolder;
}
.total {
  font-weight: bold;
  color: orange;
  text-shadow: 0 0 1px currentColor, -1px -1px 1px #030, 0 -1px 1px #030,
    1px -1px 1px #030, 1px 0 1px #030, 1px 1px 1px #030, 0 1px 1px #030,
    -1px 1px 1px #030, -1px 0 1px #030;
}
</style>