export default (error) => (field) => error && error.fields && error.fields[field] && error.fields[field].desc
