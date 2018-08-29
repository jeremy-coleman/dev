import RatingControl from "./RatingControl"
import ratingControlTester from "./ratingControlTester"

import {IJsonFormsStore, setData, setFields, setRenderers, initializeStore, registerRenderer, materialFields, materialRenderers} from '../forms-core'

export const schema = {
  cogliteInput: {
    title: "Input Value",
    type: "object",
    properties: {
      inject: {
        type: "string",
      },
    },
    required: ["inject"],
  },
  cogliteFunctionMath: {
    title: "Math Function",
    type: "object",
    properties: {
      operator: {
        type: "string",
        label: "Operator",
        enum: ["Add", "Subtract", "Divide", "Multiply"],
      },
      operand: {
        type: "string",
      },
    },
  },
  cogliteDebug: {
    title: "Debug",
    type: "object",
    properties: {
      "selectable": {
        "type": "boolean"
      },
      output: {
        type: "string"
      },
    },
  },
}

export const uischema = {
  cogliteInput: {
    type: "Group",
    label: "Input Value",
    elements: [
      {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/inject",
          },
        ],
      },
    ],
  },
  cogliteFunctionMath: {
    type: "Group",
    label: "Math Function",
    elements: [
      {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/operator",
          },
          {
            type: "Control",
            scope: "#/properties/operand",
          },
        ],
      },
    ],
  },
  cogliteDebug: {
    type: "Group",
    label: "Debug",
    elements: [
      {
        type: "VerticalLayout",
        elements: [
          {
            "type": "Control",
            "label": false,
            "scope": "#/properties/selectable"
          },
          {
            type: "Control",
            scope: "#/properties/output",
            "rule": {
              "effect": "DISABLE",
              "condition": {
                "type": "LEAF",
                "scope": "#/properties/selectable",
                "expectedValue": true
              }
            }      
          },
        ],
      },
    ],
  },
}

export const data = {}

export const setupStore = () => {
  const jsonFormsSetStore: IJsonFormsStore = initializeStore()
  setData(data, jsonFormsSetStore)
  setFields(materialFields, jsonFormsSetStore)
  setRenderers(materialRenderers, jsonFormsSetStore)
  registerRenderer(ratingControlTester, RatingControl, jsonFormsSetStore)

  return jsonFormsSetStore
}

