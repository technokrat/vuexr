import {VueXRManager} from "./VueXRManager"

declare module "@vue/runtime-core" {
  //Bind to `this` keyword
  interface ComponentCustomProperties {
    $vuexr: VueXRManager;
  }
}
