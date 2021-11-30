<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <h2 class="text-4xl font-bold mb-10 text-gray-800">
        Create Your Account
      </h2>
      <form class="space-y-5">
        <div>
          <label for="email" class="block mb-1 font-bold">Email</label>
          <input
            id="email"
            type="email"
            class="w-full border-2 border-gray-200 p-2 rounded-lg outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label for="full_name" class="block mb-1 font-bold">Full Name</label>
          <input
            id="full_name"
            type="text"
            class="w-full border-2 border-gray-200 p-2 rounded-lg outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label for="password" class="block mb-1 font-bold">Password</label>
          <input
            id="password"
            type="password"
            class="w-full border-2 border-gray-200 p-2 rounded-lg outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label for="confirm_password" class="block mb-1 font-bold"
            >Confirm Password</label
          >
          <input
            id="confirm_password"
            type="password"
            class="w-full border-2 border-gray-200 p-2 rounded-lg outline-none focus:border-purple-500"
          />
        </div>
        <button class="block w-full bg-purple-600 p-4 rounded text-white">
          Register
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      full_name: "",
      password: "",
      password_confirmation: ""
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      console.log("register");
    }
  }
};
</script>
