import Vue from 'vue'
import get from 'lodash-es/get'
import truncate from 'lodash-es/truncate'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

const filters = {}

filters.get = function (value, path, defaultValue = ' - ') {
  return get(value, path, defaultValue)
}

filters.trunc = function (value, length = 100) {
  return truncate(value, { length })
}

filters.date = function (value, dateFormat = 'dd/MM/yyyy') {
  if (value instanceof Date || Object.prototype.toString.call(value) === '[object Date]') {
    return format(value, dateFormat)
  }

  if (typeof value === 'string' && value !== ' - ') {
    return format(parseISO(value), dateFormat)
  }

  return ' - '
}

for (const [filterName, func] of Object.entries(filters)) {
  Vue.filter(filterName, func)
}
