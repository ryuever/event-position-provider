# Event Position Provider

To provide event info relative to specified HTMLElement.

## usage

```js
import EventPositionProvider from 'event-position-provider';

this.epp = new EventPositionProvider({
  entryNodes: [
    this.target,
    this.listNode,
  ],
})
```

## API

### `EventPositionProvider`

- entryClasses(Array | String) : The watched node which will matched with.
- entryNodes(Array): Nodes will watch.
- watchEvent(Array | ['click', 'hover'], default: ['click']): Events it will watch.

### `click` event

On default, this lib watch `click` event related to watched nodes; For these condition it will emit three different `stat.eventType`

- `willFire`: It will be triggered on the first time click watch entries.
- `willDismiss`: It will be triggered on the first time click outside the watch entries.
- `onPersistence`: It will be triggered on the second or more times click watch entries.

```js
this.epp.on('click', (stat) => {
  const { event, eventType } = stat;

  if (eventType === 'willDismiss') {
    // ...
  }

  if (eventType === 'willFire') {
    // ...
  }
})
```

### `hover` event

On default, this lib watch `hover` event related to watched nodes; For these condition it will emit three different `stat.eventType`

- `willEnter`: It will be triggered on `mouseover` the watched entries.
- `willLeave`: It will be triggered on `mouseleave` the watched entries.
- `onMoving`: It will be triggered on mouse moving on the watched entries.

```js
this.epp.on('hover', (stat) => {
  const { event, eventType } = stat;

  if (eventType === 'willEnter') {
    // ...
  }

  if (eventType === 'willLeave') {
    // ...
  }
})
```