<template>
  <div class="warp">
    <v-container>
      <v-alert type="info"
        >如果仅仅为了比较不同配装的优劣，无关变动的项目可以不填写</v-alert
      >
      <v-alert type="info">不填写攻击力、技能倍率将导致结果为0</v-alert>
      <v-text-field
        v-model="atk"
        label="攻击力"
        outlined
        dense
        clearable
      ></v-text-field>
      <v-text-field
        v-model="crRate"
        label="暴击率"
        outlined
        dense
        suffix="%"
        clearable
      ></v-text-field>
      <v-text-field
        v-model="crDam"
        label="暴击伤害"
        outlined
        dense
        suffix="%"
        clearable
      ></v-text-field>
      <v-text-field
        v-model="skill"
        label="技能倍率"
        outlined
        dense
        suffix="%"
        hint="如果只是对配装的伤害比较的话可以直接填100"
        clearable
      ></v-text-field>
      <v-text-field
        v-model="damAdd1"
        label="对应元素/物理伤害加成"
        outlined
        dense
        clearable
        suffix="%"
        hint="假设人物输出主要为火伤则填入火属性伤害加成百分比"
      ></v-text-field>
      <v-text-field
        v-model="damAdd2"
        label="圣遗物套装伤害加成"
        outlined
        dense
        clearable
        suffix="%"
        hint="一些圣遗物会对伤害进行加成（如角斗士4件套）"
      ></v-text-field>
      <v-text-field
        v-model="damAdd3"
        label="武器伤害加成"
        outlined
        dense
        clearable
        suffix="%"
        hint="一些武器会对伤害进行加成（如黑剑）"
      ></v-text-field>
      <v-text-field
        v-model="defend"
        label="怪物抗性"
        outlined
        dense
        clearable
        suffix="%"
      ></v-text-field>

      <v-dialog v-model="dialog" fullscreen>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" text v-bind="attrs" v-on="on"
            >怪物抗性表</v-btn
          >
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            怪物抗性表
          </v-card-title>

          <v-card-text>
            <v-img :src="require('../assets/image001.jpg')"></v-img>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> OK </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-col></v-col>
      <v-text-field
        v-model="slevel"
        label="人物等级"
        outlined
        dense
        clearable
        suffix="%"
      ></v-text-field>
      <v-text-field
        v-model="mlevel"
        label="怪物等级"
        outlined
        dense
        clearable
        suffix="%"
      ></v-text-field>
      <v-btn
        color="primary"
        elevation="2"
        block
        large
        :loading="loading1"
        :disabled="loading1"
        @click="btnClick"
        >计算</v-btn
      >
    </v-container>

    <v-snackbar v-model="snackbar" :timeout="100000" vertical>
      {{ text1 }}<br />
      {{ text2 }}<br />
      {{ text3 }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          OK
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      atk: "",
      crRate: "",
      crDam: "",
      skill: "100",
      damAdd1: "",
      damAdd2: "",
      damAdd3: "",
      defend: "",
      mlevel: 90,
      slevel: 90,
      loading1: false,
      snackbar: false,
      text1: "",
      text2: "",
      text3: "",
      dialog: false,
    };
  },
  methods: {
    btnClick() {
      this.loading1 = true;
      this.snackbar = true;
      let levelDefend =
        (this.slevel * 5 + 500) /
        (this.slevel * 5 + 500 + (this.mlevel * 5 + 500));
      let res =
        this.atk *
        (this.skill / 100) *
        (1 + this.damAdd1 / 100 + this.damAdd2 / 100 + this.damAdd3 / 100) *
        (1 - this.defend / 100) *
        levelDefend;
      let crh = res * (1 + this.crDam / 100);
      let realdam = res + (crh - res) * (this.crRate / 100);
      this.text1 = "伤害期望: " + realdam;
      this.text2 = "未暴击期望: " + res;
      this.text3 = "暴击期望: " + crh;
      this.loading1 = false;
    },
  },
};
</script>

<style lang="less">
</style>