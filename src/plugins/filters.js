import Vue from 'vue'
import { get, truncate } from 'lodash-es'
import { format, parseISO } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'

const filters = {}

filters.get = function (value, path, defaultValue = ' - ') {
  return get(value, path, defaultValue)
}

filters.trunc = function (value, length = 100) {
  return truncate(value, { length })
}

filters.date = function (value, dateFormat = 'dd/MM/yyyy') {
  if (value instanceof Date || Object.prototype.toString.call(value) === '[object Date]') {
    return format(value, dateFormat, { locale: ruLocale })
  }

  if (typeof value === 'string' && value !== ' - ') {
    return format(parseISO(value), dateFormat, { locale: ruLocale })
  }

  return ' - '
}

for (const [filterName, func] of Object.entries(filters)) {
  Vue.filter(filterName, func)
}
