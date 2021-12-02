<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <h4 class="text-2xl font-bold mb-10">Log In to Your Account</h4>
      <div v-if="errors">
        <ErrorMessage v-for="(v, k) in errors" :key="k" :message="v" />
      </div>
      <div class="space-y-5">
        <div>
          <label for="username" class="block mb-1 font-bold">Username</label>
          <input
            id="username"
            type="text"
            v-model="state.username"
            class="w-full border-2 border-purple-200 p-2 rounded-lg outline-none focus:border-purple-500"
          />
          <div
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            v-if="v$.username.$error"
          >
            <ErrorMessage message="You must enter a valid username." />
          </div>
        </div>
        <div>
          <label for="password" class="block mb-1 font-bold">Password</label>
          <input
            id="password"
            type="password"
            v-model="state.password"
            class="w-full border-2 border-purple-200 p-2 rounded-lg outline-none focus:border-purple-500"
          />
          <div
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            v-if="v$.password.$error"
          >
            <ErrorMessage message="Password is required." />
          </div>
        </div>
        <button
          @click="onSubmit"
          id="login_button"
          class="block w-full bg-purple-600 p-4 rounded text-white font-bold"
        >
          Login
        </button>
        <div class="flex justify-center w-full">
          <span
            >Not a member?
            <a
              href="#"
              @click="register"
              class="text-indigo-600 hover:text-indigo-500"
            >
              Register
            </a></span
          >
        </div>
        <div v-if="loading">
          <Loader />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, computed } from "vue";

import { LOGIN } from "@/store/actions.type";
import ErrorMessage from "@/components/ErrorMessage";
import Loader from "@/components/Loader";

export default {
  name: "Login",
  components: {
    ErrorMessage,
    Loader
  },
  setup() {
    const state = reactive({
      username: "",
      password: ""
    });

    const rules = computed(() => {
      return {
        username: { required },
        password: { required }
      };
    });

    const v$ = useVuelidate(rules, state);

    return {
      state,
      v$
    };
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
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.loading = true;
        this.$emit("submit", this.state);
        this.$store
          .dispatch(LOGIN, this.state)
          .then(() => {
            this.loading = false;
            this.$router.push({ name: "Home" });
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    register() {
      this.$router.push("/register");
    }
  }
};
</script>
