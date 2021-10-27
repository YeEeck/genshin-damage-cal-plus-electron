<template>
  <div class="fig-warper">
    <v-container>
      <v-alert type="info"
        >评分仅作参考，满分100。暴击率、暴击伤害权值为2，攻击力百分比、元素充能以及在勾选情况下的生命值、防御力、元素精通权值为1。<br />其他元素以及没有被勾选情况下的生命值、防御力、元素精通权值为0。因此权值为0的副词条可以选择置空。
      </v-alert>
      <v-expand-transition>
        <v-alert
          type="error"
          v-show="this.repeatErr"
          transition="scroll-x-reverse-transition"
          style="margin-bottom: 30px"
          >存在重复的词条</v-alert
        >
      </v-expand-transition>
      <v-row v-for="(selectObj, index) in selects" :key="selectObj.name" dense>
        <v-col>
          <v-select
            :items="items"
            :label="selectObj.name"
            v-model="selectObj.model"
            @change="selectChanged(selectObj.model, index)"
            dense
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            outlined
            dense
            clearable
            :disabled="selectObj.disable"
            :suffix="selectObj.append"
            :label="selectObj.model"
            v-model="selectObj.value"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-switch
        v-for="(switchObj, index) in switchs"
        :key="index"
        v-model="switchObj.value"
        inset
        dense
        :label="switchObj.title"
      ></v-switch>
      <v-row>
        <v-col cols="8">
          <v-btn
            color="primary"
            block
            large
            :disabled="this.repeatErr"
            @click.stop="figure"
          >
            评级
          </v-btn>
        </v-col>
        <v-col>
          <v-btn block @click="reset" large> 重置 </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title class="text-h5"> 你的圣遗物评级 </v-card-title>

        <v-card-text>
          <v-row justify="center" style="padding: 40px">
            <v-progress-circular
              :rotate="-90"
              :size="200"
              :width="50"
              :value="processCircle"
              :color="this.circleColor"
            >
              {{ processC }}<br />
              {{ level }}
            </v-progress-circular>
          </v-row>
          <v-alert type="error" v-show="this.processC > 100"
            >数据无效：超出上限的评分</v-alert
          >
          <v-alert type="success" v-show="this.processC <= 100"
            >数据有效</v-alert
          >
          <v-alert type="info"
            >等级划分为4个档位，每个档位长度为25分。<br />4个档位分别为:劣、良、优、极品。</v-alert
          >
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn fab color="primary" @click="dialog = false">
            <v-icon> done </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repeatErr: false,
      sum: 0,
      dialog: false,
      processCircle: 0,
      circleColor: "#D92027",
      level: "",
      items: [
        "百分比攻击力",
        "数值攻击力",
        "暴击率",
        "暴击伤害",
        "元素精通",
        "元素充能效率",
        "百分比防御力",
        "数值防御力",
        "百分比生命值",
        "数值生命值",
      ],
      selects: [
        { name: "副属性1", model: "", value: "", append: "", disable: true },
        { name: "副属性2", model: "", value: "", append: "", disable: true },
        { name: "副属性3", model: "", value: "", append: "", disable: true },
        { name: "副属性4", model: "", value: "", append: "", disable: true },
      ],
      switchs: [
        { title: "生命值需求（如钟离）", value: false },
        { title: "防御力需求（如阿贝多、诺艾尔）", value: false },
        { title: "元素精通需求（元素反应C，如胡桃，迪卢克）", value: false },
      ],
    };
  },
  computed: {
    processC() {
      return this.processCircle.toFixed(2);
    },
  },
  methods: {
    selectChanged(name, selectId) {
      let sheet = [0, 2, 3, 5, 6, 8];
      let activeId = this.items.findIndex((x) => x === name);
      if (sheet.includes(activeId)) {
        this.selects[selectId].append = "%";
      } else {
        this.selects[selectId].append = "";
      }
      this.selects[selectId].disable = false;
      this.check();
    },
    reset() {
      this.selects = [
        { name: "副属性1", model: "", value: "", append: "", disable: true },
        { name: "副属性2", model: "", value: "", append: "", disable: true },
        { name: "副属性3", model: "", value: "", append: "", disable: true },
        { name: "副属性4", model: "", value: "", append: "", disable: true },
      ];
      this.switchs = [
        { title: "生命值需求（如钟离）", value: false },
        { title: "防御力需求（如阿贝多、诺艾尔）", value: false },
        { title: "元素精通需求（元素反应C，如胡桃，迪卢克）", value: false },
      ];
      this.repeatErr = false;
    },

    check() {
      for (let index = 0; index < this.selects.length; index++) {
        const element1 = this.selects[index];
        if (element1.model == "") {
          continue;
        }
        for (let index2 = index + 1; index2 < this.selects.length; index2++) {
          const element2 = this.selects[index2];
          if (element2.model == "") {
            continue;
          }
          if (element1.model == element2.model) {
            this.repeatErr = true;
            return;
          }
        }
      }
      this.repeatErr = false;
    },

    figure() {
      this.sum = 0;
      let one = [0, 5];
      let two = [2, 3];
      let base = [4.95, 16.5, 3.3, 6.6, 19.5, 5.5, 6.2, 19.5, 4.95, 254];
      if (this.switchs[0].value == true) one.push(8);
      if (this.switchs[1].value == true) one.push(6);
      if (this.switchs[2].value == true) one.push(4);
      this.selects.forEach((element) => {
        let activeId = this.items.findIndex((x) => x === element.model);
        let res = element.value / base[activeId];
        if (one.includes(activeId)) {
          this.sum += res;
        } else if (two.includes(activeId)) {
          this.sum += res * 2;
        }
      });
      console.log(this.sum);
      this.dialog = true;
      this.processCircle = this.sum * 5.2913;
      if (this.processCircle < 25) {
        this.circleColor = "#D92027";
        this.level = "劣";
      } else if (this.processCircle < 50) {
        this.circleColor = "#FF9234";
        this.level = "良";
      } else if (this.processCircle < 75) {
        this.circleColor = "#FFCD3C";
        this.level = "优";
      } else {
        this.circleColor = "#35D0BA";
        this.level = "极品";
      }
    },
  },
};
</script>

<style lang="less">
.v-progress-circular__info {
  font-size: x-large !important;
  font-weight: bolder !important;
  text-align: center;
}
</style>