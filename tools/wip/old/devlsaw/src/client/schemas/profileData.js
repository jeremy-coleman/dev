export default {
  disableKeyCompression: true,
  version: 0,
  title: 'Profile Data schema',
  type: 'object',
  properties: {
    user: {
      type: 'object'
    },
    groups: {
      type: 'array',
      items: {
        type: 'object'
      }
    },
    required: []
  }
};
