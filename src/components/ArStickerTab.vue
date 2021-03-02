<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-tabs fixed-tabs background-color="indigo" dark>
          <v-tab
            v-for="tab_item in tabs"
            :key="tab_item.seq"
            @click.prevent="get_tab_link(tab_item)"
          >
            {{ tab_item.title }}
          </v-tab>
        </v-tabs>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script src="xlsx.full.min.js"></script>
<script src="js/jhxlsx.js"></script>

<script>
import { mapActions, mapState } from "vuex";
import _ from "lodash";

const no_image = require(`../assets/no_image.jpg`);

var crc = require("crc");
const {
  s3Upload,
  onFileDelimiter,
  importCSV,
  exportCSV,
} = require("../util/fileutil");
const { updateDataTable } = require("../util/dataTableUtil");

export default {
  data() {
    return {
      tabs: [
        { type: "aos", title: "aos", path: "aos" },
        { type: "ios", title: "ios", path: "ios" },
      ],
    };
  },
  async created() {},
  computed: {
    ...mapState({
      CDN_URL: "CDN_URL",
    }),
  },
  watch: {},
  methods: {
    get_tab_link(tab_item) {
      this.$router.push(`/arSticker/${tab_item.path}`);
    },
  },
};
</script>
