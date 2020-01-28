<template>
  <div
    class="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black-25"
    @click.self="dismissDialog"
  >
    <div class="w-6/12 px-4 py-2 overflow-hidden bg-white rounded shadow-lg">
      <div class="flex items-center">
        <h4 class="tracking-wide text-gray-700 uppercase">Settings</h4>
        <span
          class="p-1 ml-auto text-sm leading-none text-gray-500 cursor-pointer hover:text-gray-700"
          @click="dismissDialog"
        >
          <f-icon icon="times" />
        </span>
      </div>

      <el-form
        ref="form"
        class="mt-6"
        :model="model"
        label-position="left"
        label-width="180px"
      >
        <el-form-item class="text-right">
          <h5 slot="label" class="text-xs font-medium leading-loose text-gray-700 uppercase">Localstorage sync</h5>
          <el-switch v-model="model.syncToLocalStorage"/>
        </el-form-item>

        <el-form-item class="text-right">
          <h5 slot="label" class="text-xs font-medium leading-loose text-gray-700 uppercase">App language</h5>
          <el-radio-group
            v-model="model.locale"
            size="mini"
            class="flex justify-end w-full"
          >
            <el-radio label="ru" class="flex items-center">
              <span class="flex items-center">
                <img src="https://www.countryflags.io/ru/shiny/16.png"/>
                <span class="ml-2 text-xs font-normal leading-loose uppercase">ru</span>
              </span>
            </el-radio>
            <el-radio label="en" class="flex items-center">
              <span class="flex items-center">
                <img src="https://www.countryflags.io/us/shiny/16.png"/>
                <span class="ml-2 text-xs font-normal leading-loose uppercase">en</span>
              </span>
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  Form,
  FormItem,
  Switch,
  Radio,
  RadioGroup,
} from 'element-ui'

export default {
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElSwitch: Switch,
    ElRadio: Radio,
    ElRadioGroup: RadioGroup,
  },

  data() {
    return {
      model: {}
    }
  },

  methods: {
    dismissDialog() {
      this.$store.commit('TOGGLE_SETTINGS_DIALOG', false)
    }
  }
}
</script>

<style>
.bg-black-25 {
  background-color: rgba(0,0,0,0.25);
}
</style>