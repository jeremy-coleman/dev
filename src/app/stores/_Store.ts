import { ThemeStore } from './ThemeStore';
import { NavigationStore } from './NavigationStore';

export class Store {
  theme = new ThemeStore()
  nav = new NavigationStore()
}