import { mount } from "@vue/test-utils";
import Register from "@/views/Register.vue";

describe("Register.vue", () => {
  test("submits a form", async () => {
    const wrapper = mount(Register);
    const email = "adninonofre@gmail.com";
    const full_name = "Adnin Onofre";
    const password = "password";
    const password_confirmation = "password";

    await wrapper.find("#email").setValue(email);
    await wrapper.find("#full_name").setValue(full_name);
    await wrapper.find("#password").setValue(password);
    await wrapper
      .find("#password_confirmation")
      .setValue(password_confirmation);

    const registerButton = wrapper.find("#register_button");

    registerButton.trigger("click");

    expect(wrapper.emitted("submit")[0][0]).toStrictEqual({
      email,
      full_name,
      password,
      password_confirmation
    });
  });
});
