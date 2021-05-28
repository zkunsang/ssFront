<template>
  <v-container>
    <v-layout>
      <v-flex wrap align-end>
        <v-file-input
          accept=".xlsx"
          label="File input"
          @change="onTextFileChange"
        ></v-file-input>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapActions, mapState } from "vuex";

var crc = require("crc");
const { s3Upload, readExcel } = require("../util/fileutil");
const { eventBus } = require("../util/eventBus");

const no_image = require(`../assets/no_image.jpg`);

function parseQuestStory(data) {
  return data;
}

function parseQuestGoal(data) {
  return data;
}

function parseQuestReward(data) {
  return data;
}

const questParser = {
  questId: { callback: parseQuestStory, range: { range: 3 } },
  questGoal: { callback: parseQuestGoal, range: { range: 3 } },
  questReward: { callback: parseQuestReward, range: { range: 3 } },
};

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      CDN_URL: "CDN_URL",
    }),
  },
  async created() {
    this.storyId = this.$route.params.storyId;
    this.isNew = !this.storyId;
  },
  watch: {},
  methods: {
    ...mapActions(["LIST_QUEST_STORY", "UPDATE_MANY_QUEST_STORY"]),
    async onTextFileChange(textFile) {
      if (!textFile) {
        this.textFile = null;
        return;
      }

      const result = await readExcel(textFile, questParser);
      await this.UPDATE_MANY_QUEST_STORY({ ...result, storyId: this.storyId });
    },

    getTextFileUrl() {
      if (!this.storyData.textFile) return null;
      return `${this.CDN_URL}${this.storyData.storyId}/textFile/${this.storyData.textFileVersion}/${this.storyData.textFile}`;
    },
    downloadTextFile() {
      const link = document.createElement("a");
      link.href = this.getTextFileUrl();
      link.setAttribute("download", `${this.storyData.textFile}`);
      document.body.appendChild(link);
      link.click();
    },
    onThumbChange(thumbFile) {
      if (!thumbFile) {
        this.thumbImg = null;
        this.thumbFile = null;
        return;
      }

      thumbFile.arrayBuffer().then((data) => {
        this.thumbFile = thumbFile;
        this.thumbFile.crc = crc.crc32(data).toString(16);
        this.thumbImg = URL.createObjectURL(thumbFile);
      });
    },
  },
};
</script>

<style>
.thumbImg {
  height: 212px;
  width: 212px;
}
.storyinfo {
  display: flex-end;
}
</style>
