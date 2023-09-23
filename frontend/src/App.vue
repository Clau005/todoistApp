<script  lang="ts">
import { defineComponent } from "vue";
import {mapState} from "vuex"

export default defineComponent({
  
  computed: {
    ...mapState(['user'])
  }
})
</script>


<template>
  <div>{{ user.data.name }}</div>
  <router-view :key="$route.path"></router-view>
</template>


