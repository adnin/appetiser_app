<template>
  <div class="py-6">
    <div class="h-screen py-20 px-3 bg-purple-100">
      <div class="container mx-auto">
        <div class="max-w-sm mx-auto md:max-w-lg">
          <div class="w-full">
            <div class="bg-white h-70 py-3 rounded text-center">
              <h1 class="text-2xl font-bold">Enter your verification code</h1>
              <div class="flex flex-col mt-4">
                <span>We have sent a verification code to</span>
                <span>your email address.</span>
              </div>
              <VerificationInput :loading="false" v-on:complete="onComplete" />
              <div class="flex justify-center text-center mt-3">
                <a
                  class="flex items-center text-purple-700 hover:text-purple-900 cursor-pointer"
                  ><span class="font-bold">Verify &amp; Proceed</span
                  ><i class="bx bx-caret-right ml-1"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import VerificationInput from "@/components/VerificationInput";

export default {
  name: "Verification",
  components: {
    ErrorMessage,
    Loader,
    VerificationInput
  },
  methods: {
    onComplete(v) {
      console.log("onComplete ", v);
    }
  }
};
</script>
