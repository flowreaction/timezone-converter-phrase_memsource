<script setup lang="ts">
import { reactive } from 'vue'
import TimeInput from '~components/TimeInput.vue'
import TimeZoneList from '~components/TimeZoneList/TimeZoneList.vue'
import TimeZoneListElement from '~components/TimeZoneList/TimeZoneListElement.vue'
import SearchModal from '~components/SearchModal/SearchModal.vue'

//use Pinia city store
import { useCityStore } from './stores/useCityStore'

//import composables
// import { useTimezones } from './composables/useTimezones'
// const { selectedCities, fetchTimezones } = useTimezones()
// fetchTimezones()

const cityStore = useCityStore()
cityStore.fetchCities()
</script>

<template>
    <div
        class="container mx-auto flex h-screen max-w-4xl flex-col gap-4 bg-neutral-50 p-4 dark:bg-neutral-900 dark:text-neutral-300"
    >
        <h1
            class="mb-8 text-4xl text-sky-800 dark:text-stone-300 md:mb-16 md:text-5xl"
        >
            Timezone Converter
        </h1>
        <p class="my-4 max-w-xl">
            Use this timezone converter to convert your local time or specified
            time to any other time zone. Simply search for a City to add it to
            the timzones table and see the converted time. You can switch
            between the timezone name and it's UTC offset.
        </p>
        <section class="mb-8 px-4">
            <TimeInput />
        </section>
        <div class="flex flex-col justify-between md:flex-row md:items-center">
            <h1 class="mb-4 text-3xl">Your Timezones</h1>
            <SearchModal class="" />
        </div>
        <div class="flex flex-col gap-4">
            <TimeZoneList v-slot="{ tzview }">
                <TimeZoneListElement
                    v-for="(el, index) in cityStore.getSelectedCities"
                    :key="index"
                    :tz-view="tzview"
                    :city="el"
                ></TimeZoneListElement>
            </TimeZoneList>
            <!-- <ZoneInput /> -->
        </div>
    </div>
</template>

<style></style>
