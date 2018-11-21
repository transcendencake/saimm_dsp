import { Component, OnInit } from '@angular/core';

import { SmoService } from './smo.service';

@Component({
  selector: 'app-kr1',
  templateUrl: './kr1.component.html',
  styleUrls: ['./kr1.component.scss']
})
export class Kr1Component implements OnInit {

  currSmoState: string;
  prevSmoState: string;
  currDescription: string;
  tickDescription: string;
  requests: ISmoRequest[] = [];
  tickInterval: NodeJS.Timer = null;
  tickStarted: boolean = false;
  ticksAmount: number = 10000;
  aw: number = 0; // абсолютная пропускная способность
  wc: number = 0; // среднее время пребывания заявки в системе
  lc: number = 0; // среднее число заявок находящихся в системе

  lifeTimesSumm: number = 0;
  createdRequests: number = 0;
  totalTickAmount: number = 0;
  totalRequestsInSystemSumm: number = 0;
  handledRequestsAmount: number = 0;

  constructor(private smoService: SmoService) { }

  ngOnInit() {
    this.smoService.drawer.drawSmoGraph(this.smoService.graph);
    this.smoService.drawer.setActiveState('000');
    this.currSmoState = null;
    this.prevSmoState = '000';
    this.currDescription = 'Начальное состояние';
    this.tickDescription = null;
  }

  reset() {
    this.lifeTimesSumm = 0;
    this.createdRequests = 0;
    this.totalTickAmount = 0;
    this.totalRequestsInSystemSumm = 0;
    this.handledRequestsAmount = 0;
    this.wc = 0;
    this.lc = 0;
    this.aw = 0;
  }

  onStartTicksClick() {
    this.tickInterval = setInterval(() => this.onTickClick(), 100)
    this.tickStarted = true;
  }

  onStopTicksClick() {
    clearInterval(this.tickInterval);
    this.tickStarted = false;
    this.tickInterval = null;
  }

  onTickClick() {
    const smo = this.smoService.smo;
    smo.tick();
    this.totalTickAmount += 1;
    const stateDescriptor = smo.getStateDescriptor();
    this.currSmoState = stateDescriptor.state;
    this.prevSmoState = stateDescriptor.prevState;
    this.currDescription = 'Произошёл переход';
    this.tickDescription = stateDescriptor.explanation;
    this.smoService.drawer.removeActiveState(this.prevSmoState);
    this.smoService.drawer.setActiveState(this.currSmoState);
    this.addRequest(stateDescriptor.createdId);
    this.destroyRequests(stateDescriptor.destroyedIds);
    this.increaseLifeTime();
    this.totalRequestsInSystemSumm += this.requests.length;
    this.aw = this.handledRequestsAmount / this.createdRequests;
    this.wc = this.lifeTimesSumm / this.createdRequests;
    this.lc = this.totalRequestsInSystemSumm / this.totalTickAmount;
  }

  onCountAmountClick() {
    for (let i = 0; i < this.ticksAmount; ++i) {
      this.onTickClick();
    }
  }

  increaseLifeTime() {
    this.requests.forEach(req => req.lifeTime += 1);
  }

  destroyRequests(ids: number[]) {
    const destroyed = this.requests
      .filter(request =>
        ids.indexOf(request.id) > 0);

    const handled = this.requests
      .filter(request => request.lifeTime > 3);

    this.handledRequestsAmount += handled.length;
    destroyed.forEach(request => this.lifeTimesSumm += request.lifeTime);
    [...handled, ...destroyed]
      .map(req => req.id)
      .map(reqId => this.requests.findIndex(req => req.id === reqId))
      .forEach(index => this.requests.splice(index, 1))
  }

  addRequest(id: number) {
    if (id == null) {
      return;
    }

    this.requests.push({
      id,
      isHandled: false,
      lifeTime: 0
    });

    this.createdRequests += 1;
  }
}
