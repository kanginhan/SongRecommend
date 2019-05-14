<template>
  <div class="pl-3 pt-3">
    <v-layout>
      <v-flex>
        <span class="title">Analyze Songs</span>
      </v-flex>
    </v-layout>
    <v-layout class="pt-5">
      <v-flex>
      <v-btn color="red" dark @click="findChart100">차트100 찾기</v-btn>
        <v-btn color="red" dark @click="findNew100">신곡100 찾기</v-btn>
        </v-flex>
    </v-layout>
    <v-layout class="pt-3">
      <v-flex xs3>
            <v-text-field name="dj-id" label="Melon DJ Id" type="text" v-model="djId"></v-text-field>
          </v-flex>
          <v-flex>
            <v-btn color="primary" @click="findPlayList">플레이리스트 찾기</v-btn>
          </v-flex>
    </v-layout>
    <!-- <v-layout>
      <v-flex>
        <v-btn color="warning" dark @click="migration">마이그레이션</v-btn>
      </v-flex>
    </v-layout> -->
  </div>
</template>

<script>
import UrlConfig from "../../api/UrlConfig";

export default {
  name: "analyzesongs",
  data () {
      return {
        djId: ''
      }
    },
    methods: {
      findChart100: function(){
        if(confirm("차트100에서 찾으시겠습니까?")){
          alert("차트100");
        }
      },
      findNew100: function(){
        if(confirm("신곡100에서 찾으시겠습니까?")){
          alert("신곡100");
        }
      },
      findPlayList: function(){
        if(confirm(`${this.djId}번 플레이리스트에서 찾으시겠습니까?`)){
          this.$axios
            .post(UrlConfig.word.findPlayList, {
              playListSeq: this.djId
            })
            .then(response => {
              alert(`${response.data}곡 추가`);
              this.initialize();
            })
        }
      },
      migration: function(){
        if(confirm("마이그레이션을 시작하시겠습니까?")){
          this.$axios
            .get(UrlConfig.word.localToAzureMigration)
            .then(response => {
              alert("마이그레이션 완료");
            })
        }
        
      }
    }
};
</script>