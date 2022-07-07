import { useNow } from '@vueuse/core'
import { computed, ref } from 'vue'
import moment from 'moment'

//reactive Date object
const localCurrentTime = computed(() => moment(useNow().value))

//Date Object which will be set when user inputs data
const usersTime = ref<moment.Moment | null>(null)

//computed Moment object which will be used in all other calculations
const workingTime = computed(() => {
    if (usersTime.value) {
        return usersTime.value
    } else {
        return localCurrentTime.value
    }
})

//setting and resetting usersTime
const resetUsersTime = () => (usersTime.value = null)
const setUsersTime = (e: Event) => {
    const inputElement = e.target as HTMLInputElement
    const datestring = inputElement.value
    usersTime.value = moment(datestring)
}

export function useSelectedTime() {
    return {
        workingTime,
        resetUsersTime,
        setUsersTime,
        usersTime,
        localCurrentTime,
    }
}
