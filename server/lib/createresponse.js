const baseUrl = '/api/v1'

module.exports = (info) => {
    let response = {}
    response['meta']  = {}, response['links'] = {}

    // meta
    response['meta']['version'] = '1.0'
    // links
    response['links']['current'] = `${baseUrl}${info['link_current']}`
    // data
    response['data'] = info['data']

    return response
}
