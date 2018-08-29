
import * as React from 'react';
import { RendererProps } from '../core';

export class RendererComponent<P extends RendererProps, S = {}> extends React.Component<P, S> {
  constructor(props) {
    super(props);
  }
}


export interface StatelessRenderer<P extends RendererProps> extends React.StatelessComponent<P> {

}


export type Renderer =
  RendererComponent<RendererProps & any, {}> | StatelessRenderer<RendererProps & any>;
