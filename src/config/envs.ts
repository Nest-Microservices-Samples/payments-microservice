
import 'dotenv/config';
import * as joi from 'joi';

// Define an interface for type safety
interface EnvVars {
    PORT: number;
    STRIPE_SECRET: string;
    STRIPE_SUCCESS_URL: string;
    STRIPE_CANCEL_URL: string;
    STRIPE_ENDPOINT_SECRET: string;
}

// Define the validation schema for environment variables
const envsSchema = joi.object({
    PORT: joi.number().required(),
    STRIPE_SECRET: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().required(),
    STRIPE_CANCEL_URL: joi.string().required(),
    STRIPE_ENDPOINT_SECRET: joi.string().required(),
})
    .unknown(true);

// Validate the environment variables against the schema
const { error, value } = envsSchema.validate(process.env);

// Throw an error if validation fails
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

// Cast validated values to the EnvVars interface
const envVars: EnvVars = value;

// Export the validated and typed environment variables
export const envs = {
    port: envVars.PORT,
    stripeSecret: envVars.STRIPE_SECRET,
    stripeSuccessUrl: envVars.STRIPE_SUCCESS_URL,
    stripeCancelUrl: envVars.STRIPE_CANCEL_URL,
    stripeEndpointSecret: envVars.STRIPE_ENDPOINT_SECRET,
}