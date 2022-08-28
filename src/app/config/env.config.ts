import { config } from "../../config/config";

(function setAppEnvVariable() {
    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'development';
    }

    process.env.PORT = process.env.PORT ? process.env.PORT : JSON.stringify(config.PORT);
    process.env.MONGO_URI = process.env.MONGO_URI || config.MONGO_URI;
})();


export function envValidationForProd() {
    if (process.env.NODE_ENV == 'production') {
        requiredEnv(process.env.PORT);
        requiredEnv(process.env.MONGO_URI);
    }
}

function requiredEnv(env: any) {
    if (!env) {
        console.log('env.config.ts', 'requiredEnv', `[error]: The "${env}" environment variable is required`)
        process.exit(1)
    }
}

