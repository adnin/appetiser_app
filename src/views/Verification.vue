<template>
  <div class="py-6">
    <div class="h-screen py-20 px-3 bg-purple-100">
      <div class="container mx-auto">
        <div class="max-w-sm mx-auto md:max-w-lg">
          <div class="w-full">
            <div class="bg-white h-64 py-3 rounded text-center">
              <h1 class="text-2xl font-bold">Enter your verification code</h1>
              <div class="flex flex-col mt-4">
                <span>We have sent a verification code to</span>
                <span>your email address.</span>
              </div>
              <div
                id="otp"
                class="flex flex-row justify-center text-center px-2 mt-5"
              >
                <input
                  class="focus:outline-none m-2 border-2 border-purple-200 font-bold h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="first"
                  maxlength="1"
                />
                <input
                  class="focus:outline-none m-2 border-2 border-purple-200 font-bold h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="second"
                  maxlength="1"
                />
                <input
                  class="focus:outline-none m-2 border-2 border-purple-200 font-bold h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="third"
                  maxlength="1"
                />
                <input
                  class="focus:outline-none m-2 border-2 border-purple-200 font-bold h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="fourth"
                  maxlength="1"
                />
                <input
                  class="focus:outline-none m-2 border-2 border-purple-200 font-bold h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="fifth"
                  maxlength="1"
                />
              </div>
              <div class="flex justify-center text-center mt-5">
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

export default {
  name: "Verification",
  components: {
    ErrorMessage,
    Loader
  }
};
</script>
