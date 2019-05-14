<template>
  <div>
    <section class="title-section">
      <v-card flat tile dark class="py-5 px-3" style="background-color:transparent !important">
        <v-container grid-list-sm class="mw-2 mt-5 py-5">
          <v-layout justify-center column>
            <v-flex xs12 text-xs-center>
              <div class="display-2 font-weight-bold lh-1">노래 뭐하지?</div>
              <p class="headline font-weight-light lh-1 ls-1 pt-3">AI가 당신의 프로포즈/축가를 찾아드립니다</p>
            </v-flex>
          </v-layout>

          <v-layout justify-center column align-center class="pt-5 mt-5">
            <v-flex>
              <v-btn color="red" class="mr-5 elevation-0" @click="goPage('/proposesongs')">프로포즈/축가 목록</v-btn>
              <v-btn color="red" class="elevation-0" @click="goPage('/searchsong')">노래 검색/분석</v-btn>
            </v-flex>
          </v-layout>

          <v-layout justify-center align-center column class="mt-5 pt-5">
            <div class="pb-3"> 최근 업데이트 목록 </div>
            <v-data-table
              :headers="headers"
              :items="proposeSongs"
              class="elevation-5"
              hide-actions
            >
              <template v-slot:items="props">
                <tr>
                  <td>{{ props.item.title }}</td>
                  <td>{{ props.item.singer }}</td>
                  <td>{{ parseInt(props.item.rate) }}</td>
                  <td>{{ (new Date(props.item.addDate)).toLocaleDateString() }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-layout>
        </v-container>
      </v-card>
    </section>
  </div>
</template>

<script>
import UrlConfig from "../api/UrlConfig";
import { debug } from 'util';

export default {
  name: "home",
  data() {
    return {
      proposeSongs: [],
      
      headers: [
        { text: "곡명", value: "title", sortable: false },
        { text: "아티스트", value: "singer", sortable: false },
        { text: "프로포즈 점수", value: "rate", sortable: false },
        { text: "업데이트", value: "addDate", sortable: false },
      ]
    };
  },
  computed: {},
  methods: {
    initialize: function() {
      this.$axios.get(UrlConfig.word.getListProposeSong).then(response => {
        this.$_.sortBy(response.data, 'addDate');
        this.proposeSongs = response.data.slice(1, 6);
      });
    },
    goPage: function(url) {
      this.$router.push(url);
    }
  },
  beforeMount: function() {
    this.initialize();
  }
};
</script>



<style>
.title-section {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("../assets/nathan-dumlao-576657-unsplash.jpg") center no-repeat;
  background-size: cover;
}
</style>
