<script setup lang="ts">
import { ValidationArgs } from '@vuelidate/core';
import Validation from './Validation.vue';

const props = withDefaults(defineProps<{
    id: string,
    modelValue: string | number | boolean | null,
    class?: string,
    name?: string,
    checked?: boolean,
    disabled?: boolean,
    validation?: ValidationArgs,
}>(), {
    checked: false,
});

const emit = defineEmits<{
    (on: "update:modelValue", value: string | number | boolean): void
}>();

</script>
<template>
    <div class="container">
        <label>
            <slot name="label" />
            <input type="checkbox" :id="id" :value="name" class="form-check-input" :class="class" :checked="checked" :disabled="disabled"
                @change="emit('update:modelValue', checked ?? false)" />
            <span class="checkmark"></span>
        </label>
        <Validation v-model="props.modelValue" :validation="props.validation"/>
    </div>
</template>
<style lang="scss" scoped>
.container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input~.checkmark {
    background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked~.checkmark {
    background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.container input:checked~.checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
</style>