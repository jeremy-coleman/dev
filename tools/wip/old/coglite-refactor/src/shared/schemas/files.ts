export const files = {
  disableKeyCompression: true,
  version: 0,
  title: 'Files schema',
  type: 'object',
  properties: {
    path: {
      type: 'string'
    },
    fileName: {
      type: 'string'
    },
    createdAt: {
      type: 'string'
    }
  },
  required: ['path', 'fileName']
};
