<template>
    <div class="p-0 border-0 shadow-none text-left grow">
        <label v-if="label" class="mb-1">{{ label }}</label>
        <select v-bind="{...$attrs, onChange: ($event) => { $emit('update:modelValue', $event.target.value) } }" :value="modelValue" class="select">
            <option v-for="option in options" :key="option" :value="option" :selected="option === modelValue">{{ option }}</option>
        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    name: 'select',
    props: {
        label: {
            type: String,
            required: false,
        },
        modelValue: {
            type: [String, Number],
            default: ''
        },
        options: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        props = reactive(props);
        return {
        }
    },
})
</script>

<style scoped>
.select {
    @apply bg-transparent border text-gray-600 sm:text-sm rounded-md block w-full h-10 px-2.5 py-2 transition duration-300 ease-in !important;
}
</style>