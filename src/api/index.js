import axios from "axios";
import router from "../router";
import store from "../store";
const apiConfig = require(`../config/${process.env.NODE_ENV}/api.json`);

const UNAUTHORIZED = 401;
const onUnauthorized = () => {
  store.commit("LOGOUT");
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`);
};
const DOMAIN = apiConfig.backendUrl;

const request = (method, url, data) => {
  const { sessionId } = localStorage;
  data = Object.assign(data || {}, { sessionId });

  return axios({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((result) => {
      return result.data.data;
    })
    .catch((result) => {
      let status = result.response.status;
      const responseBody = result.response.data;

      const { err_message, err_code } = responseBody.data;
      if (status === UNAUTHORIZED) {
        onUnauthorized();
      }
      throw err_message;
    });
};

export const setAuthInHeader = (sessionId) => {
  axios.defaults.headers.common["sessionId"] = sessionId
    ? `${sessionId}`
    : null;
};

export const auth = {
  login(adminId, password) {
    return request("post", "/auth/login", { adminId, password });
  },
  regist(adminId, password, confirmPassword) {
    return request("post", "/auth/regist", {
      adminId,
      password,
      confirmPassword,
    });
  },
};

export const story = {
  create(story) {
    return request("post", "/story/create", story);
  },
  update(story) {
    return request("post", "/story/update", story);
  },
  updateMany(storyList) {
    return request("post", "/story/updateMany", storyList);
  },
  list() {
    return request("post", "/story/list");
  },
  info(storyId) {
    return request("post", "/story/info", { storyId });
  },
};

export const resource = {
  list(storyId) {
    return request("post", "/resource/list", storyId ? { storyId } : null);
  },
  update(resourceList) {
    return request("post", "/resource/update", resourceList);
  },
  updateMany(resourceList) {
    return request("post", "/resource/updateMany", resourceList);
  },
  delete(resoruceInfo) {
    return request("post", "/resource/delete", resoruceInfo);
  },
  deleteMany(storyId) {
    return request("post", "/resource/deleteMany", { storyId });
  },
  resetCrc(storyId) {
    return request("post", "/resource/resetcrc", { storyId });
  },
};

export const tzresource = {
  list(storyId) {
    return request("post", "/tzresource/list", storyId ? { storyId } : null);
  },
  updateMany(resourceList) {
    return request("post", "/tzresource/updateMany", resourceList);
  },
  update(resourceList) {
    return request("post", "/tzresource/update", resourceList);
  },
  delete(resourceInfo) {
    return request("post", "/tzresource/delete", resourceInfo);
  },
};

export const resource_ios = {
  list(storyId) {
    return request("post", "/resource_ios/list", storyId ? { storyId } : null);
  },
  update(resourceList) {
    return request("post", "/resource_ios/update", resourceList);
  },
  updateMany(resourceList) {
    return request("post", "/resource_ios/updateMany", resourceList);
  },
  delete(resoruceInfo) {
    return request("post", "/resource_ios/delete", resoruceInfo);
  },
  deleteMany(storyId) {
    return request("post", "/resource_ios/deleteMany", { storyId });
  },
  resetCrc(storyId) {
    return request("post", "/resource_ios/resetcrc", { storyId });
  },
};

export const arStickerResource = {
  list() {
    return request("post", "/ar_sticker/list", null);
  },
  update(resourceList) {
    return request("post", "/ar_sticker/update", resourceList);
  },
};

export const arStickerResourceIos = {
  list() {
    return request("post", "/ar_sticker_ios/list", null);
  },
  update(resourceList) {
    return request("post", "/ar_sticker_ios/update", resourceList);
  },
};

export const dnnResource = {
  list() {
    return request("post", "/dnn_resource/list", null);
  },
  update(resourceList) {
    return request("post", "/dnn_resource/update", resourceList);
  },
  updateMany(resourceList) {
    return request("post", "/dnn_resource/updateMany", resourceList);
  },
};

export const commonResource = {
  list() {
    return request("post", "/common_resource/list", null);
  },
  update(resourceList) {
    return request("post", "/common_resource/update", resourceList);
  },
  updateMany(resourceList) {
    return request("post", "/common_resource/updateMany", resourceList);
  },
};

export const item = {
  list() {
    return request("post", "/item/list", {});
  },
  delete(item) {
    return request("post", "/item/delete", item);
  },
  create(item) {
    return request("post", "/item/create", item);
  },
  update(item) {
    return request("post", "/item/update", item);
  },
  updateMany(item) {
    return request("post", "/item/updateMany", item);
  },
  updateManyMaterial(item) {
    return request("post", "/item/updateManyMaterial", item);
  },
};

export const product = {
  list() {
    return request("post", "/product/list", {});
  },
  delete(product) {
    return request("post", "/product/delete", product);
  },
  create(product) {
    return request("post", "/product/create", product);
  },
  update(product) {
    return request("post", "/product/update", product);
  },
  updateMany(product) {
    return request("post", "/product/updateMany", product);
  },
  updateManyReward(product) {
    return request("post", "/product/updateManyReward", product);
  },
};

export const productGroup = {
  list() {
    return request("post", "/productGroup/list", {});
  },
  delete(product) {
    return request("post", "/productGroup/delete", product);
  },
  create(product) {
    return request("post", "/productGroup/create", product);
  },
  update(product) {
    return request("post", "/productGroup/update", product);
  },
  updateMany(product) {
    return request("post", "/productGroup/updateMany", product);
  },
};

export const category = {
  list() {
    return request("post", "/category/list", {});
  },
  delete(item) {
    return request("post", "/category/delete", item);
  },
  create(item) {
    return request("post", "/category/create", item);
  },
  update(item) {
    return request("post", "/category/update", item);
  },
  updateMany(item) {
    return request("post", "/category/updateMany", item);
  },
};

export const dataTable = {
  update(versionInfo) {
    return request("post", "/datatable/update", versionInfo);
  },
  list() {
    return request("post", "/datatable/list", {});
  },
  get(tableInfo) {
    return request("post", "/datatable/get", tableInfo);
  },
};

export const version = {
  update(version) {
    return request("post", "/version/update", version);
  },
  list() {
    return request("post", "/version/list", {});
  },
};

export const coupon = {
  list() {
    return request("post", "/coupon/list", {});
  },
  create(couponInfo) {
    return request("post", "/coupon/create", couponInfo);
  },
  update(couponInfo) {
    return request("post", "/coupon/update", couponInfo);
  },
  delete(couponInfo) {
    return request("post", "/coupon/delete", couponInfo);
  },
};

export const couponReward = {
  list(couponInfo) {
    return request("post", "/couponReward/list", couponInfo);
  },
  update(couponInfo, couponRewardList) {
    return request(
      "post",
      "/couponReword/update",
      couponInfo,
      couponRewardList
    );
  },
};

export const couponCode = {
  list(couponInfo) {
    return request("post", "/coupon_code/list", couponInfo);
  },
  insert(couponInfo) {
    return request("post", "/coupon_code/insert", couponInfo);
  },
};

export const questStory = {
  list(questStory) {
    return request("post", "/quest_story/list", questStory);
  },
  updateMany(questStory) {
    return request("post", "/quest_story/updateMany", questStory);
  },
};

export const user = {
  list(item) {
    return request("post", "/user/list", item);
  },
  inventory(item) {
    return request("post", "/user/inventory", item);
  },
  edit(item) {
    return request("post", "/user/edit", item);
  },
};

export const ip = {
  list() {
    return request("post", "/ip/list");
  },
  create(item) {
    return request("post", "/ip/create", item);
  },
  edit(item) {
    return request("post", "/ip/edit", item);
  },
  delete(item) {
    return request("post", "/ip/delete", item);
  },
};

export const serverStatus = {
  list() {
    return request("post", "/serverStatus/list");
  },
  create(item) {
    return request("post", "/serverStatus/create", item);
  },
};

export const pushMessage = {
  create(item) {
    return request("post", "/push/create", item);
  },
};

export const tempEvent = {
  list() {
    return request("post", "/tempEvent/list");
  },
  create(item) {
    return request("post", "/tempEvent/create", item);
  },
};

export const userquest = {
  delete(userInfo) {
    return request("post", "/userquest/delete", userInfo);
  },
};
