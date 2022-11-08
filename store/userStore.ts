/** user store
 *
 * user : observable - name & isSignin
 * signIn : action - name update & isSignin = true
 * signOut : action - name === "" & isSignin = false
 *
 */

import { observable, action, makeObservable } from "mobx";

interface IUser {
  name: string;
  isSignin: boolean;
}

export class UserStore {
  // observable
  user: IUser = {
    name: "",
    isSignin: false,
  };

  // constructor
  constructor() {
    makeObservable(this, {
      user: observable,
      signIn: action,
      signOut: action,
    });
  }

  // action
  signIn = (name: string) => {
    this.user = {
      name: name,
      isSignin: true,
    };
  };

  signOut = () => {
    this.user = {
      name: "",
      isSignin: false,
    };
  };
}
