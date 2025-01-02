import { required, helpers } from '@vuelidate/validators';

const allowedCoffeeTypes = ['Espresso', 'Latte', 'Cappuccino', 'Americano', 'Mocha', 'Macchiato'];

const coffeeType = helpers.withMessage(
  `Coffee type must be one of: ${allowedCoffeeTypes.join(', ')}`,
  (value: string) => allowedCoffeeTypes.includes(value)
);

export const coffeeReviewValidator = (store: any) => {
  return {
    coffeeType: { coffeeType },
    texture: { required: helpers.withMessage("Texture required", required) },
    taste: { required: helpers.withMessage("Taste required", required) },
    aroma: { required: helpers.withMessage("Aroma required", required) },
    notes: { },
    cost: { required: helpers.withMessage("Cost required", required) },
    rating: { },
    termsAndConditions: { required: helpers.withMessage("Terms and conditions required", required) },
  };
};