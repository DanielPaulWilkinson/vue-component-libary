<script setup lang="ts">
import RadioSet from '@/components/fields/RadioSet.vue';
import StarRating from '@/components/fields/StarRating.vue';
import Text from '@/components/fields/Text.vue';
import Textarea from '@/components/fields/Textarea.vue';
import Question from '@/components/layout/Question.vue';
import Modal from '@/components/Modal.vue';
import RadioInput from '@/components/fields/RadioInput.vue';
import FillCoffee from '@/components/layout/FillCoffee.vue';
import { reactive } from 'vue';
import { useAppStore } from '@/stores/app';
import CheckBox from '@/components/fields/CheckBox.vue';
import { brewFormValidator } from '@/validation/validation';
import useVuelidate from '@vuelidate/core';
import Validation from '@/components/fields/Validation.vue';


const store = useAppStore();
const v$ = useVuelidate();

const state = reactive({
    modalState: false,
})

const mockSubmitFeedback = async () => {
    const isValid = await v$.value.$validate();

    if (!isValid) {
        return;
    } else {
        console.log(store);
    }

}

const validator = brewFormValidator(store);

</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>Coffee Feedback Form</h1>
                <hr class="mt-4" />
                <div class="row">
                    <div class="col-6">
                        <h4>Coffee Bought</h4>

                        <Question name="coffeeTypes" tooltip="" label="Coffee selection" class="col-12">
                            <RadioSet id="coffee-types" name="coffeeTypes" v-model="store.coffeeType" :validation="validator.coffeeType">
                                <RadioInput id="espresso" value="Espresso" title="Espresso" v-model="store.coffeeType" radio-type="block" />
                                <RadioInput id="cappuccino" value="Cappuccino" title="Cappuccino" v-model="store.coffeeType" radio-type="block" />
                            </RadioSet>
                        </Question>

                        <Validation v-if="v$.$error" :model-value="store.coffeeType" :validation="validator.coffeeType" />

                        <h4 class="mt-4">Experience</h4>

                        <Question name="texture" label="Texture" tooltip="An example may be tea-like or viscus"
                            class="col-12">
                            <Text id="texture" v-model="store.texture" :validation="validator.texture" />
                        </Question>
                        <Question name="notes" label="Notes" tooltip="Think fruits, nuts, chocolate..." class="col-12">
                            <Text id="taste" v-model="store.taste" :validation="validator.taste" />
                        </Question>
                        <Question name="aroma" label="Aroma" tooltip="Think chocolate, nuts, frutis..." class="col-12">
                            <Text id="hello" v-model="store.aroma" :validation="validator.aroma" />
                        </Question>

                        <h4 class="mt-4">Review</h4>

                        <Question name="comments" label="Comments (Optional)" tooltip="Any other thoughts?" class="col-12">
                            <Textarea id="notes" type="text" v-model="store.notes"
                                :validation="validator.notes" />
                        </Question>
                        <Question name="Overall" label="Overall rating"
                            tooltip="This is the overall rating of the coffee" class="col-12">
                            <StarRating id="rating" :star-count="5" v-model="store.rating"
                                :validation="validator.rating" />
                        </Question>
                        <hr class="mt-4" />
                        <div class="col-12">
                            <div class="thank-you-message">
                                <p>Thank you for choosing our coffee shop! We appreciate your custom and hope you
                                    enjoyed your experience with us. Your feedback is invaluable in helping us improve
                                    our service and offerings. We look forward to serving you again soon!</p>
                            </div>
                            <Question name="Overall" label="" tooltip="" class="col-12 mt-4">
                                <CheckBox id="rating" name="" v-model="store.termsAndConditions"
                                    :checked="store.termsAndConditions ?? false" :disabled="true"
                                    :validation="validator.termsAndConditions">
                                    <template #label>
                                        Please review our <a href="" @click.prevent="state.modalState = true">terms &
                                            conditions</a> to submit your feedback.
                                    </template>
                                </CheckBox>
                            </Question>


                        </div>
                        <div class="col-3">
                            <button class="btn btn-primary" type="button" value="Add" @click="mockSubmitFeedback">
                                Submit
                            </button>
                        </div>
                    </div>
                    <div class="col-6">
                        <h4 class="text-center">Your Coffee</h4>
                        <div v-if="store.coffeeType" class="coffee-container">
                            <FillCoffee id="cappuccino" v-if="store.coffeeType === 'Cappuccino'" :espresso-delay="1000"
                                :milk-delay="2000" :espresso-percent="16" :milk-percent="84" />
                            <FillCoffee id="esspresso" v-if="store.coffeeType === 'Espresso'" :espresso-delay="1000"
                                :espresso-percent="16" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal :id="`suggestion-modal`" :visible="state.modalState" :showCloseButton="false"
            title="Please accept the terms and conditions...">
            <template #body>
                <div class="modal-body">
                    <p>
                        Terms and conditions are important. Please accept them.
                    </p>
                </div>
            </template>
            <template #footer>
                <div class="modal-footer">
                    <button class="btn btn-primary" type="button"
                        @click.prevent="state.modalState = false; store.termsAndConditions = true;">
                        Accept
                    </button>
                </div>
            </template>
        </Modal>
    </div>
</template>
<style>
.thank-you-message {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    padding: 20px;
    margin-top: 20px;
}

.thank-you-message p {
    margin: 0;
    font-size: 16px;
    color: #495057;
}
</style>