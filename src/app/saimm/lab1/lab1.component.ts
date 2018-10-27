import { Component, OnInit } from '@angular/core';
import * as mathjs from 'mathjs';

interface ILemmRandomDebugInfo {
  n: number,
  r_prev: number;
  a_r_prev: number;
  r_curr: number;
  x_curr: number;
}

@Component({
  selector: 'app-lab1',
  templateUrl: './lab1.component.html',
  styleUrls: ['./lab1.component.scss']
})
export class Lab1Component implements OnInit {

  lemmInput = {
    a: 3,
    m: 5,
    r0: 1,
    amount: 5,
  };

  lemmRandomDebugInfo: ILemmRandomDebugInfo[] = [];

  constructor() { }

  ngOnInit() {
    this.countLemm();
  }

  countLemm() {
    const { a, m, r0, amount } = this.lemmInput;
    const lemms: ILemmRandomDebugInfo[] = [];
    const scope = {
      a, m, r_prev: r0
    };
    for(let i = 0; i< amount; ++i) {
      const lemm: ILemmRandomDebugInfo = {
         x_curr: mathjs.eval('a*r_prev%m/m', scope),
         a_r_prev: mathjs.eval('a*r_prev', scope), 
         n: i + 1,
         r_curr: mathjs.eval('a*r_prev%m', scope), 
         r_prev: scope.r_prev
      } as ILemmRandomDebugInfo;
      lemms.push(lemm);
      scope.r_prev = lemm.r_curr;
    }
    this.lemmRandomDebugInfo = lemms;
    console.log(lemms);
  }
}
