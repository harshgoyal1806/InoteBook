const {createClient} = require("redis")
const redisClient = createClient({
    username: 'default',
    password: 'w8iF41BeMSFXIdGqUhSrwVsH0vRJUpeq',
    socket: {
        host: 'redis-13872.c301.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 13872
    }
});
module.exports = redisClient;