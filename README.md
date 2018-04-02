# ngrx-undo-redo
undo-redo library for @ngrx/store

## How to use it

```typescript
import { undoRedo } from 'ngrx-undo-redo';

@NgModule({
  imports: [
    StoreModule.forRoot({ stage: appReducer }, {
        // call undoRedo in meta reducers array with no arguments when no config needed
      metaReducers: [undoRedo()]
    }),
  ],
})
export class AppModule { }
```
#To undo/redo action use action with 'UNDO_STATE'/'REDO_STATE' type

```typescript
import  { UndoActions } from 'ngrx-undo-redo';

@Component({
    selector: `undo-redo-buttons`,
    template: `
    <div>
      <button (click)="undo()">Back</button>
      <button (click)="redo()">Forward</button>
    </div>
    `
export class UnodRedoButtonsComponent {

    constructor(private store: Store<ReadmeState>) { }

    undo() {
        this.store.dispatch(<UndoActions>{ type: 'UNDO_STATE' });
    }
    redo() {
        this.store.dispatch(<UndoActions>{ type: 'REDO_STATE' });
    }
}
```

## Configuration
    
    To configure UndoRedo you have to pass object with following interface

```typescript

interface Config {
        // number of maximum undo/redo, its 5 by default
    maxBufferSize?: number;
        // array of actions that result state can be undo, ignore others
    allowedActions?: Action[];
        // undoRedo can throw action, to perform change count in state
    changesActionType?: string;
        // in case of action types conflics, you can define your own undo/redo action types
    undoActionType?: string;
    redoActionType?: string;
}
```

    Config has to be passed to undoRedo 

```typescript

import { undoRedo } from 'ngrx-undo-redo';

@NgModule({
  imports: [
    StoreModule.forRoot({ stage: appReducer }, {
      metaReducers: [undoRedo({
        maxBufferSize: 15,
        // undo/redo can be applyied only on ADD_ITEM/REMOVE_ITEM result state,
        allowedActions: [{ type: 'ADD_ITEM' }, { type: 'REMOVE_ITEM' }],
        changesActionType: 'INCREMENT_CHANGES_COUNT',
        undoActionType: 'UNDO',
        redoActionType: 'REDO'
      })]
    }),
  ],
})
export class AppModule { }
```

```typescript

    
@Component({
    selector: `undo-redo-buttons`,
    template: `
    <div>
      <button (click)="undo()">Back</button>
      <button (click)="redo()">Forward</button>
    </div>
    `
export class UnodRedoButtonsComponent {

    constructor(private store: Store<ReadmeState>) { }

    undo() {
        this.store.dispatch(<UndoActions>{ type: 'UNDO' });
    }
    redo() {
        this.store.dispatch(<UndoActions>{ type: 'REDO' });
    }
}

```

```typescript 
const initialState = {
    stage: [],
    changesCount: 0,
};

function appReducer(state = initialState, action: AppActions) {
    switch (action.type) {
        case 'ADD_ITEM': {
            return {
                ...state,
                stage: [...state.stage, action.payload]
            }
        };
        case 'REMOVE_ITEM': {
            return {
                ...state,
                stage: [...state.stage.slice(0, state.stage.length - 1)]
            }
        };
        // action type passed to config
        case 'INCREMENT_CHANGES_COUNT': {
            return {
                ...state,
                changesCount: action.payload
            }
        }

```



