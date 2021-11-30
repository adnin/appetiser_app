<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <h2 class="text-4xl font-bold mb-10 text-gray-800">
        Create Your Account
      </h2>
      <div class="space-y-5">
        <div>
          <label for="email" class="block mb-1 font-bold">Email</label>
          <input
            id="email"
            type="text"
            v-model="state.email"
            class="w-full border-2 border-gray-200 p-2 rounded-lg outline-none focus:border-purple-500"
          />
          <div
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            v-if="v$.email.$error"
          >
            {{ v$.email.$errors[0].$message }}
          </div>
        </div>
        <div>
          <label for="full_name" class="block mb-1 font-bold">Full Name</label>
          <input
            id="full_name"
            type="text"
            v-model="state.full_name"
            class="w-full border-2 border-gray-200 p-2 rounded-lg outline-none focus:border-purple-500"
          />
          <div
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            v-if="v$.full_name.$error"
          >
            {{ v$.full_name.$errors[0].$message }}
          </div>
        </div>
        <div>
          <label for="password" class="block mb-1 font-bold">Password</label>
          <input
            id="password"
            type="password"
            v-model="state.password"
            class="w-full border-2 border-gray-200 p-2 rounded-lg outline-none focus:border-purple-500"
          />
          <div
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            v-if="v$.password.$error"
          >
            {{ v$.password.$errors[0].$message }}
          </div>
        </div>
        <div>
          <label for="confirm_password" class="block mb-1 font-bold"
            >Confirm Password</label
          >
          <input
            id="password_confirmation"
            type="password"
            v-model="state.password_confirmation"
            class="w-full border-2 border-gray-200 p-2 rounded-lg outline-none focus:border-purple-500"
          />
          <div
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            v-if="v$.password_confirmation.$error"
          >
            Password confirmation does not match
          </div>
        </div>
        <button
          @click="onSubmit"
          class="block w-full bg-purple-600 p-4 rounded text-white"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "Register",
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
        password: { required, minLength: minLength(6) },
        password_confirmation: { sameAs: sameAs(state.password) }
      };
    });

    const v$ = useVuelidate(rules, state);

    return {
      state,
      v$
    };
  },

  computed: {},
  methods: {
    onSubmit() {
      this.v$.$validate();
      if (this.v$.error) {
      } else {
      }
    }
  }
};
</script>
