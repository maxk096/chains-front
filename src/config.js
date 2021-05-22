const { NODE_ENV } = process.env
export const isEnvDevelopment = NODE_ENV === 'development'
export const isEnvProduction = NODE_ENV === 'production'
