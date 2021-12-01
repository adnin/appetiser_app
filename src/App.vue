<template>
  <Header />
  <div class="mt-10">
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  components: {
    Header
  }
};
</script>
