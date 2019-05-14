<template>
  <div class="pl-3 pt-3">
        <v-layout>
          <v-flex>
              <span class="title">Base Songs</span>
              </v-flex>
              <v-flex class="text-xs-right">
                <v-spacer></v-spacer>
              <v-btn color="red" dark @click="analyze">Lyric Analyze</v-btn>
              </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs3>
            <v-text-field name="dj-id" label="Melon DJ Id" type="text" v-model="djId"></v-text-field>
          </v-flex>
          <v-flex>
            <v-btn color="primary" @click="addSongs">Add Songs</v-btn>
          </v-flex>
          <v-flex>
             <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <v-data-table
      :headers="headers"
      :items="baseSongs"
      :search="search"
      class="elevation-1"
      :rows-per-page-items="[25,{'text':'All','value':-1}]"
    >
      <template v-slot:items="props">
        <td>
          <a href="#" @click="showLyrics(props.item)">{{ props.item.songId }}</a></td>
        <td class="text-xs-right">{{ props.item.playListSeq }}</td>
        <td class="text-xs-right">{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.singer }}</td>
        <td class="text-xs-right">{{ props.item.isPositive }}</td>
        <td class="text-xs-right">{{ props.item.status }}</td>
        <td class="text-xs-right">{{ props.item.message }}</td>
        <td class="text-xs-right">{{ parseInt(props.item.rate) }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            
          >
            edit
          </v-icon>
          <v-icon
            small
            
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>

    <v-dialog
            v-model="dialog"
            width="500"
          >
            <v-card>
              <v-card-title
                class="headline grey lighten-2"
                primary-title
              >
                {{selectedSong.title}}
              </v-card-title>

              <v-card-text>
                {{selectedSong.lyrics}}
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-switch
                  v-model="selectedSong.isPositive"
                  label="isPositive"
                  @change="changePositive"
                ></v-switch>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  flat
                  @click="dialog = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
            </v-flex>
        </v-layout>
      </div>
</template>

<script>
import UrlConfig from "../../api/UrlConfig";

export default {
  name: "basesongs",
  data () {
      return {
        search: '',
        dialog: false,
        selectedSong:{},
        djId: '',
        headers: [
          {
            text: 'SongId',
            // align: 'left',
            // sortable: false,
            value: 'songId'
          },
          { text: 'PlayListSeq', value: 'playListSeq' },
          { text: 'Title', value: 'title' },
          { text: 'Singer', value: 'singer' },
          { text: 'IsPositive', value: 'isPositive' },
          { text: 'Status', value: 'status' },
          { text: 'Message', value: 'message' },
          { text: 'Rate', value: 'rate' },
          { text: 'Actions'}
        ],
        baseSongs: []
      }
    },
    methods: {
      addSongs: function(){
        this.$axios
        .post(UrlConfig.word.addSongs, {
          playListSeq: this.djId
        })
        .then(response => {
          alert(`${response.data}곡 추가`);
          this.initialize();
        })
      },
      initialize: function(){
        this.$axios
          .get(UrlConfig.word.getListBaseSongs)
          .then(response => {
            this.baseSongs = response.data;
          })
      },
      showLyrics: function(item){
        this.$axios
          .get(`${UrlConfig.word.getLyrics}?songId=${item.songId}`)
          .then(response => {
            this.selectedSong = item;
            this.selectedSong.lyrics = response.data;
            this.selectedSong.status = "PositiveSet";
            this.dialog = true;
          })
      },
      changePositive: function(e){
        this.$axios.post(UrlConfig.word.changePositive, {
            songId: this.selectedSong.songId,
            isPositive: this.selectedSong.isPositive
          })
      },
      analyze: function(){
        var respond = confirm("가사분석을 시작하시겠습니까?");
        if(respond){
          alert("작업시작합니다. 완료될 때까지 기다려주세요")
            this.$axios
            .get(UrlConfig.word.analyzeLyrics)
            .then(response => {
              alert(`${response.data}건 완료되었습니다`)
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