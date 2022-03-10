<template>
    <div class="p-0 border-0 shadow-none text-left grow">
        <label v-if="label" class="mb-1">{{ label }}</label>
        <input v-bind="$attrs" :value="modelValue" type="text" @input="$emit('update:modelValue', $event.target.value)" class="input"  />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    name: 'input',
    props: {
        label: {
            type: String,
            required: false,
        },
        modelValue: {
            type: [String, Number],
            default: ''
        }
    },
    setup(props, context) {
        props = reactive(props);
        return {
        }
    },
})
</script>

<style scoped>
.input {
    @apply bg-transparent border border-gray-300 text-white font-normal rounded-md block w-full h-10 px-2.5 py-2 transition duration-300 ease-in !important;
}
</style>