import {observable, action} from 'mobx';


export class NavStore {
  @observable route: string;
  @observable chartDrawerRoute: string;
  @observable mlDrawerRoute: string;

  constructor(){
    this.route = 'home'
 };

  @action.bound goTo = (inputRoute: string) => this.route = inputRoute;
  @action.bound goToChartDrawer = (inputRoute: string) => this.chartDrawerRoute = inputRoute;
  @action.bound goToMlDrawer = (inputRoute: string) => this.mlDrawerRoute = inputRoute;

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