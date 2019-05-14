<template>
  <div class="pl-3 pt-3">
    <v-layout>
      <v-flex>
        <span class="title">Propose Songs</span>
      </v-flex>
      <v-flex class="text-xs-right">
        <v-spacer></v-spacer>
        <v-btn color="red" dark @click="analyze">Calculate Rate</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="proposeSongs"
          :search="search"
          class="elevation-1"
          :rows-per-page-items="[25,{'text':'All','value':-1}]"
        >
          <template v-slot:items="props">
            <td>{{ props.item.songId }}</td>
            <td class="text-xs-right">{{ props.item.playListSeq }}</td>
            <td class="text-xs-right">{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.singer }}</td>
            <td class="text-xs-right">{{ props.item.genre }}</td>
            <td class="text-xs-right">{{ (new Date(props.item.releaseDate)).toLocaleDateString() }}</td>
            <td class="text-xs-right">{{ parseInt(props.item.rate) }}</td>
            <td class="text-xs-right">{{ props.item.like }}</td>
            <td class="text-xs-right">{{ (new Date(props.item.addDate)).toLocaleString() }}</td>
            <td class="justify-center layout px-0">
              <v-icon small class="mr-2">edit</v-icon>
              <v-icon small>delete</v-icon>
            </td>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
          <template v-slot:no-results>
            <v-alert
              :value="true"
              color="error"
              icon="warning"
            >Your search for "{{ search }}" found no results.</v-alert>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import UrlConfig from "../../api/UrlConfig";

export default {
  name: "basesongs",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Song ID",
          // align: 'left',
          // sortable: false,
          value: "songId"
        },
        { text: "PlayListSeq", value: "playListSeq" },
        { text: "Title", value: "title" },
        { text: "Singer", value: "singer" },
        { text: "Genre", value: "genre" },
        { text: "ReleaseDate", value: "releaseDate" },
        { text: "Rate", value: "rate" },
        { text: "Like", value: "like" },
        { text: "AddDate", value: "addDate" },
        { text: "Actions" }
      ],
      proposeSongs: []
    };
  },
  methods: {
    initialize: function() {
      this.$axios.get(UrlConfig.word.getListProposeSong).then(response => {
        this.proposeSongs = response.data;
      });
    },
    
    analyze: function() {
      var respond = confirm("프로포즈 적합도를 갱신하시겠습니까?");
      if (respond) {
        alert("작업시작합니다. 완료될 때까지 기다려주세요");
        this.$axios.get(UrlConfig.word.calcSongsRate).then(response => {
          alert(`완료되었습니다`);
          this.initialize();
        });
      }
    }
  },
  beforeMount: function() {
    this.initialize();
  }
};
</script>