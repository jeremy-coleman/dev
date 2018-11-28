// This is a very simple enum-like class that will always return strings.
// Returning strings is required to keep things simple+serializable in the redux store.
// The only reason we wrap this in a little class it to expose the convenience
// `contains` and `values`

const StringEnum = class {
  constructor(...vals) {
    vals.forEach((v) => {
      if (v === 'values' || v === 'contains') { throw Error(`disallowed enum name: ${v}`) }
      this[v] = v
    })
    Object.freeze(this)
  }
  values() { return Object.keys(this) }
  contains(key) { return Object.keys(this).indexOf(key) >= 0 }
}

const rowOverflowEnum = new StringEnum('VISIBLE', 'SCROLL', 'HIDDEN')
// const rowTypeEnum = new StringEnum('input', 'output')
export const cellTypeEnum = new StringEnum(
  'code',
  'markdown',
  'raw',
  'css',
  'external dependencies',
  'plugin',
)
// const appViewEnum = new StringEnum('EXPLORE', 'REPORT') //was: 'editor', 'presentation'
// const appModeEnum = new StringEnum('COMMAND', 'EDIT', 'TITLE', 'MENU')

export const cellEvalStatusEnum = new StringEnum('UNEVALUATED', 'PENDING', 'ASYNC_PENDING', 'SUCCESS', 'ERROR')

const appMessageSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' },
    details: { type: 'string' },
    when: { type: 'string' },
    id: { type: 'integer', minimum: 0 },
  },
  additionalProperties: false,
}

const cellSchema = {
  type: 'object',
  properties: {
    content: { type: 'string' }, // change to string with default '' or 'untitled'
    id: { type: 'integer', minimum: 0 },
    cellType: {
      type: 'string',
      enum: cellTypeEnum.values(),
    },
    asyncProcessCount: { type: 'integer', minimum: 0 },
    value: {}, // empty schema, `value` can be anything
    rendered: { type: 'boolean' },
    selected: { type: 'boolean' },
    executionStatus: { type: 'string' },
    evalStatus: {
      type: 'string',
      enum: cellEvalStatusEnum.values(),
    },
    rowSettings: { type: 'object' },
    language: { type: 'string' }, // '' in case not a code cell
    skipInRunAll: { type: 'boolean' },
  },
  additionalProperties: false,
}
// cellSchema.required = Object.keys(cellSchema.properties)
// cellSchema.minProperties = Object.keys(cellSchema.properties).length

const languageSchema = {
  type: 'object',
  properties: {
    pluginType: { type: 'string', enum: ['language'] },
    languageId: { type: 'string' },
    displayName: { type: 'string' },
    codeMirrorMode: { type: 'string' },
    keybinding: { type: 'string' },
    module: { type: 'string' },
    evaluator: { type: 'string' },
    url: { type: 'string' },
  },
  additionalProperties: false,
}

const environmentVariableSchema = {
  type: 'array',
  items: [
    { type: 'string', enum: ['object', 'string', 'rawString'] },
    { type: 'string' },
  ],
}

const stateSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    cells: {
      type: 'array',
      items: cellSchema,
    },
    languages: {
      type: 'object',
      additionalProperties: languageSchema,
    },
    languageLastUsed: { type: 'string' },
    mode: {
      type: 'string',
      enum: ['command', 'edit', 'title-edit'],
    },
    viewMode: {
      type: 'string',
      enum: ['editor', 'presentation'],
    },
    history: {
      type: 'array',
    },
    userDefinedVarNames: {
      type: 'array',
      items: { type: 'string' },
    },
    lastSaved: {}, // FIXME change to string ONLY with default 'never'
    lastExport: {}, // FIXME change to string ONLY
    sidePaneMode: {}, // FIXME change to string ONLY
    sidePaneWidth: { type: 'integer' },
    userData: { type: 'object' },
    externalDependencies: { type: 'array' },
    executionNumber: { type: 'integer', minimum: 0 },
    appMessages: {
      type: 'array',
      items: appMessageSchema,
    },
    autoSave: { type: 'string' },
    locallySaved: {
      type: 'array',
      items: { type: 'string' },
    },
    savedEnvironment: {
      type: 'object',
      additionalProperties: environmentVariableSchema,
    },
    runningCellID: { type: 'integer' },
  },
  additionalProperties: false,
}
// stateSchema.required = Object.keys(stateSchema.properties)
// stateSchema.minProperties = Object.keys(stateSchema.properties).length




export {
  // enums and schemas
  rowOverflowEnum,
  stateSchema,
}
