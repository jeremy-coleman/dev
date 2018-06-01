export default {
  disableKeyCompression: true,
  version: 0,
  title: 'Notebooks schema',
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    lines: {
      type: 'array',
      items: {
        type: 'object'
      }
    },
    required: ['name', 'lines']
  }
};