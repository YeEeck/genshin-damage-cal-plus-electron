<template>
  <div class="home" id="home">
    <v-app id="inspire" style="height: 0px">
      <v-card class="overflow-hidden">
        <v-app-bar
          absolute
          color="#6A76AB"
          dark
          shrink-on-scroll
          prominent
          :src="require('../assets/91187479_p0.jpg')"
          fade-img-on-scroll
          scroll-target="#scrolling-techniques"
        >
          <template v-slot:img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
            ></v-img>
          </template>

          <v-app-bar-title>原神计算器</v-app-bar-title>

          <v-spacer></v-spacer>

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list subheader>
              <v-list-item @click.stop="dialog1 = true">
                <v-list-item-title>关于</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <template v-slot:extension>
            <v-tabs align-with-title v-model="tab">
              <v-tab>伤害估算</v-tab>
              <v-tab>圣遗物评级</v-tab>
            </v-tabs>
          </template>
        </v-app-bar>
        <div class="scroll-warp" id="scrolling-techniques" ref="warp1">
          <v-container class="scroll-box-inner">
            <v-tabs-items v-model="tab">
              <v-tab-item> <cal-com></cal-com></v-tab-item>
              <v-tab-item> <figure-com></figure-com></v-tab-item>
            </v-tabs-items>
          </v-container>
        </div>
      </v-card>

      <v-dialog v-model="dialog1" max-width="290">
        <v-card>
          <v-card-title class="text-h5"> 关于 </v-card-title>

          <v-card-text>
            使用Vue Vuetify框架构建。<br />
            一个自己以前做的小工具的重制加强版，大概稍微有那么点用处。<br />
            头图来源pixiv，<a href="https://www.pixiv.net/artworks/91187479"
              >https://www.pixiv.net/artworks/91187479</a
            >，侵删。
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog1 = false">
              关闭
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import Cal from "../components/cal.vue";
import Figure from "../components/figure.vue";
export default {
  name: "Home",
  components: {
    "cal-com": Cal,
    "figure-com": Figure,
  },
  data() {
    return {
      tab: null,
      dialog1: false,
    };
  },
  mounted() {
    this.$refs.warp1.style.height = window.innerHeight - 1 + "px";
  },
};
</script>

<style lang="less">
.scroll-warp {
  overflow-y: auto !important;
  padding-top: 210px;
}
</style>