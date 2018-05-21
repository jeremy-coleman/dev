import {observable, action} from 'mobx';
import {createHashHistory, Location} from 'history';
import * as history from 'history'

export class NavigationStore {
  @observable location = window.location;
  history = createHashHistory();


constructor(){
  this.history.listen((location: Location) => {console.log(location)})

}

  @action.bound isActive(path: string): boolean {
    return location.pathname === path;
  }

  @action.bound goTo(event: React.MouseEvent<HTMLElement>, {name}: any) {
    this.history.push(String(name));
  }

  @action
  push(location: string) {
    this.history.push(location);
  }

  @action
  replace(location: string) {
    this.history.replace(location);
  }

  @action
  go(n: number) {
    this.history.go(n);
  }

  @action
  goBack() {
    this.history.goBack();
  }

  @action
  goForward() {
    this.history.goForward();
  }
}


/*
import {observable, action} from 'mobx';
import Navigation from './Navigation';

export class Counter {
  @observable count: number = 0;

  @action
  navigateToAbout(): void {
    Navigation.push('/about');
  }

  @action
  increment(): void {
    this.count += 1;
  }

  @action
  decrement(): void {
    this.count -= 1;
  }
}

export default new Counter();
*/