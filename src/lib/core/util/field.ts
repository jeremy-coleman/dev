
import * as _ from 'lodash';
import { ControlElement } from '../models/uischema';
import { getErrorAt } from '../';
import { RankedTester } from '../testers';
import {
  composeWithUi,
  isEnabled,
  isVisible,
  Resolve,
  StatePropsOfField
} from '../util';
import {
  ActionPropsOfControl,
  mapActionToControlProps,
  StatePropsOfScopedRenderer
} from './renderer';
import { IJsonFormsStore } from '../reducers';

/**
 * State props of a field.
 */
export interface StatePropsOfField extends StatePropsOfScopedRenderer {
  className?: string;
  isValid: boolean;
}

/**
 * Props of a field.
 */
export interface FieldProps extends StatePropsOfField, ActionPropsOfControl {

}
/**
 * Registers the given field renderer when a JSON Forms store is created.
 * @param {RankedTester} tester
 * @param field the field to be registered
 * @returns {any}
 */
export interface DispatchFieldProps extends FieldProps {
  fields?: { tester: RankedTester, field: any }[];
}
export const mapStateToDispatchFieldProps = (store: IJsonFormsStore, ownProps) : DispatchFieldProps => {
  const fromFieldProps = mapStateToFieldProps(store, ownProps);
  const fromActionProps = mapActionToControlProps();
  const fields = store.fieldStore.fields;
  return Object.assign({}, fromActionProps, fromFieldProps, {fields});
}
/**
 * Map state to field props.
 *
 * @param state JSONForms state tree
 * @param ownProps any own props
 * @returns {StatePropsOfField} state props of a field
 */
export const mapStateToFieldProps = (store: IJsonFormsStore, ownProps): StatePropsOfField => {
  const path = composeWithUi(ownProps.uischema, ownProps.path);
  const visible = _.has(ownProps, 'visible') ? ownProps.visible : isVisible(ownProps, store);
  const enabled = _.has(ownProps, 'enabled') ? ownProps.enabled : isEnabled(ownProps, store);
  const errors = getErrorAt(path, store).map(error => error.message);
  const isValid = _.isEmpty(errors);
  const controlElement = ownProps.uischema as ControlElement;
  const id = controlElement.scope || '';
  const inputClassName = ['validate'].concat(isValid ? 'valid' : 'invalid');
  const defaultConfig = _.cloneDeep(store.configStore.config);
  const config = _.merge(
    defaultConfig,
    ownProps.uischema.options
  );

  return {
    data: Resolve.data(store.coreStore.extractData, path),
    className: inputClassName.join(' '),
    visible,
    enabled,
    id,
    path,
    isValid,
    scopedSchema: Resolve.schema(ownProps.schema, controlElement.scope),
    uischema: ownProps.uischema,
    schema: ownProps.schema,
    config
  };
};

/**
 * Synonym for mapActionToControlProps.
 *
 * @type {(dispatch) => {handleChange(path, value): void}}
 */
export const mapActionToFieldProps: () => ActionPropsOfControl =
  mapActionToControlProps;
