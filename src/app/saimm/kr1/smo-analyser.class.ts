export class SmoAnalyser {
    public analyse(smo: ISmo): ISmoGraph {
        const visitedStates: string[] = [];
        const copySmo = smo.getCopy();
        const visit = state => visitedStates.push(state);
        const isVisited = state => visitedStates.indexOf(state) > -1;
        return {
            states: visitedStates,
            tree: this.buildSmoAnalyseModel({
                smo: copySmo,
                visit,
                isVisited
            })
        };
    }

    private buildSmoAnalyseModel(buildParams: ISmoBuildAnalyseModelParams): ISmoAnalyseModel {
        const { smo, visit, isVisited } = buildParams;
        const currState = smo.getState();
        if (!isVisited(currState)) {
            visit(currState);
        }
        return {
            possibleStates: smo.getPossibleStates()
                .map(state => isVisited(state)
                    ? this.getVisitedState(state)
                    : this.getNotVisitedState(state, buildParams)),
            state: smo.getState()
        }
    }

    private getVisitedState(state: string): ISmoAnalyseModel {
        return {
            state,
            possibleStates: null
        }
    }

    private getNotVisitedState(state: string, buildParams: ISmoBuildAnalyseModelParams): ISmoAnalyseModel {
        const copySmo = buildParams.smo.getCopy();
        copySmo.setState(state);
        buildParams.smo = copySmo;
        return this.buildSmoAnalyseModel(buildParams);
    }
}