export class ColorsProvider {
    private colors: string[] = [
        'red',
        'black',
        'yellow',
        'green',
        'orange',
        'gray',
        'purple'
    ];

    private currColorIndex = 0;

    getColor(): string {
        return this.colors[this.currColorIndex];
    };

    getColorAndSetNext(): string {
        const color = this.colors[this.currColorIndex];
        this.currColorIndex = this.getNextIndex();
        return color;
    }

    getRandomColor(): string {
        const rand = Math.random() * (this.colors.length - 0) + 0;
        const randIndex = Math.floor(rand);
        return this.colors[randIndex];
    }

    private getNextIndex(): number {
        const nextIndex = this.currColorIndex + 1;
        return nextIndex >= this.colors.length
            ? 0
            : nextIndex;
    }
}