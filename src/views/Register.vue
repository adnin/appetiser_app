<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <h4 class="text-2xl font-bold">Create Your Account</h4>
      <div v-if="errors">
        <ErrorMessage v-for="(v, k) in errors" :key="k" :message="v" />
      </div>
      <div class="space-y-3">
        <div>
          <label for="email" class="block mb-1 font-bold">Email</label>
          <input
            id="email"
            type="text"
            v-model="state.email"
            class="w-full border-2 border-purple-200 p-2 rounded-lg outline-none focus:border-purple-500"
          />
          <div
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            v-if="v$.email.$error"
          >
            <ErrorMessage message="You must enter a valid email." />
          </div>
        </div>
        <div>
          <label for="full_name" class="block mb-1 font-bold">Full Name</label>
          <input
            id="full_name"
            type="text"
            v-model="state.full_name"
            class="w-full border-2 border-purple-200 p-2 rounded-lg outline-none focus:border-purple-500"
          />
          <div
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            v-if="v$.full_name.$error"
          >
            <ErrorMessage message="Full Name is required." />
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
        <div>
          <label for="password_confirmation" class="block mb-1 font-bold"
            >Confirm Password</label
          >
          <input
            id="password_confirmation"
            type="password"
            v-model="state.password_confirmation"
            class="w-full border-2 border-purple-200 p-2 rounded-lg outline-none focus:border-purple-500"
          />
          <div v-if="v$.password_confirmation.$error">
            <ErrorMessage message="Password confirmation does not match." />
          </div>
        </div>
        <button
          @click="onSubmit"
          id="register_button"
          class="block w-full bg-purple-600 p-4 rounded text-white font-bold"
        >
          Register
        </button>
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
import { required, email, sameAs } from "@vuelidate/validators";
import { reactive, computed } from "vue";

import { REGISTER, LOGOUT } from "@/store/actions.type";
import ErrorMessage from "@/components/ErrorMessage";
import Loader from "@/components/Loader";

export default {
  name: "Register",
  components: {
    ErrorMessage,
    Loader
  },
  setup() {
    const state = reactive({
      email: "",
      full_name: "",
      password: "",
      password_confirmation: ""
    });

    const rules = computed(() => {
      return {
        email: { required, email },
        full_name: { required },
        password: { required },
        password_confirmation: { sameAs: sameAs(state.password) }
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
  created() {
    this.$store.dispatch(LOGOUT);
  },
  methods: {
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.loading = true;
        this.$emit("submit", this.state);
        this.$store
          .dispatch(REGISTER, this.state)
          .then(() => {
            this.loading = false;
            this.$router.push({ name: "Verification" });
          })
          .catch(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>
