export const page = (limit, offset) => {
    return Math.floor((offset + limit) / limit)
  }

export const limitOffset = (page, limit) => {
    page = page || 1
    var offset = (page - 1) * limit
    return { offset, limit }
}