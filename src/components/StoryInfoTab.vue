<template>
  <v-container>
    <v-layout text-center wrap>
      <v-container>
        <v-tabs background-color="indigo" dark>
          <v-tab
            v-for="tab_item in tabs"
            :key="tab_item.type"
            @click.prevent="get_tab_link(tab_item)"
          >
            {{ tab_item.title }}
          </v-tab>
        </v-tabs>
      </v-container>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import TemplateStoryVue from "./TemplateStory.vue";
import { mapActions, mapState } from "vuex";
import { eventBus } from "../util/eventBus";

var crc = require("crc");

const no_image = require(`../assets/no_image.jpg`);
export default {
  data() {
    return {
      storyData: {},
      tabs: [
        { type: "info", title: "스토리정보", path: "info" },
        { type: "aos", title: "aos", path: "aos" },
        { type: "ios", title: "ios", path: "ios" },
        { type: "mission", title: "미션", path: "mission" },
        { type: "tzaos", title: "tzaos", path: "tzaos" },
      ],
      storyId: null,
    };
  },
  computed: {
    ...mapState({
      CDN_URL: "CDN_URL",
    }),
  },
  async created() {
    this.storyId = this.$route.params.storyId;
  },
  methods: {
    ...mapActions(["GET_STORY_INFO"]),
    get_tab_link(tab_item) {
      this.$router.push(`/story/${this.storyId}/${tab_item.path}`);
    },
  },
};
</script>

<style>
.card {
  width: 75px;
  height: 100px;
  float: left;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 2px;
}
.container {
  display: flex;
  align-content: flex-end;
}
.info {
  display: flex;
  max-width: none;
}
</style>
