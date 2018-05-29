console.log('ENV', process.env)
export const API_URL = `http://${process.env.REACT_APP_API_URL}`
export const KAFKA_PROXY_URL = `ws://${process.env.REACT_APP_KAFKA_PROXY_URL}`
export const KAFKA_TOPIC_UPDATES = process.env.REACT_APP_KAFKA_TOPIC_UPDATES
export const KAFKA_TOPIC_ALERTS_SPEED = process.env.REACT_APP_KAFKA_TOPIC_ALERTS_SPEED
export const KAFKA_TOPIC_ALERTS_HEART = process.env.REACT_APP_KAFKA_TOPIC_ALERTS_HEART
export const KAFKA_TOPIC_ALERTS_BATTERY = process.env.REACT_APP_KAFKA_TOPIC_ALERTS_BATTERY
