<template>
    <div
        class="flex h-12 items-center justify-between px-4 even:bg-neutral-100 dark:even:bg-neutral-800"
    >
        <span class="w-1/3 grow truncate">{{ props.city.city }}</span>
        <span class="w-1/3 shrink">{{ calcTime }}</span>
        <div class="flex w-1/3 items-center justify-between">
            <span>{{ getZone }}</span>
            <button
                @click="removeTimezone(props.city)"
                class="h-5 rounded bg-red-500 text-center align-text-top hover:bg-red-400"
            >
                <XIcon class="h-5 text-white" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment-timezone'
import XIcon from './icons/XIcon.vue'
import { useTimezones, type City } from '../composables/useTimezones'
import { useSelectedTime } from '../composables/useSelectedTime'
import { computed } from 'vue'

interface Props {
    city: City
}

const { workingTime } = useSelectedTime()
const { removeTimezone } = useTimezones()

const calcTime = computed(() => {
    return moment(workingTime.value as moment.MomentInput)
        .tz(props.city.timezone)
        .format('HH:mm')
})

const getZone = computed(() => {
    return moment().tz(props.city.timezone).format('z')
})

const props = defineProps<Props>()
</script>

<style scoped></style>
