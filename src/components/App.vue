<template>
  <div id="app">
    <v-app dark id="inspire">
      <v-navigation-drawer fixed clipped v-model="drawer" app>
        <v-list dense class="mt-3">
          <v-list-tile v-for="item in items" :key="item.text" @click="goPage(item.url)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>          
          <v-subheader class="mt-5 grey--text text--darken-1">developed by inhan</v-subheader>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar color="red" dense fixed clipped-left app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="mr-5 align-center">
          <span class="title clickable" @click="goPage('/home')">노래 뭐하지?</span>
          <span class="body-2 pl-4">프로포즈/축가 AI 검색 서비스</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-content>
          <router-view></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      drawer: false,
      items: [
        { text: "프로포즈/축가 목록", icon: "list", url: "/proposesongs" },
        {
          text: "노래 찾기/분석",
          icon: "timeline",
          url: "/searchSong"
        }
      ]
    };
  },
  methods: {
    goPage: function(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>