import Vue from 'vue'

export class Forage {

  constructor() {
    this.store = window.localStorage
  }

  get(key, defaultData = undefined) {
    if (!key) {
      throw new Error('Key param is required')
    }

    const item = this.store.getItem(key)

    if (!item && defaultData) {
      return defaultData
    }

    try {
      return JSON.parse(item)
    } catch (error) {
      return item
    }
  }

  set(key, payload) {
    if (!key || !payload) {
      throw new Error(`key: ${key} OR payload ${payload} is missing`)
    }

    let item

    if (typeof payload === 'object' && payload !== null) {
      item = JSON.stringify(payload)
    } else {
      item = payload
    }

    this.store.setItem(key, item)
  }

  delete(key) {
    if (!key) {
      throw new Error('Key param is required')
    }

    this.store.removeItem(key)
  }
}

Vue.prototype.$forage = new Forage()