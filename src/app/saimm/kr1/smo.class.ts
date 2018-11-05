export class SmoClass implements ISmo {
    source: ISmoNode = {
        value: 0,
        getPossibleNextValues: () => [0, 1],
        getNextValue: () => 0
    };
    storage: ISmoNode = {
        value: 0,
        getPossibleNextValues: () => {
            return this.source.value === 1 ? [0, 1] : [0];
        },
        getNextValue: () => 0
    };
    destination: ISmoNode = {
        value: 0,
        getPossibleNextValues: () => {
            return this.storage.value == 1 ? [0, 1] : [0];
        },
        getNextValue: () => 0
    }

    constructor() {
    }

    private get nodes(): ISmoNode[] {
        return [this.source, this.storage, this.destination];
    }

    getState(): string {
        return this.nodes.map(node => node.value).join('');
    }

    getPossibleStates(): string[] {
        const states: string[] = [];
        return [];
    }

    setState(state: string): void {
        this.source.value = Number(state[0]);
        this.storage.value = Number(state[1]);
        this.destination.value = Number(state[2]);
    }
}