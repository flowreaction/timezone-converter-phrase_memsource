<template>
    <div class="flex flex-col gap-2">
        <label for="timeinput" class="block">Enter time</label>
        <input
            type="datetime-local"
            name="timeinput"
            id="timeinput"
            data-testid="timeinput"
            class="form-input w-full rounded border px-4 py-2 text-2xl shadow dark:bg-neutral-300 dark:text-neutral-900 md:w-1/2"
            :value="workingTime.format('YYYY-MM-DDTHH:mm')"
            @input="setUsersTime"
        />
        <button
            data-testid="resetbutton"
            class="w-full min-w-fit rounded bg-teal-600 px-4 text-base text-white disabled:bg-neutral-200 disabled:text-neutral-400 dark:disabled:text-neutral-500 md:max-w-fit"
            @click="resetUsersTime"
            :disabled="usersTime !== null ? false : true"
        >
            Use current time (
            <span class="text-base">
                {{ localCurrentTime.format('HH:mm') }}
            </span>
            )
        </button>
    </div>
</template>

<script setup lang="ts">
import { useSelectedTime } from '~composables/useSelectedTime'

const {
    resetUsersTime,
    setUsersTime,
    workingTime,
    localCurrentTime,
    usersTime,
} = useSelectedTime()
</script>

<style scoped></style>
