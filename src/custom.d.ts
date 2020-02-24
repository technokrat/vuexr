import {VueXR} from "./vuexr";
import Vue from "vue";

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module 'vue/types/vue' {
  interface Vue {
    $vuexr: VueXR
  }
}

