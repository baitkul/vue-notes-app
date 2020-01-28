import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPlus,
  faPen,
  faTrash,
  faCircle,
  faTimes,
  faFileAlt,
  faBell,
  faCog,
  faBackspace,
  faArrowLeft,
  faThumbtack,
  faSyncAlt
} from '@fortawesome/free-solid-svg-icons'

import {
  faGithub
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faPlus,
  faPen,
  faTrash,
  faCircle,
  faTimes,
  faFileAlt,
  faBell,
  faCog,
  faBackspace,
  faArrowLeft,
  faThumbtack,
  faSyncAlt,

  // brands
  faGithub,
)

Vue.component('f-icon', FontAwesomeIcon)