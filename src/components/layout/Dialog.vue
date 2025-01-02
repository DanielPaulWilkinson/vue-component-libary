<script setup lang="ts">
import { useSlots, ref, watch } from "vue";
const props = withDefaults(defineProps<{
    id: string;
    visible: boolean;
    title?: string | undefined;
}>(), {
    title: undefined,
});

const slots = useSlots();
const dialog = ref<HTMLDialogElement>();
watch(() => props.visible, (open) => {
    open ? dialog.value?.showModal() : dialog.value?.close();
});

</script>
<template>
    <Transition>
    <dialog :id="id" ref="dialog" role="modal" :open="props.visible">
        <div class="dialog-content">
            <div v-if="props.title" class="dialog-header">
                <h5 class="dialog-title">
                    {{ title }}
                </h5>
            </div>
            <div v-else>
                <slot name="header" />
            </div>

            <div v-if="slots.body" class="dialog-body">
                <slot name="body" />
            </div>
            <div v-if="slots.footer" class="dialog-footer">
                <slot name="footer" />
            </div>
        </div>
    </dialog>
    </Transition>
</template>
<style>
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