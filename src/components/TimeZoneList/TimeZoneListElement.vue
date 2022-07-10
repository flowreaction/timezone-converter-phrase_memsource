<template>
    <div
        class="flex h-12 items-center justify-between px-4 even:bg-neutral-100 dark:even:bg-neutral-800/30 hover:dark:bg-neutral-800"
    >
        <span data-testid="city" class="w-1/3 grow truncate">{{
            props.city.city
        }}</span>
        <span data-testid="time" class="w-1/3 shrink">{{ calcTime }}</span>
        <div class="flex w-1/3 items-center justify-between">
            <span data-testid="timezone">{{ getZone }}</span>
            <button
                data-testid="remove-button"
                @click="cityStore.removeFromSelectedCities(props.city)"
                class="h-5 rounded bg-red-500 text-center align-text-top hover:bg-red-400"
            >
                <XIcon class="h-5 text-white" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment-timezone'
import XIcon from '~components/icons/XIcon.vue'

import { useSelectedTime } from '~composables/useSelectedTime'
import { useCityStore } from '~stores/useCityStore'

import { CityDisplay, TimeZoneView } from '~types'

interface Props {
    city: CityDisplay
    tzView: TimeZoneView
}

const { workingTime } = useSelectedTime()
const cityStore = useCityStore()

const calcTime = computed(() => {
    return moment(workingTime.value as moment.MomentInput)
        .tz(props.city.timezone)
        .format('HH:mm')
})

const getZone = computed(() => {
    switch (props.tzView) {
        case 'number':
            return moment().tz(props.city.timezone).format('Z')
        case 'name':
            return moment().tz(props.city.timezone).format('z')
    }
})

const props = defineProps<Props>()
</script>

<style scoped></style>
