<template>
  <div class="py-6">
    <div class="h-screen py-20 px-3 bg-purple-100">
      <div class="container mx-auto">
        <div class="max-w-sm mx-auto md:max-w-lg">
          <div class="w-full">
            <div class="bg-white h-70 py-3 rounded text-center">
              <h1 class="text-2xl font-bold">Enter your verification code</h1>
              <div class="flex text-center justify-center" v-if="errors">
                <ErrorMessage v-for="(v, k) in errors" :key="k" :message="v" />
              </div>
              <div class="flex flex-col mt-2">
                <span>We have sent a verification code to</span>
                <span>your email address.</span>
              </div>
              <VerificationInput
                :loading="loading"
                v-on:complete="onComplete"
              />
              <div class="mt-2" v-if="loading">
                <Loader />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import VerificationInput from "@/components/VerificationInput";
import { VERIFY, LOGOUT } from "@/store/actions.type";

export default {
  name: "Verification",
  components: {
    ErrorMessage,
    Loader,
    VerificationInput
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState({
      errors: (state) => state.auth.errors
    })
  },
  methods: {
    onComplete(v) {
      this.loading = true;
      const verification_code = {
        token: v,
        via: "email"
      };
      this.$store
        .dispatch(VERIFY, verification_code)
        .then(() => {
          this.loading = false;
          this.$store.dispatch(LOGOUT);
          this.$router.push({ name: "Login" });
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
