import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Select} from '@coglite/vendors/react-select-v1';
import ReactSortable from '../CustomReactSortable/CustomReactSortable';
import Drawer from './Drawer/Drawer';
import OverlayContent from './OverlayContent/OverlayContent';
import RightArrowIcon from '../../icons/RightArrowIcon';


import './styles.css';

//import {cssRaw} from 'typestyle'
//cssRaw(require('./styles.css'))

export default class Menu extends React.PureComponent<any, any> {
  fieldsOverlayButton: HTMLLIElement;
  static propTypes: { colorPack: PropTypes.Requireable<any>; selectedAggregationType: PropTypes.Validator<any>; aggregationTypes: PropTypes.Validator<any>; onSelectAggregationType: PropTypes.Validator<any>; selectedAggregationDimension: PropTypes.Validator<any>; aggregationDimensions: PropTypes.Validator<any>; onSelectAggregationDimension: PropTypes.Validator<any>; fields: PropTypes.Validator<any>; currentValues: PropTypes.Validator<any>; showFilterMenu: PropTypes.Validator<any>; rowFields: PropTypes.Validator<any>; colFields: PropTypes.Validator<any>; onAddUpdateField: PropTypes.Validator<any>; setFields: PropTypes.Validator<any>; setRowFields: PropTypes.Validator<any>; setColFields: PropTypes.Validator<any>; currentFilter: PropTypes.Validator<any>; onFiltersOk: PropTypes.Validator<any>; onFiltersCancel: PropTypes.Validator<any>; isDrawerOpen: PropTypes.Validator<any>; handleRightClose: PropTypes.Validator<any>; };
  constructor(props) {
    super(props);
    this.filterButtonClick = this.filterButtonClick.bind(this);
  }

  filterButtonClick(field, e) {
    this.props.showFilterMenu(field);
  }

