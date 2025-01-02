<script setup lang="ts">
import { useSlots } from 'vue';
const props = withDefaults(defineProps<{
    id: string;
    visible: boolean;
    title?: string | undefined;
    cross?: boolean;
    header: string;
}>(), {
    title: undefined,
    cross: true,
});
const slots = useSlots();
const emit = defineEmits<{
    (on: "close"): void
}>();
</script>
<template>
    <div
        v-if="visible"
        :id="props.id"
        class="overlay"
        @click.prevent="emit('close')"
    />
    <div
        v-if="visible"
        :class="visible ? 'modal-show' : ''"
        class="modal"
    >
        <div
            class="modal-dialog"
        >
            <div class="modal-content">
                <div
                    v-if="slots.title"
                >
                    <slot
                        name="title"
                    />
                </div>
                <div
                    v-if="header"
                    class="modal-header"
                >
                    <h5
                        class="modal-title"
                    >
                        {{ header }}
                    </h5>
                    <button
                        v-if="cross"
                        :id="`close-${id}`"
                        type="button"
                        class="btn-close"
                        aria-label="close"
                        @click.prevent="emit('close')"
                    />
                </div>
                <div
                    v-if="slots.body"
                    class="modal-body"
                >
                    <slot
                        name="body"
                    />
                </div>
                <div
                    v-if="slots.footer"
                    class="modal-footer"
                >
                    <slot
                        name="footer"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<style>

.modal-show {
    display: block;
    display: flex;
    justify-content: center;
    background-color: #876;
    opacity: 0.8;
}

.modal-content {
    top:45%;
    min-width: 400px;

}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>