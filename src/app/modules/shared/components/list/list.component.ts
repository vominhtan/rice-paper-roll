import { Component, OnInit, Injector } from '@angular/core';

export enum State {
  Adding = 'Adding',
  StandBy = 'StandBy',
}

export abstract class ListComponent<T extends any> {
  public items: T[];
  state: State ;

  constructor() {}

  get isAddingNewItem(): boolean {
    return this.state === State.Adding;
  }

  protected addNewItem() {
    this.state = State.Adding;
  }

  protected standBy() {
    this.state = State.StandBy;
  }
}