  render() {
    const {
      colorPack,
      selectedAggregationType,
      aggregationTypes,
      onSelectAggregationType,
      selectedAggregationDimension,
      aggregationDimensions,
      onSelectAggregationDimension,
      fields,
      filters,
      currentValues,
      colFields,
      rowFields,
      onAddUpdateField,
      setFields,
      setRowFields,
      setColFields,
      currentFilter,
      onFiltersOk,
      onFiltersCancel,
      isDrawerOpen,
      handleRightClose,
    } = this.props;

    const divStyle: React.CSSProperties = {
      backgroundColor: 'white',
      border: 'solid 1px',
      boxShadow: '0 5px 15px #9d9d9d',
      display: 'flex',
      flexDirection: 'column',
      fontSize: '90%',
      height: '100%',
      justifyContent: 'space-between',
      padding: '3px',
      zIndex: 100,
    };

    const fieldsRenderer = fields.length ?
      fields.map((field, index) => {
        return (
          <li
            className="fields-draggable-li"
            ref={ref => { this.fieldsOverlayButton = ref; }}
            key={index}
            data-id={field}
            style={{
              backgroundColor: colorPack.sortableFieldBackground,
              color: colorPack.sortableFieldText,
            }}
          >
            <div className="inner-filter-container"
              onMouseDown={(e) => {
                onFiltersCancel();
              }}
            >
              <div className="filter-text"
              >
                {field}
              </div>
              <div
                className="filter-button"
                onClick={this.filterButtonClick.bind(this, field)}
              >
              ✎
              </div>
            </div>
            {(currentValues.length > 0 && currentFilter === field) &&
            <div className="filter-menu"
            >
              <div
                className="filters-container"
                style={{ position: 'absolute',
                  ...divStyle, height: 200, width: 150 }}
              >
                <OverlayContent
                  filters={filters}
                  currentFilter={currentFilter}
                  currentValues={currentValues}
                  onFiltersOk={onFiltersOk}
                  onFiltersCancel={onFiltersCancel}
                />
              </div>
            </div>
            }
          </li>
        );
      }) :
      '';

    const rowFieldsRender = rowFields.map((field, index) =>
      (
        <li
          className="fields-draggable-li"
          key={index}
          data-id={field}
          style={{
            backgroundColor: colorPack.sortableFieldBackground,
            color: colorPack.sortableFieldText,
          }}
        >
          <div className="inner-filter-container"
            onMouseDown={(e) => {
              onFiltersCancel();
            }}
          >
            <div className="filter-text"
            >
              {field}
            </div>
            <div
              className="filter-button"
              onClick={this.filterButtonClick.bind(this, field)}
            >
            ✎
            </div>
          </div>
          {(currentValues.length > 0 && currentFilter === field) &&
          <div className="filter-menu"
          >
            <div
              className="filters-container"
              style={{ position: 'absolute',
                ...divStyle, height: 200, width: 150 }}
            >
              <OverlayContent
                filters={filters}
                currentFilter={currentFilter}
                currentValues={currentValues}
                onFiltersOk={onFiltersOk}
                onFiltersCancel={onFiltersCancel}
              />
            </div>
          </div>
          }
        </li>
      ));

    const colFieldsRender = colFields.map((field, index) =>
      (
        <li
          className="fields-draggable-li"
          key={index}
          data-id={field}
          style={{
            backgroundColor: colorPack.sortableFieldBackground,
            color: colorPack.sortableFieldText,
          }}
        >
          <div className="inner-filter-container"
            onMouseDown={(e) => {
              onFiltersCancel();
            }}
          >
            <div className="filter-text"
            >
              {field}
            </div>
            <div
              className="filter-button"
              onClick={this.filterButtonClick.bind(this, field)}
            >
            ✎
            </div>
          </div>
          {(currentValues.length > 0 && currentFilter === field) &&
          <div className="filter-menu"
          >
            <div
              className="filters-container"
              style={{ position: 'absolute',
                ...divStyle, height: 200, width: 150 }}
            >
              <OverlayContent
                filters={filters}
                currentFilter={currentFilter}
                currentValues={currentValues}
                onFiltersOk={onFiltersOk}
                onFiltersCancel={onFiltersCancel}
              />
            </div>
          </div>
          }
        </li>
      ));

    const close = (
      <div
        onClick={handleRightClose}
        className="closeBar"
      >
        <RightArrowIcon
          color={colorPack.icons}
        />
      </div>
    );

    const menuItems = (
      <div className="pivot-options">
        {close}
        <div className="selectors-container">
          <div className="select-container">
            <div
              className="title"
              style={{
                'backgroundColor': colorPack.selectorContainerTitleBackground,
                'color': colorPack.selectorContainerTitleText,
              }}
            >
              Aggregation Type
            </div>
            <Select
              name="Aggregation Type"
              value={selectedAggregationType}
              options={aggregationTypes}
              onChange={onSelectAggregationType}
              menuContainerStyle={{ zIndex: 2 }}
              clearable={false}
            />
          </div>

          <div className="select-container">
            <div
              className="title"
              style={{
                'backgroundColor': colorPack.selectorContainerTitleBackground,
                'color': colorPack.selectorContainerTitleText,
              }}
            >
              Aggregation Dimension
            </div>
            <Select
              name="Aggregation Type"
              value={selectedAggregationDimension}
              options={aggregationDimensions}
              onChange={onSelectAggregationDimension}
              menuContainerStyle={{ zIndex: 2 }}
              clearable={false}
            />
          </div>
        </div>

        <div className="fields-drag-container">
          <div className="fields">
            <div
              className="title"
              style={{
                'backgroundColor': colorPack.selectorContainerTitleBackground,
                'color': colorPack.selectorContainerTitleText,
              }}
            >
                Fields
            </div>
            <ReactSortable
              className="sortable-container block__list block__list_tags"
              style={{
                backgroundColor: colorPack.sortableContainerBackground,
                borderColor: colorPack.sortableContainerBorderColor,
              }}
              onChange={fields => setFields(fields)}
              options={{
                group: 'shared',
                onAdd: onAddUpdateField,
              }}
              tag="ul"
            >
              {fieldsRenderer}
            </ReactSortable>
          </div>

          <div className="rows">
            <div
              className="title"
              style={{
                'backgroundColor': colorPack.selectorContainerTitleBackground,
                'color': colorPack.selectorContainerTitleText,
              }}
            >
              Rows
            </div>
            <ReactSortable
              className="sortable-container block__list block__list_tags"
              style={{
                backgroundColor: colorPack.sortableContainerBackground,
                borderColor: colorPack.sortableContainerBorderColor,
              }}
              onChange={rowFields => setRowFields(rowFields)}
              options={{
                group: 'shared',
                onAdd: onAddUpdateField,
                onUpdate: onAddUpdateField,
              }}
              tag="ul"
            >
              {rowFieldsRender}
            </ReactSortable>
          </div>

          <div className="columns">
            <div
              className="title"
              style={{
                'backgroundColor': colorPack.selectorContainerTitleBackground,
                'color': colorPack.selectorContainerTitleText,
              }}
            >
              Columns
            </div>
            <ReactSortable
              className="sortable-container block__list block__list_tags"
              style={{
                backgroundColor: colorPack.sortableContainerBackground,
                borderColor: colorPack.sortableContainerBorderColor,
              }}
              onChange={colFields => setColFields(colFields)}
              options={{
                group: 'shared',
                onAdd: onAddUpdateField,
                onUpdate: onAddUpdateField,
              }}
              tag="ul"
            >
              {colFieldsRender}
            </ReactSortable>
          </div>
        </div>
      </div>
    );

    return (
      <Drawer
        className="react-virtualized-pivot-module-menu"
        isDrawerOpen={isDrawerOpen}
        handleRightClose={handleRightClose}
      >
        {menuItems}
      </Drawer>
    );
  }
}

Menu.propTypes = {
  colorPack: PropTypes.object,
  selectedAggregationType: PropTypes.string.isRequired,
  aggregationTypes: PropTypes.array.isRequired,
  onSelectAggregationType: PropTypes.func.isRequired,
  selectedAggregationDimension: PropTypes.string.isRequired,
  aggregationDimensions: PropTypes.array.isRequired,
  onSelectAggregationDimension: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  currentValues: PropTypes.array.isRequired,
  showFilterMenu: PropTypes.func.isRequired,
  rowFields: PropTypes.array.isRequired,
  colFields: PropTypes.array.isRequired,
  onAddUpdateField: PropTypes.func.isRequired,
  setFields: PropTypes.func.isRequired,
  setRowFields: PropTypes.func.isRequired,
  setColFields: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  onFiltersOk: PropTypes.func.isRequired,
  onFiltersCancel: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  handleRightClose: PropTypes.func.isRequired,
};
