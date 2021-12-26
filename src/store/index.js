import {
  defineStore
} from 'pinia'

export let useStore = defineStore( {
  id:"main",
  state: () => ({
    selectTime: "2021-12-12",
  }),
  getters: {


  },
  actions: {
    /**/
    EDIT_SELECTTIME(payload){
      console.log(323333333333333);
      this.selectTime=payload

    }

  },
})
console.log(useStore);