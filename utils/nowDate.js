
module.exports = () => {
    const today = new Date()
    const day = today.getUTCDay()
    const month = today.getUTCMonth()
    const year = today.getUTCFullYear()
    const hours = today.getUTCHours() + 5
    const minutes = today.getUTCMinutes()
    const seconds = today.getUTCSeconds()
    const miliseconds = today.getUTCMilliseconds() 

    return {
        date: new Date(Date.UTC(year, month, day, hours, minutes, seconds, miliseconds))
    };
}