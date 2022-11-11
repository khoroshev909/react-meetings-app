export default function getQueryParams(parsedQueries, query) {
    const newQueries = { ...parsedQueries, ...query }
    return Object.keys(newQueries).map((param) => `${param}=${newQueries[param]}`).join('&')
}