import Vue from "vue";
import VueRouter from "vue-router";
import VCalendar from "v-calendar";

import Login from "../components/Login.vue";
import SignIn from "../components/SignIn.vue";
import StoryList from "../components/StoryList.vue";
import StoryInfoTab from "../components/StoryInfoTab.vue";
import StoryInfo from "../components/StoryInfo.vue";
import AosUpload from "../components/AosUpload.vue";
import IosUpload from "../components/IosUpload.vue";
import TZAosUpload from "../components/TZAosUpload.vue";
import ItemList from "../components/ItemList.vue";
import ItemCategory from "../components/ItemCategory.vue";
import Shop from "../components/Shop.vue";
import ShopGroup from "../components/ShopGroup.vue";
import DataTable from "../components/DataTable.vue";
import ResourceList from "../components/ResourceList.vue";
import DnnResource from "../components/DnnResource.vue";
import CommonResource from "../components/CommonResource.vue";
import Coupon from "../components/Coupon.vue";
import UserList from "../components/UserList.vue";
import IpList from "../components/IpList.vue";
import ServerStatus from "../components/ServerStatus.vue";
import PushMessage from "../components/PushMessage.vue";
import TempEvent from "../components/TempEvent.vue";
import AppVersion from "../components/AppVersion.vue";
import ArSticker from "../components/ArStickerTab.vue";
import ArStickerIos from "../components/ArStickerIos.vue";
import ArStickerAos from "../components/ArStickerAos.vue";
import Mission from "../components/StoryMission.vue";

import Home from "../components/Home.vue";

import NotFound from "../components/NotFound.vue";

import store from "../store";

import JsonExcel from "vue-json-excel";
Vue.use(VueRouter);
Vue.use(VCalendar, {
  componentPrefix: "vc",
});
Vue.component("downloadExcel", JsonExcel);

const requireAuth = async (to, from, next) => {
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`;

  const { sessionId, adminId } = localStorage;

  await store.commit("LOGIN", { sessionId, adminId } || {});

  store.getters.isAuth ? await next() : await next(loginPath);
};

const router = new VueRouter({
  mode: "history",
  routes: getRouteList(),
});

function getRouteList() {
  const service = process.env.NODE_ENV;
  return service.startsWith("cms") ? getCmsRoutes() : getUmsRoutes();
}

function getUmsRoutes() {
  return [
    {
      path: "/",
      component: Home,
      beforeEnter: requireAuth,
      redirect: "/userlist",
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/sign-in",
      component: SignIn,
    },
    {
      path: "/userlist",
      beforeEnter: requireAuth,
      component: UserList,
    },
    {
      path: "/iplist",
      beforeEnter: requireAuth,
      component: IpList,
    },
    {
      path: "/server",
      beforeEnter: requireAuth,
      component: ServerStatus,
    },
    {
      path: "/push_message",
      beforeEnter: requireAuth,
      component: PushMessage,
    },
    {
      path: "/temp_event",
      beforeEnter: requireAuth,
      component: TempEvent,
    },
  ];
}

function getCmsRoutes() {
  return [
    {
      path: "/",
      component: Home,
      beforeEnter: requireAuth,
      redirect: "/story",
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/sign-in",
      component: SignIn,
    },
    {
      path: "/aos_upload",
      component: AosUpload,
      beforeEnter: requireAuth,
    },
    {
      path: "/ios_upload",
      component: IosUpload,
      beforeEnter: requireAuth,
    },
    {
      path: "/story",
      component: StoryList,
      beforeEnter: requireAuth,
    },
    {
      path: "/item",
      component: ItemList,
      beforeEnter: requireAuth,
    },
    {
      path: "/itemCategory",
      component: ItemCategory,
      beforeEnter: requireAuth,
    },
    {
      path: "/shop",
      component: Shop,
      beforeEnter: requireAuth,
    },
    {
      path: "/shopGroup",
      component: ShopGroup,
      beforeEnter: requireAuth,
    },
    {
      path: "/dataTable",
      component: DataTable,
      beforeEnter: requireAuth,
    },
    {
      path: "/patch",
      component: StoryList,
      beforeEnter: requireAuth,
    },
    {
      path: "/resource",
      component: ResourceList,
      beforeEnter: requireAuth,
    },
    {
      path: "/dnnResource",
      component: DnnResource,
      beforeEnter: requireAuth,
    },
    {
      path: "/commonResource",
      component: CommonResource,
      beforeEnter: requireAuth,
    },
    {
      path: "/arSticker",
      component: ArSticker,
      beforeEnter: requireAuth,
      children: [
        { path: "aos", component: ArStickerAos },
        { path: "ios", component: ArStickerIos },
      ],
    },
    {
      path: "/coupon",
      component: Coupon,
      beforeEnter: requireAuth,
    },
    {
      path: "/appVersion",
      component: AppVersion,
      beforeEnter: requireAuth,
    },
    {
      path: "/story/:storyId",
      component: StoryInfoTab,
      beforeEnter: requireAuth,
      children: [
        { path: "info", component: StoryInfo },
        { path: "aos", component: AosUpload },
        { path: "ios", component: IosUpload },
        { path: "mission", component: Mission },
        { path: "tzaos", component: TZAosUpload },
      ],
    },
    {
      path: "*",
      component: NotFound,
      beforeEnter: requireAuth,
    },
  ];
}

export default router;
