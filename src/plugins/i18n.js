import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      'not-selected': 'Select note or create note',
      'enter-title': 'Enter title',
      'enter-body': 'Enter text',
    },
    ru: {
      'not-selected': 'Выберите или создайте запись',
      'enter-title': 'Введите заголовок',
      'enter-body': 'Введите текст',
    }
  }
})

