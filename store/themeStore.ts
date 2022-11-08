/** theme store
 *
 * theme : observable - "light" | "dark"
 * changeTheme : action - change theme from "light" to "dark" or from "dark" to "light"
 */

import { observable, action, makeObservable } from "mobx";

export class ThemeStore {
  // observable
  theme: string = "light";

  // constructor
  constructor() {
    makeObservable(this, {
      theme: observable,
      changeTheme: action,
    });
  }

  // action
  changeTheme = () => {
    this.theme = this.theme === "light" ? "dark" : "light";
  };
}
