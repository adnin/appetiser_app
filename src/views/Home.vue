<template>
  <div class="py-6">
    <Banner message="Login successful" />
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-96" />
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script>
import { CHECK_AUTH, LOGOUT } from "@/store/actions.type";

import Banner from "@/components/Banner";

export default {
  name: "Home",
  components: { Banner },
  beforeCreate() {
    this.$store
      .dispatch(CHECK_AUTH)
      .then()
      .catch(() => {
        this.$store.dispatch(LOGOUT);
        this.$router.push({ name: "Login" });
        this.loading = false;
      });
  }
};
</script>
