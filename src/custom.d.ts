import SessionManager from "./Vision/SessionManager";

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module 'vue/types/vue' {
  interface Vue {
    $vuexr: SessionManager;
  }
}
