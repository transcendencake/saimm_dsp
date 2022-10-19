import { Component } from '@angular/core';

class Request {
    id: number;
    timeInSystem = 0;
    timeInQueue = 0;
}

class Processor {
    currRequest: Request;
}

class Queue {
    requests: Request[] = [];
}

class StepStats {
    currState: string;
    queueLength = 0;
    requestsInSystem = 0;
    requestsProceeded = 0;
    p1busy = false;
    p2busy = false;
    denial = false;
    logs = [];
}

class Stats {
    pOtk: number;
    q: number;
    lOch: number;
    lSr: number;
    a: number;
    wOch: number;
    wSr: number;
    k1: number;
    k2: number;
}

@Component({
    selector: 'app-lab3',
    templateUrl: './lab3.component.html',
    styleUrls: ['./lab3.component.scss']
})
export class Lab3Component {
    public p = 0.1;
    public pi1 = 0.4;
    public pi2 = 0.4;
    private maxQueueLength = 2;
    public n = 10000;

    public requests: Request[] = [];
    public stepStats: StepStats[] = [];
    public firstProcessor = new Processor();
    public secondProcessor = new Processor();
    public queue = new Queue();
    public stats = new Stats();

    public process(): void {
        this.reset();
        for (let i = 0; i < this.n; i++) {
            this.step();
        }
    }

    public step(): StepStats {
        const currStats = new StepStats();
        this.stepStats.push(currStats);
        currStats.currState = this.getState();

        if (this.firstProcessor.currRequest != null) {
            currStats.p1busy = true;
            currStats.requestsInSystem++;
            if (this.pi1 < 1) {
                this.firstProcessor.currRequest.timeInSystem++;
            }

            if (!this.hasEventHappened(this.pi1)) {
                currStats.requestsProceeded++;
                this.firstProcessor.currRequest = null;
                currStats.logs.push('первый канал обслужил заявку');
            } else {
                currStats.logs.push('первый канал просеял заявку');
            }
        } else {
            currStats.p1busy = false;
        }

        if (this.secondProcessor.currRequest != null) {
            currStats.p2busy = true;
            currStats.requestsInSystem++;

            if (this.pi2 < 1) {
                this.secondProcessor.currRequest.timeInSystem++;
            }

            if (!this.hasEventHappened(this.pi2)) {
                currStats.requestsProceeded++;
                this.secondProcessor.currRequest = null;
                currStats.logs.push('второй канал обслужил заявку');
            } else {
                currStats.logs.push('второй канал просеял заявку');
            }
        } else {
            currStats.p2busy = false;
        }

        if (this.queue.requests.length > 0) {
            currStats.queueLength += this.queue.requests.length;
            currStats.requestsInSystem += this.queue.requests.length;
            const queueLength = this.queue.requests.length;
            for (let i = 0; i < queueLength; i++) {
                this.queue.requests[i].timeInQueue++;
                this.queue.requests[i].timeInSystem++;
            }
            console.log(this.queue.requests);
            for (let i = 0; i < queueLength; i++) {
                let request;
                if (this.firstProcessor.currRequest == null || this.secondProcessor.currRequest == null) {
                    request = this.queue.requests.shift();
                }
                if (this.firstProcessor.currRequest == null) {
                    this.firstProcessor.currRequest = request;
                    currStats.logs.push('заявка из очереди выдана на первый канал');
                } else if (this.secondProcessor.currRequest == null) {
                    this.secondProcessor.currRequest = request;
                    currStats.logs.push('заявка из очереди выдана на второй канал');
                } else {
                    currStats.logs.push('заявка из очереди не выдана');
                }
            }
            const requestsInQueue = [...this.queue.requests];
            console.log(this.queue.requests);
        }

        if (!this.hasEventHappened(this.p)) {
            if (this.queue.requests.length === this.maxQueueLength) {
                currStats.denial = true;
                currStats.logs.push('источник отбросил заявку');
            } else {
                const request = new Request();
                this.requests.push(request);
                request.id = this.requests.length;

                if (!this.firstProcessor.currRequest) {
                    this.firstProcessor.currRequest = request;
                    currStats.logs.push('заявка из источника выдана на первый канал');
                } else if (!this.secondProcessor.currRequest) {
                    this.secondProcessor.currRequest = request;
                    currStats.logs.push('заявка из источника выдана на второй канал');
                } else {
                    this.queue.requests.push(request);
                    currStats.logs.push('заявка из источника выдана в очередь');
                }
            }
        } else {
            currStats.logs.push('источник просеял заявку');
        }

        return currStats;
    }

    public calculateStats(): void {
        const stats = new Stats();

        let denialCount = 0;
        let queueLength = 0;
        let requestsInSystemAmount = 0;
        let processedCount = 0;
        let timeInQueue = 0;
        let timeInSystem = 0;
        let busyTime1 = 0;
        let busyTime2 = 0;

        for (let i = 0; i < this.stepStats.length; i++) {
            const stepStats = this.stepStats[i];
            denialCount += stepStats.denial ? 1 : 0;
            queueLength += stepStats.queueLength;
            requestsInSystemAmount += stepStats.requestsInSystem;
            processedCount += stepStats.requestsProceeded;
            busyTime1 += stepStats.p1busy ? 1 : 0;
            busyTime2 += stepStats.p2busy ? 1 : 0;
        }

        for (let i = 0; i < this.requests.length; i++) {
            const request = this.requests[i];
            timeInQueue += request.timeInQueue;
            timeInSystem += request.timeInSystem;
        }

        stats.pOtk = denialCount / this.stepStats.length;
        stats.q = 1 - stats.pOtk;
        stats.lOch = queueLength / this.stepStats.length;
        stats.lSr = requestsInSystemAmount / this.stepStats.length;
        stats.a = processedCount / this.stepStats.length;
        stats.wOch = timeInQueue / this.requests.length;
        stats.wSr = timeInSystem / this.requests.length;
        stats.k1 = busyTime1 / this.stepStats.length;
        stats.k2 = busyTime2 / this.stepStats.length;
        this.stats = stats;
    }

    public reset(): void {
        this.queue = new Queue();
        this.stats = new Stats();
        this.firstProcessor = new Processor();
        this.secondProcessor = new Processor();
        this.stepStats = [];
        this.requests = [];
    }

    private hasEventHappened(p: number): boolean {
        return Math.random() <= p;
    }

    private getState(): string {
        let result = '';
        result += this.queue.requests.length;
        result += this.firstProcessor.currRequest ? '1' : '0';
        result += this.secondProcessor.currRequest ? '1' : '0';
        return result;
    }
}
