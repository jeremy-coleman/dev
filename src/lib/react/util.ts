/*
  The MIT License
  
  Copyright (c) 2018 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import * as _ from 'lodash';
import {
    mapStateToControlProps,
    IJsonFormsStore
    } from '../core';
import { getPropsTransformers } from '../core'
/**
 * JSONForms specific connect function. This is a wrapper
 * around redux's connect function that executes any registered
 * prop transformers on the result of the given mapStateToProps
 * function before passing them to the actual connect function.
 *
 * @param {(state, ownProps) => any} mapStateToProps
 * @param {(dispatch, ownProps) => any} mapDispatchToProps
 * @returns {(Component) => any} function expecting a Renderer Component to be connected
 */
/* export const connectToJsonForms = (
  mapStateToProps: (state, ownProps) => any = mapStateToControlProps,
  mapDispatchToProps: (dispatch, ownProps) => any = mapActionToControlProps) => Component => {

  return connect(
    (state, ownProps) => {
      (getPropsTransformers(state) || []).reduce(
        (props, materializer) =>
          _.merge(props, materializer(state, props)),
        mapStateToProps(state, ownProps)
      )},
    mapDispatchToProps
  )(Component);
}; */

export const mergeTransformProps = (
  store: IJsonFormsStore,
  ownProps: any,
  mapStateToProps: (store: IJsonFormsStore, ownProps) => any = mapStateToControlProps) => {
    return (getPropsTransformers(store) || []).reduce(
      (props, materializer) =>
        _.merge(props, materializer(store, props)),
      mapStateToProps(store, ownProps)
    )
  }

/* export const connectComponentToJsonForms = (
  store: IJsonFormsStore,
  ownProps: any,
  mapStateToProps: (state, ownProps) => any = mapStateToControlProps,
  mapDispatchToProps: (dispatch, ownProps) => any = mapActionToControlProps) => Component => {

    const propsFromState: any = mapStateToProps(store, ownProps)
    const propsFromDispatch: any = mapDispatchToProps(store, ownProps)

    
}; */

  /* return connect(
    (state, ownProps) => {
      (getPropsTransformers(state) || []).reduce(
        (props, materializer) =>
          _.merge(props, materializer(state, props)),
        mapStateToProps(state, ownProps)
      )},
    mapDispatchToProps
  )(Component); */