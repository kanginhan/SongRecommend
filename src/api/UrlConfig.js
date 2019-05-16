// var BASE_URL = "https://songrecommendapi.azurewebsites.net/api";
var BASE_URL = "https://localhost:44350/api";

export default {
    test: {
        whoami: BASE_URL + "/values"
    },
    word:{
        addSongs: BASE_URL + "/word/addSongs",
        getListBaseSongs: BASE_URL + "/word/getListBaseSongs",
        getLyrics: BASE_URL + "/word/getLyrics",
        changePositive: BASE_URL + "/word/changePositive",
        analyzeLyrics: BASE_URL + "/word/analyzeLyrics",
        findPlayList: BASE_URL + "/word/findPlayList",
        localToAzureMigration: BASE_URL + "/word/localToAzureMigration",
        getListBaseWord: BASE_URL + "/word/getListBaseWord",
        calcWordsRate: BASE_URL + "/word/calcWordsRate",
        getListProposeSong: BASE_URL + "/word/getListProposeSong",
        calcSongsRate: BASE_URL + "/word/calcSongsRate",
        searchKeyword: BASE_URL + "/word/searchKeyword",
        analyzeSong: BASE_URL + "/word/analyzeSong",
    },
}