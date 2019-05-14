<template>
<v-container>
  <div class="pl-3 pt-3">
    <v-layout align-center class="mb-4">
      <v-flex>
        <span class="headline">노래 찾기/분석</span>
        <br/>
        <span class="body-1">검색한 노래를 AI가 프로포즈에 맞는지 분석합니다</span>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        @keyup="searchSongs"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-layout>

    <v-list v-if="searchedSongs && searchedSongs.length > 0" two-line class="mt-5">
      <template v-for="(item, index) in searchedSongs">
        <v-list-tile :key="item.SONGID" avatar @click="selectSong(item)">
          <v-list-tile-avatar>
            <img :src="item.ALBUMIMG">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="item.SONGNAMEDP"></v-list-tile-title>
            <v-list-tile-sub-title v-html="`<span class='text--primary'>${item.ARTISTNAME}</span> <span class='caption'>- ${item.ALBUMNAME}</span>`"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider :key="index"></v-divider>
      </template>
    </v-list>

    <v-layout v-else-if="search" class="mt-5">
      <v-flex class="text-xs-center">
        <v-icon size="50" class="pb-3">sms_failed</v-icon>
        <br/>
        <span class="font-weight-thin">검색결과가 없습니다</span>  
      </v-flex>
    </v-layout>

    <v-layout v-else class="mt-5">
      <v-flex class="text-xs-center">
        <v-icon size="50" class="pb-3">sentiment_very_satisfied</v-icon>
        <br/>
        <span class="font-weight-thin">검색어에 제목을 정확하게 입력해 주세요</span>  
      </v-flex>
    </v-layout>
        </div>
  </v-container>
</template>

<script>
import UrlConfig from "../api/UrlConfig";
import _ from "lodash";

export default {
  name: "searchsong",
  data() {
    return {
      search: "",
      searchedSongs: []
    };
  },
  methods: {
    searchSongs: _.debounce(function(e) {
      this.$axios
        .get(`${UrlConfig.word.searchKeyword}?query=${this.search}`)
        .then(response => {
          this.searchedSongs = response.data.SONGCONTENTS;
        });
    }, 100),

    selectSong: function(item) {
      if(confirm(`${item.SONGNAME} 을 분석하시겠습니까?`)){
        this.$router.push({name:'analyzesong', params: item});
      }
    }
  }
};
</script>


<style>
.clickable {
  cursor: pointer;
}
.v-list__tile__title b {
  color: chartreuse
}
.v-list {
  padding: 0px !important;
}
</style>
