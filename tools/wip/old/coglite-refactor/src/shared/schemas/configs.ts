export const configs = {
  disableKeyCompression: true,
  version: 0,
  title: 'Configuration schema',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      primary: true
    },
    value: {
      type: 'object'
    }
  },
  required: ['value']
};
