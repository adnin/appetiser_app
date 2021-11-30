<template>
  <div class="about">
    <h1>This is an about page</h1>
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
