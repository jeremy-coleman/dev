import { JsonSchema, UISchemaElement } from '../';
import { generateDefaultUISchema, generateJsonSchema } from '../generators';
import { jsonFormsStore } from '../reducers';
import { RankedTester } from '../testers';


export const init = (
  data: any,
  schema: JsonSchema = generateJsonSchema(data),
  uischema: UISchemaElement = generateDefaultUISchema(schema)
) =>  jsonFormsStore.coreStore.initialize(data, schema, uischema)

export const update =
  (path: string, updater: (any) => any) =>  jsonFormsStore.coreStore.updateData(path, updater)

export const registerRenderer = (
  tester: RankedTester,
  renderer: any
) =>  jsonFormsStore.rendererStore.addRenderer(tester, renderer)

export const registerField = (
  tester: RankedTester,
  field: any
) => jsonFormsStore.fieldStore.addField(tester, field)

export const unregisterField = (
  tester: RankedTester
) => jsonFormsStore.fieldStore.removeField(tester)

export const unregisterRenderer = (
  tester: RankedTester
) => jsonFormsStore.rendererStore.removeRenderer(tester)

export const setConfig = config => jsonFormsStore.configStore.setConfiguration(config)