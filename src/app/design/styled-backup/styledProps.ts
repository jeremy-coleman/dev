import { StyledFunction } from 'styled-components';

export function styledProps<T,U extends HTMLElement = HTMLElement>(
  styledFunction: StyledFunction<React.HTMLProps<U>>
): StyledFunction<T & React.HTMLProps<U>> {
  return styledFunction as any;
}
