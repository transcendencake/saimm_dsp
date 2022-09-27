import { AlghorythmUtils } from 'src/app/utils/alghorythm.utils';

export class SmoClass implements ISmo {
    idCounter = 0;
    maxId = 100;
    source: ISmoNode = {
        value: 0,
        prevValue: null,
        requestId: null,
        prevRequestId: null,
        destroyedId: null,
        getPossibleNextValues: () => [0, 1],
        getNextValue: () => Math.random() < 0.7 ? 0 : 1,
        getExplanation: () => {
            if (this.source.prevValue == null) {
                return 'Начальное состояние';
            }

            return this.source.value === 1
                ? 'Источник подал заявку'
                : 'Источник просеял заявку';
        }
    };
    storage: ISmoNode = {
        value: 0,
        prevValue: null,
        requestId: null,
        prevRequestId: null,
        destroyedId: null,
        getPossibleNextValues: () => {
            return this.source.value === 1 ? [0, 1] : [0];
        },
        getNextValue: () => this.source.prevValue === 0
            ? 0
            : Math.random() < 0.7 ? 0 : 1,
        getExplanation: () => {
            if (this.source.prevValue == null) {
                return 'Начальное состояние';
            }

            return this.source.prevValue === 1
                ? this.storage.value === 1
                    ? 'первый канал пропустил заявку'
                    : 'первый канал просеял заявку'
                : null;
        }
    };
    destination: ISmoNode = {
        value: 0,
        prevValue: null,
        requestId: null,
        prevRequestId: null,
        destroyedId: null,
        getPossibleNextValues: () => {
            return this.storage.value === 1 ? [0, 1] : [0];
        },
        getNextValue: () => this.storage.prevValue === 0
            ? 0
            : Math.random() < 0.75 ? 0 : 1,
        getExplanation: () => {
            if (this.source.prevValue == null) {
                return 'Начальное состояние';
            }

            return this.storage.prevValue === 1
                ? this.destination.value === 1
                    ? 'второй канал обслужил заявку'
                    : 'второй канал просеял заявку'
                : null;
        }
    };

    constructor() {
    }

    tick(): void {
        this.source.prevValue = this.source.value;
        this.storage.prevValue = this.storage.value;
        this.destination.prevValue = this.destination.value;
        this.source.value = this.source.getNextValue();
        this.source.prevRequestId = this.source.requestId;
        if (this.source.value === 1) {
            this.source.requestId = this.getNextId();
        } else {
            this.source.destroyedId = this.source.requestId;
        }
        this.storage.value = this.storage.getNextValue();
        this.storage.destroyedId = null;
        this.storage.prevRequestId = this.storage.requestId;
        if (this.storage.value === 1) {
            this.storage.requestId = this.source.prevRequestId;
        } else {
            this.storage.requestId = null;
        }
        this.destination.value = this.destination.getNextValue();
        this.destination.prevRequestId = this.destination.requestId;
        if (this.destination.value === 1) {
            this.destination.requestId = this.storage.prevRequestId;
        } else {
            this.destination.requestId = null;
            if (this.storage.prevValue === 1) {
                this.destination.destroyedId = this.storage.prevRequestId;
            }
        }
    }

    getState(): string {
        return this.nodes.map(node => node.value).join('');
    }

    getStateDescriptor(): IStateDescriptor {
        return {
            explanation: [
                this.source.getExplanation(),
                this.storage.getExplanation(),
                this.destination.getExplanation()
            ].filter(desc => desc != null).join(', '),
            prevState: this.nodes.map(node => node.prevValue).join(''),
            state: this.getState(),
            amountInSystem: this.nodes.map(node => node.requestId).filter(id => id != null).length,
            createdId: this.source.requestId,
            destroyedIds: this.nodes.map(node => node.destroyedId).filter(id => id != null)
        };
    }

    getPossibleStates(): string[] {
        const possibleValueArrays = this.nodes.map(node => node.getPossibleNextValues());
        return [...AlghorythmUtils.Cartesian(possibleValueArrays)]
            .map((arr: number[]) => arr.join(''));
    }

    setState(state: string): void {
        this.source.value = Number(state[0]);
        this.storage.value = Number(state[1]);
        this.destination.value = Number(state[2]);
    }

    getCopy(): SmoClass {
        const smo = new SmoClass();
        smo.setState(this.getState());
        return smo;
    }

    private get nodes(): ISmoNode[] {
        return [this.source, this.storage, this.destination];
    }

    private getNextId(): number {
        const nextId = this.idCounter;
        this.idCounter += 1;
        if (this.idCounter === this.maxId) {
            this.idCounter = 0;
        }
        return nextId;
    }
}
