<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
    <v-container>
      <v-row>
        <v-col cols=12 md=3>
          <vc-date-picker
            v-model="tempEvent"
            mode="dateTime"
            :masks="masks"
            is-range
          >
            <template v-slot="{ inputValue, inputEvents, isDragging }">
              <v-row>
              <v-col cols=12 md=6>
              <input
                class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                :value="inputValue.start"
                v-on="inputEvents.start"
              />
              </v-col> 
              <v-col cols=12 md=1>
                =>
              </v-col>
              <v-col cols=12 md=5>
              <input
                class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                :value="inputValue.end"
                v-on="inputEvents.end"
              />
              </v-col>
              </v-row>
            </template>
          </vc-date-picker>
          
        </v-col>
        <v-col cols=12 md=3>
          <v-text-field
            label="이벤트 코드"
            v-model="tempEvent.evtCode"
          >
          </v-text-field>
        </v-col>
        <v-col cols=12 md=3>
          <v-switch 
            class="flag" 
            v-model="tempEvent.status" 
            :label="getStatusLabel(tempEvent)"
          ></v-switch>
        </v-col>
        <v-col cols=12 md=3>
          <v-btn 
            @click="onSave"
          >적용</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            label="메시지"
            v-model="tempEvent.message"
          >
          </v-textarea>
        </v-col>
      </v-row>
      <!-- <v-data-table
        :headers="headers"
        :items="statusList"
      >
      </v-data-table> -->
    </v-container>
    </v-layout>
  </v-container>
</template>

<script>

import TemplateStoryVue from './TemplateStory.vue';
import {mapActions, mapState} from 'vuex'
import {eventBus} from '../util/eventBus';

var crc = require('crc');
const { importCSV, exportCSV } = require('../util/fileutil');
const { updateDataTable } = require('../util/dataTableUtil');

const no_image = require(`../assets/no_image.jpg`);
const ArrayUtil = require('../util/ArrayUtil');
const DateUtil = require('../util/DateUtil');

export default {
  data() {
    return {
      tempEvent: {},
      inputValue: {},
      // statusList: [],
      headers: [
        { text: '시작일시', value: 'startDate' },
        { text: '종료일시', value: 'endDate' },
        { text: '일자', value: 'message' },
        { text: '메모', value: 'memo' },
      ],
      range: {
        start: new Date(),
        end: new Date(),
      },
      masks: {
        input: 'YYYY-MM-DD h:mm',
      },
    }
  },
  computed: {},
  async created() {
    await this.getTempEventInfo();
  },
  
  methods: {
    ...mapActions([
      'GET_TEMP_EVENT',
      'INSERT_TEMP_EVENT'
    ]),
    async getTempEventInfo() {
      const body = await this.GET_TEMP_EVENT();
      
      this.tempEvent = body.tempEvent || {};
      this.tempEvent.start = DateUtil.utsToDate(this.tempEvent.startDate);
      this.tempEvent.end = DateUtil.utsToDate(this.tempEvent.endDate);
    },
    async onSave() {
      this.tempEvent.status = this.tempEvent.status ? 1: 0;
      this.tempEvent.startDate = DateUtil.dsToUts(this.tempEvent.start);
      this.tempEvent.endDate = DateUtil.dsToUts(this.tempEvent.end);
      this.tempEvent.evtCode = parseInt(this.tempEvent.evtCode);
      
      await this.INSERT_TEMP_EVENT(this.tempEvent);
      this.getTempEventInfo();
    },
    getStatusLabel(tempEvent) {
      return tempEvent.status == 1 ? "활성" : "비활성"
    },
  }
};
</script>

<style>
.style-1 {
  background-color: rgb(215,215,44)
}
.style-2 {
  background-color: rgb(114,114,67)
}
.custom-highlight-row{
  background-color: pink
}
</style>
