import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faPen, faTrash, faCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus, faPen, faTrash, faCircle, faTimes)

Vue.component('f-icon', FontAwesomeIcon)