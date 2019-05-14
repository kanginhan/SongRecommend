<template>
<v-container>
  <div class="pl-3 pt-3">
    <v-layout align-center class="mb-4">
      <v-flex>
        <span class="headline">프로포즈/축가 목록</span>
        <br>
        <span class="body-1">AI가 멜론에서 찾은 최고의 목록이며 자동으로 업데이트 됩니다</span>
      </v-flex>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-layout>
    <v-layout class="pt-3 pb-3">
      <v-flex>
        <v-chip
          v-for="chip in chips"
          :key="chip.text"
          color="red"
          :outline="!chip.selected"
          @click="selectChip(chip)"
        >{{ chip.text }}</v-chip>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="proposeSongs"
          :search="search"
          :pagination.sync="pagination"
          class="elevation-1"
          :rows-per-page-items="[10, 25]"
        >
          <template v-slot:items="props">
            <tr>
              <td class="clickable" @click="selectSong(props.item)">{{ props.item.title }}</td>
              <td class="clickable" @click="selectSong(props.item)">{{ props.item.singer }}</td>
              <td class="subheading clickable" @click="selectSong(props.item)">{{ parseInt(props.item.rate) }}</td>
              <td class="clickable" @click="selectSong(props.item)">{{ props.item.genre }}</td>
              <td
                class="clickable"
                @click="selectSong(props.item)"
              >{{ (new Date(props.item.releaseDate)).toLocaleDateString() }}</td>
              <td class="clickable" @click="selectSong(props.item)">
                <v-icon size="15">favorite_border</v-icon>
                {{ props.item.like }}
              </td>
              <td>
                <v-icon
                  v-if="props.item.favorite"
                  color="red"
                  @click="setFavorite(props.item)"
                >favorite</v-icon>
                <v-icon v-else color="red" @click="setFavorite(props.item)">favorite_border</v-icon>
              </td>
            </tr>
          </template>
          <template v-slot:no-data>
            <v-alert :value="true" color="grey" icon="warning">검색결과 없습니다</v-alert>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="grey" icon="warning">"{{ search }}" 검색결과 없습니다</v-alert>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" scrollable max-width="500px">
      <v-card>
        <v-card-title class="headline red" primary-title>
          {{selectedSong.title}}
          <v-spacer></v-spacer>
          <v-icon @click="dialog = false">clear</v-icon>
        </v-card-title>
        <v-card-text v-html="selectedSong.lyric"></v-card-text>
      </v-card>
    </v-dialog>
    </div>
  </v-container>
</template>

<script>
import UrlConfig from "../api/UrlConfig";

export default {
  name: "basesongs",
  data() {
    return {
      dialog: false,
      selectedSong: {},
      search: "",
      pagination: {
        sortBy: "rate",
        descending: true
      },
      headers: [
        { text: "곡명", value: "title" },
        { text: "아티스트", value: "singer" },
        { text: "프로포즈 점수(%)", value: "rate" },
        { text: "장르", value: "genre" },
        { text: "발매일", value: "releaseDate" },
        { text: "좋아요", value: "like" },
        { text: "찜", value: "favorite" }
      ],
      chips: [
        {
          text: "#내가찜한노래",
          selected: false,
          action: list => list.filter(x => x.favorite)
        },
        {
          text: "#90점이상",
          selected: false,
          action: list => list.filter(x => x.rate >= 90)
        },
        {
          text: "#80점이상",
          selected: false,
          action: list => list.filter(x => x.rate >= 80)
        },
        {
          text: "#인기있는노래",
          selected: false,
          action: list => list.filter(x => x.like && x.like >= 50000)
        },
        {
          text: "#숨어있는명곡",
          selected: false,
          action: list =>
            list.filter(x => x.like && x.like <= 10000 && x.rate >= 90)
        },
        {
          text: "#최신",
          selected: false,
          action: list =>
            list.filter(x => {
              var today = new Date();
              return (
                x.releaseDate &&
                new Date(x.releaseDate) >=
                  new Date(
                    today.getFullYear() - 1,
                    today.getMonth(),
                    today.getDate()
                  )
              );
            })
        },
        {
          text: "#2010년대",
          selected: false,
          action: list =>
            list.filter(x => {
              var year = x.releaseDate && new Date(x.releaseDate).getFullYear();
              return year && year >= 2010 && year < 2020;
            })
        },
        {
          text: "#2000년대",
          selected: false,
          action: list =>
            list.filter(x => {
              var year = x.releaseDate && new Date(x.releaseDate).getFullYear();
              return year && year >= 2000 && year < 2010;
            })
        },
        {
          text: "#2000년이전",
          selected: false,
          action: list =>
            list.filter(x => {
              var year = x.releaseDate && new Date(x.releaseDate).getFullYear();
              return year && year < 2000;
            })
        },
        {
          text: "#발라드",
          selected: false,
          action: list =>
            list.filter(x => x.genre && x.genre.includes("발라드"))
        },
        {
          text: "#댄스",
          selected: false,
          action: list => list.filter(x => x.genre && x.genre.includes("댄스"))
        },
        {
          text: "#기타장르",
          selected: false,
          action: list => list.filter(x => x.genre && !x.genre.includes("댄스") && !x.genre.includes("발라드"))
        },
        {
          text: "#최근등록",
          selected: false,
          action: list =>
            list.filter(x => {
              var today = new Date();
              return (
                x.addDate &&
                new Date(x.addDate) >=
                  new Date(
                    today.getFullYear(),
                    today.getMonth() - 1,
                    today.getDate()
                  )
              );
            })
        }
      ],
      rawProposeSongs: []
    };
  },
  computed: {
    proposeSongs: function() {
      var list = this.$_.clone(this.rawProposeSongs, true);
      this.chips.forEach(chip => {
        if (chip.selected && chip.action) {
          list = chip.action(list);
        }
      });
      list.forEach(item => {
        item.favorite = this.isFavorite(item.songId);
      });
      return list;
    }
  },
  methods: {
    initialize: function() {
      this.$axios.get(UrlConfig.word.getListProposeSong).then(response => {
        this.rawProposeSongs = response.data;
      });
    },
    selectSong: function(item) {
      this.selectedSong = item;
      this.dialog = true;
    },
    selectChip: function(chip) {
      chip.selected = !chip.selected;
    },
    isFavorite: function(songId) {
      return localStorage.myList && localStorage.myList.includes(songId + "∬");
    },
    setFavorite: function(item) {
      this.selectedSong = {};
      if (!localStorage.myList) {
        localStorage.myList = "";
      }
      if (localStorage.myList.includes(item.songId + "∬")) {
        localStorage.myList = localStorage.myList.replace(
          item.songId + "∬",
          ""
        );
      } else {
        localStorage.myList = localStorage.myList + item.songId + "∬";
      }
      item.favorite = !item.favorite;
    }
  },
  beforeMount: function() {
    this.initialize();
  }
};
</script>


<style>
.v-chip .v-chip__content {
  cursor: pointer !important;
}
.clickable {
  cursor: pointer;
}
</style>
