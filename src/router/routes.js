//import admin pages
import Home from "../pages/Home.vue";
import BaseSongs from "../pages/admin/BaseSongs.vue";
import AnalyzeSongs from "../pages/admin/AnalyzeSongs.vue";
import BaseWords from "../pages/admin/BaseWords.vue";
import ProposeSongs from "../pages/ProposeSongs.vue";
import SearchSong from "../pages/SearchSong.vue";
import AnalyzeSong from "../pages/AnalyzeSong.vue";

//router
const routes = [
    { path: "/", component: Home },
    { path: "/home", component: Home },
    { path: "/basesongs", component: BaseSongs },
    { path: "/analyzesongs", component: AnalyzeSongs },
    { path: "/basewords", component: BaseWords },
    { path: "/proposesongs", component: ProposeSongs },
    { path: "/searchsong", component: SearchSong },
    {
        path: "/analyzesong", name: "analyzesong", component: AnalyzeSong, props: (route) => ({ song: route.params })
    },
];

export default routes;