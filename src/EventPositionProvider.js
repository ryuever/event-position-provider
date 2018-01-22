import Emitter from 'emitter-helper';
import DOMEventer from 'dom-eventer';
import parseEntries from './parseEntries';

const OM = 'onMoving';
const WL = 'willLeave';
const WE = 'willEnter';

const WF = 'willFire';
const WD = 'willDismiss';
const OP = 'onPersistence';

class EventPositionProvider extends Emitter {
  constructor(opts) {
    super();

    const {
      entry,
      watchEvent,

      entryClasses,
      entryNodes,

      allianceClasses,
      allianceNodes,
    } = opts || {};

    this.watchEvent = watchEvent ? [].concat(watchEvent) : ['click'];

    this.eventer = new DOMEventer();

    this.entries = parseEntries({
      classes: entryClasses,
      nodes: entryNodes,
    });

    this.alliances = parseEntries({
      classes: allianceClasses,
      nodes: allianceNodes,
    });

    this.silenceLeave = true;

    this.hoverStat = {};
    this.clickStat = {};

    this.mountHandler();
  }

  mountHandler() {
    this.watchEvent.indexOf('hover') >= 0 && this.mountHoverHandler();
    this.watchEvent.indexOf('click') >= 0 && this.mountClickHandler();
  }

  mountHoverHandler() {
    this.eventer.listen(document.body, 'mouseover', this.hoverHandler.bind(this), true);
    this.eventer.listen(document.body, 'mouseleave', this.hoverHandler.bind(this), true);
  }

  mountClickHandler() {
    this.eventer.listen(document.body, 'click', this.clickHandler.bind(this), true);
  }

  clickHandler(e) {
    const nextStat = this.calcNextClickStat(e);

    const { isOutside } = this.clickStat;
    const { isOutside: nextIsOutside } = nextStat;

    if (typeof isOutside === 'undefined' || isOutside && !nextIsOutside) return this.willFire(nextStat);
    if (!isOutside && nextIsOutside) return this.willDismiss(nextStat);
    if (typeof isOutside !== 'undefined' && !isOutside && !nextIsOutside) return this.onPersistence(nextStat);

    this.clickStat = nextStat;
  }

  calcNextClickStat(e) {
    const stat = {
      event: e,
    };
    const len = this.entries.length;

    for (let i = 0; i < len; i++) {
      if (this.entries[i].contains(e.target)) {
        stat.isOutside = false;

        return stat;
      }
    }

    stat.isOutside = true;
    return stat;
  }

  willDismiss(stat) {
    stat.times = 1;
    this.emit('click', {
      ...stat,
      eventType: WD,
    });
  }

  willFire(stat) {
    stat.times = 1;
    this.emit('click', {
      ...stat,
      eventType: WF,
    });
  }

  onPersistence(stat) {
    stat.times = this.clickStat.times ? this.clickStat.times + 1 : 1,

    this.emit('click', {
      ...stat,
      eventType: OP,
    });
  }

  resetClickStat() {
    this.clickStat = {};
  }

  hoverHandler(e) {
    const nextStat = this.calcNextMoveStat(e);

    const { isOutside } = this.hoverStat;
    const { isOutside: nextIsOutside } = nextStat;

    if (typeof isOutside === 'undefined' || isOutside && !nextIsOutside) this.willEnter(nextStat);
    if (!isOutside && nextIsOutside) this.willLeave(nextStat);
    if (typeof isOutside !== 'undefined' && !isOutside && !nextIsOutside) this.onMoving(nextStat);

    this.hoverStat = nextStat;
  }

  calcNextMoveStat(e) {
    const stat = {
      event: e,
    };

    const len = this.entries.length;

    for (let i = 0; i < len; i++) {
      if (this.entries[i].contains(e.target)) {
        stat.isOutside = false;

        return stat;
      }
    }

    stat.isOutside = true;
    return stat;
  }

  willLeave(stat) {
    stat.times = 1;
    this.emit('hover', {
      ...stat,
      eventType: WL,
    });
  }

  willEnter(stat) {
    stat.times = 1;
    this.emit('hover', {
      ...stat,
      eventType: WE,
    });
  }

  onMoving(stat) {
    stat.times = this.hoverStat.times ? this.hoverStat.times + 1 : 1,
    this.emit('hover', {
      ...stat,
      eventType: OM,
    });
  }

  resetHoverStat() {
    this.hoverStat = {};
  }

  resetStat() {
    this.resetClickStat();
    this.resetHoverStat();
  }
}

export default EventPositionProvider;
