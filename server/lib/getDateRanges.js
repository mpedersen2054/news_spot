
module.exports = (inc) => {
    let now = new Date(), to
    switch (inc) {
        case 'hour':
            to = new Date(now)
            to.setHours(now.getHours() - 1)
            break
        case 'today':
            to = new Date(now)
            to.setHours(now.getHours() - 24)
            break
        case 'week':
            to = new Date(now)
            to.setDate(now.getDate() - 7)
            break
        case 'month':
            to = new Date(now)
            // little weird because not all months are the same len
            to.setDate(now.getDate() - 30) // use 30 as avg
            break
        case 'year':
            to = new Date(now)
            to.setYear(now.getYear() - 1)
            break
        default:
            console.log('default in getDateRanges?')
    }
    return [to, now]
}
