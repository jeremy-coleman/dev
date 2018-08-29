
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import * as _ from 'lodash';
import { DatePicker } from 'material-ui-pickers';
import { inject, observer } from 'mobx-react';
import { Moment } from 'moment';
import * as React from 'react';
import { computeLabel, ControlProps, ControlState, isDateControl, isDescriptionHidden, isPlainLabel, mapStoreValuesToControlProps, mapUpdateActionToControlProps, RankedTester, rankWith, StatePropsOfControl } from '../../core';
import { Control, createPropsForItem } from '../../react';

export interface DateControl {
  momentLocale?: Moment;
}

export class MaterialDateControl extends Control<ControlProps & DateControl, ControlState> {
  render() {
    const {
      description,
      id,
      errors,
      label,
      uischema,
      visible,
      enabled,
      required,
      path,
      handleChange,
      data,
      momentLocale
    } = this.props;
    const isValid = errors.length === 0;
    const trim = uischema.options && uischema.options.trim;
    const showDescription = !isDescriptionHidden(visible, description, this.state.isFocused);
    let style = {};
    if (!visible) {
      style = {display: 'none'};
    }
    const inputProps = {};
    const localeDateTimeFormat =
      momentLocale ? `${momentLocale.localeData().longDateFormat('L')}`
      : 'YYYY-MM-DD';

    let labelText;
    let labelCancel;
    let labelClear;

    if (isPlainLabel(label)) {
      labelText = label;
      labelCancel = 'Cancel';
      labelClear = 'Clear';
    } else {
      labelText = label.default;
      labelCancel = _.startsWith(label.cancel, '%') ? 'Cancel' : label.cancel;
      labelClear = _.startsWith(label.clear, '%') ? 'Clear' : label.clear;
    }

    return (
      <DatePicker
        id={id}
        label={computeLabel(labelText, required)}
        error={!isValid}
        style={style}
        fullWidth={!trim}
        helperText={!isValid ? errors : showDescription ? description : null}
        InputLabelProps={{shrink: true}}
        value={data || null}
        onChange={ datetime => console.log('broken bc moment is fucked')}
        format={localeDateTimeFormat}
        clearable={true}
        disabled={!enabled}
        autoFocus={uischema.options && uischema.options.focus}
        onClear={() => handleChange(path, '')}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        cancelLabel={labelCancel}
        clearLabel={labelClear}
        leftArrowIcon={<KeyboardArrowLeftIcon />}
        rightArrowIcon={<KeyboardArrowRightIcon />}
        InputProps={inputProps}
      />
    );
  }
}

export const addLabelProps = (mapStoreValuesToProps: (s, p) => any) =>
  (state, ownProps): StatePropsOfControl => {
    const stateProps = mapStoreValuesToProps(state, ownProps);

    return {
      ...stateProps,
      label: {
        default: stateProps.label,
        cancel: '%cancel',
        clear: '%clear'
      },
    };
  };

export const materialDateControlTester: RankedTester = rankWith(4, isDateControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedDateControl extends React.Component<any, null>  {
  render() {
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToControlProps, mapUpdateActionToControlProps)
    return (
      <MaterialDateControl {...effectiveProps}/>
    )
  }
}