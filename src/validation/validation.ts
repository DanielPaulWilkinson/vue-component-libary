import { required, helpers } from '@vuelidate/validators';

// Define the allowed coffee types
const allowedCoffeeTypes = ['Espresso', 'Latte', 'Cappuccino', 'Americano', 'Mocha', 'Macchiato'];

// Custom validator to check if the coffee type is valid
const coffeeType = helpers.withMessage(
  `Coffee type must be one of: ${allowedCoffeeTypes.join(', ')}`,
  (value: string) => allowedCoffeeTypes.includes(value)
);

export const brewFormValidator = (store: any) => {
  return {
    coffeeType: { coffeeType },
    texture: { required },
    taste: { required },
    aroma: { required },
    notes: { },
    cost: { required },
    rating: { },
    termsAndConditions: { required }
  };
};