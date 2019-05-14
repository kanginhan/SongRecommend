<template>
<v-container>
  <div class="pl-3 pt-3">
    <v-layout align-center class="mb-4">
      <v-flex>
        <span class="headline">노래 찾기/분석</span>
        <br>
        <span class="body-1">검색한 노래를 AI가 프로포즈에 맞는지 분석합니다</span>
      </v-flex>
    </v-layout>

    <v-container v-if="isLoading" fluid grid-list-lg fill-height style="min-height: 350px">
      <v-layout justify-center align-center>
        <v-flex class="text-xs-center">
          <v-img :src="require('../assets/analyzing.gif')" max-width="200px" class="item-center"></v-img>
          <span class="font-weight-thin">가사 분석 중입니다 ...</span>
        </v-flex>
      </v-layout>
    </v-container>

    <v-layout v-else>
      <v-flex xs12 sm6 offset-sm3>
        <v-btn color="red" small round @click="goPage('/searchsong')">다시 찾기</v-btn>
        <v-btn color="red" small round @click="goPage('/proposesongs')">목록으로</v-btn>
        <v-card class="elevation-5">
          <v-list two-line class>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="song.ALBUMIMG">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="song.SONGNAME"></v-list-tile-title>
                <v-list-tile-sub-title
                  v-html="`<span class='text--primary'>${song.ARTISTNAME}</span> <span class='caption'>- ${song.ALBUMNAME}</span>`"
                ></v-list-tile-sub-title>
              </v-list-tile-content>

              <v-icon v-if="isFavorite" color="red" @click="setFavorite()" :disabled="analyzeResult.rate <= 70">favorite</v-icon>
              <v-icon v-else color="red" @click="setFavorite()" :disabled="analyzeResult.rate <= 70">favorite_border</v-icon>
            </v-list-tile>
          </v-list>

          <v-card-title primary-title>
            <v-layout>
              <v-flex class="subheading text-xs-center">
                <div class="title">{{analyzeResult.rate}}%</div>
                <div class="subheading mt-2">{{analyzeMessage}}</div>
              </v-flex>
            </v-layout>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text v-html="analyzeResult.lyric"></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    </div>
  </v-container>
</template>

<script>
import UrlConfig from "../api/UrlConfig";
import _ from "lodash";

export default {
  name: "analyzesong",
  props: ["song"],
  data() {
    return {
      isLoading: true,
      analyzeResult: {},
      favorite: null,
    };
  },
  computed: {
    analyzeMessage: function() {
      if (this.analyzeResult.rate >= 90) {
        return "이거 부르면 바로 내남자, 내여자";
      } else if (this.analyzeResult.rate > 70) {
        return "프로포즈하기에 좋아요";
      } else if (this.analyzeResult.rate > 40) {
        return "애매하네요, 잘 모르겠어요";
      } else {
        return "헤어지고 싶으면 부르세요";
      }
    },
    isFavorite: function() {
      this.favorite = localStorage.myList && localStorage.myList.includes(this.song.SONGID + "∬");
      return this.favorite;
    }
  },
  methods: {
    setFavorite: function() {
      if (!localStorage.myList) {
        localStorage.myList = "";
      }
      if (localStorage.myList.includes(this.song.SONGID + "∬")) {
        localStorage.myList = localStorage.myList.replace(
          this.song.SONGID + "∬",
          ""
        );
      } else {
        localStorage.myList = localStorage.myList + this.song.SONGID + "∬";
      }
      this.favorite = null;
    },
    goPage: function(url) {
      this.$router.push(url);
    }
  },
  beforeMount: function() {
    this.$axios
      .get(`${UrlConfig.word.analyzeSong}?SongId=${this.song.SONGID}`)
      .then(response => {
        this.isLoading = false;
        this.analyzeResult = response.data;
      });
  }
};
</script>


<style>
.clickable {
  cursor: pointer;
}
.v-list__tile__title b {
  color: chartreuse;
}
.v-card__text b {
  color: chartreuse;
}
.v-list {
  padding: 0px !important;
}
.v-card__title--primary{
  padding-top: 10px !important;
}
.item-center {
  margin: auto;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 50px;
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -25px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
