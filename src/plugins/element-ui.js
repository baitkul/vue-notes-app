import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'

import {
  Form,
  FormItem,
  Switch,
  Radio,
  RadioGroup,
} from 'element-ui'


// Set configuration
Vue.prototype.$ELEMENT = {
  size: 'mini'
}

// Use components on demand
Vue.use(Switch)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)

