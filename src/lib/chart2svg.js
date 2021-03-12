const SusAnalyzer = require('sus-analyzer');
const xmlbuilder = require('xmlbuilder2');
const { Bezier } = require("bezier-js");

const chart2svg = (chartString, assetsPath) => {

  const ticksPerBeat = 480;
  const susData = SusAnalyzer.getScore(chartString, ticksPerBeat);

  const pixelsPerBeat = 100; // TODO: scale by defining full height (maybe? how about bpm changes?)
  const topMargin = Math.ceil(pixelsPerBeat / 8);
  const bottomMargin = Math.ceil(pixelsPerBeat / 8);
  const leftMargin = Math.ceil(pixelsPerBeat / 8);
  const rightMargin = Math.ceil(pixelsPerBeat / 8);
  const bpmCounts = susData.BPMs.reduce((acc, cur) => {
    const newCount = (acc.counts[cur] || 0) + 1;
    if (newCount > acc.max) {
      acc.maxFrequency = newCount;
      acc.mostFrequent = cur;
    }
    acc.counts[cur] = newCount;
    return acc;
  }, { counts: {}, max: 0 });
  const measureHeights = susData.BEATs.map((numberOfBeats, i) => numberOfBeats * pixelsPerBeat / bpmCounts.mostFrequent * susData.BPMs[i]);
  const measureBottoms = measureHeights.reverse().reduce((acc, cur, i) => [...acc, acc[i] + cur], [topMargin]).reverse();
  const svgHeight = measureBottoms[0] + bottomMargin;

  const beatWidthRatio = 0.8; // TODO: scale by defining full width
  const laneWidth = Math.ceil(pixelsPerBeat * beatWidthRatio / 12);
  const laneLefts = [...Array(13)].map((_, i) => i * laneWidth + leftMargin);

  const svgWidth = leftMargin + laneWidth * 12 + rightMargin;

  const curveEaseInRatio = 0.5;
  const curveEaseOutRatio = 0.5;
  const straightEaseInRatio = 0;
  const straightEaseOutRatio = 0;

  const getPositionKey = note => `M${note.measure}T${note.tick}L${note.lane}W${note.width}`;
  const drawNote = (group, type, measure, tick, lane, width) => {
    const scale = laneWidth * 3 / (354 - 48 - 48);
    const y = measureBottoms[measure] - tick / ticksPerBeat * pixelsPerBeat - (type === 'long' ? 54 : 53) * scale - 36 * scale;
    const height = 186 * scale;
    const noteSideMargin = Math.ceil(48 * scale);
    const noteEndWidth = Math.ceil(91 * scale);
    group.ele('image', {
      href: `${assetsPath}/notes_${type}_left.png`,
      x: laneLefts[lane] - noteSideMargin,
      y,
      width: noteEndWidth,
      height,
      preserveAspectRatio: 'none',
    }).up().ele('image', {
      href: `${assetsPath}/notes_${type}_right.png`,
      x: laneLefts[lane] - noteSideMargin + noteEndWidth + laneWidth * (width - 1),
      y,
      width: noteEndWidth,
      height,
      preserveAspectRatio: 'none',
    });
    if (width > 1) {
      group.ele('image', {
        href: `${assetsPath}/notes_${type}_middle.png`,
        x: laneLefts[lane] - noteSideMargin + noteEndWidth,
        y,
        width: laneWidth * (width - 1),
        height,
        preserveAspectRatio: 'none',
      });
    }
  }
  const flickArrowSizes = {
    straight: [
      {
        width: 144,
        height: 158,
      },
      {
        width: 188,
        height: 174,
      },
      {
        width: 248,
        height: 194,
      },
      {
        width: 312,
        height: 216,
      },
      {
        width: 374,
        height: 236,
      },
      {
        width: 436,
        height: 258,
      },
    ],
    diagonal: [
      {
        width: 176,
        height: 160,
      },
      {
        width: 228,
        height: 182,
      },
      {
        width: 298,
        height: 212,
      },
      {
        width: 376,
        height: 242,
      },
      {
        width: 444,
        height: 270,
      },
      {
        width: 514,
        height: 300,
      },
    ],
  };
  const drawFlickArrow = (group, measure, tick, lane, width, left = false, right = false, critical = false) => {
    const arrowLaneWidth = width > 6 ? 6 : width;
    const arrowWidth = laneWidth * arrowLaneWidth;
    const href = `${assetsPath}/notes_flick_arrow${critical ? '_crtcl' : ''}_${('' + arrowLaneWidth).padStart(2, '0')}${(right || left) ? '_diagonal_' : ''}${left ? 'left' : (right ? 'right' : '')}.png`;
    const flickArrowSize = (right || left) ? flickArrowSizes.diagonal[arrowLaneWidth - 1] : flickArrowSizes.straight[arrowLaneWidth - 1];
    const scale = arrowWidth / flickArrowSize.width;
    group.ele('image', {
      href,
      x: laneLefts[lane] + width / 2 * laneWidth - arrowWidth / 2 + (left ? -laneWidth / 4 : (right ? laneWidth / 4 : 0)),
      y: measureBottoms[measure] - tick / ticksPerBeat * pixelsPerBeat - flickArrowSize.height * scale - pixelsPerBeat / 32,
      width: arrowWidth,
    });
  };
  const drawSlidePath = (group, fromMeasure, fromTick, fromLane, fromWidth, toMeasure, toTick, toLane, toWidth, easeIn, easeOut, critical = false) => {
    const shrinkWidth = laneWidth / 16;
    const fromLeftX = Math.ceil(laneLefts[fromLane] + shrinkWidth);
    const fromRightX = Math.floor(laneLefts[fromLane] + laneWidth * fromWidth - shrinkWidth);
    const fromY = Math.floor(measureBottoms[fromMeasure] - fromTick / ticksPerBeat * pixelsPerBeat);
    const toLeftX = Math.ceil(laneLefts[toLane] + shrinkWidth);
    const toRightX = Math.floor(laneLefts[toLane] + laneWidth * toWidth - shrinkWidth);
    const toY = Math.floor(measureBottoms[toMeasure] - toTick / ticksPerBeat * pixelsPerBeat);
    const easeInRatio = easeIn ? curveEaseInRatio : (easeIn ? 0 : straightEaseInRatio);
    const easeOutRatio = easeOut ? curveEaseOutRatio : (easeIn ? 0 : straightEaseOutRatio);

    const d = `M${fromLeftX},${fromY}C${fromLeftX},${fromY - (fromY - toY) * easeInRatio},${toLeftX},${toY + (fromY - toY) * easeOutRatio},${toLeftX},${toY},H${toRightX}C${toRightX},${toY + (fromY - toY) * easeOutRatio},${fromRightX},${fromY - (fromY - toY) * easeInRatio},${fromRightX},${fromY}z`;

    group.ele('path', {
      // stroke: '#FFFFFFF0',
      // 'stroke-width': 2,
      fill: critical ? '#FFFCCCF0' : '#DAFDF0F0',
      d,
    });
  };
  const drawWaypointDiamond = (group, measure, tick, lane, width, critical = false) => {
    const diamondWidth = laneWidth * 1.5;
    group.ele('image', {
      href: `${assetsPath}/notes_long_among${critical ? '_crtcl' : ''}.png`,
      x: laneLefts[lane] + laneWidth * width / 2 - diamondWidth / 2,
      y: measureBottoms[measure] - tick / ticksPerBeat * pixelsPerBeat - diamondWidth / 2,
      width: diamondWidth,
    });
  };
  const drawInterpolatedDiamond = (group, measure, tick, fromMeasure, fromTick, fromLane, fromWidth, toMeasure, toTick, toLane, toWidth, easeIn, easeOut, critical = false) => {
    const diamondWidth = laneWidth * 1.5;
    const shrinkWidth = laneWidth / 16;
    const fromLeftX = Math.ceil(laneLefts[fromLane] + shrinkWidth);
    const fromRightX = Math.floor(laneLefts[fromLane] + laneWidth * fromWidth - shrinkWidth);
    const fromY = Math.floor(measureBottoms[fromMeasure] - fromTick / ticksPerBeat * pixelsPerBeat);
    const toLeftX = Math.ceil(laneLefts[toLane] + shrinkWidth);
    const toRightX = Math.floor(laneLefts[toLane] + laneWidth * toWidth - shrinkWidth);
    const toY = Math.floor(measureBottoms[toMeasure] - toTick / ticksPerBeat * pixelsPerBeat);
    const easeInRatio = easeIn ? curveEaseInRatio : (easeIn ? 0 : straightEaseInRatio);
    const easeOutRatio = easeOut ? curveEaseOutRatio : (easeIn ? 0 : straightEaseOutRatio);
    const y = measureBottoms[measure] - tick / ticksPerBeat * pixelsPerBeat;
    let leftX, rightX;

    const leftBezier = new Bezier(fromLeftX, fromY, fromLeftX, fromY - (fromY - toY) * easeInRatio, toLeftX, toY + (fromY - toY) * easeOutRatio, toLeftX, toY);
    const rightBezier = new Bezier(fromRightX, fromY, fromRightX, fromY - (fromY - toY) * easeInRatio, toRightX, toY + (fromY - toY) * easeOutRatio, toRightX, toY);

    leftX = Math.ceil(leftBezier.get(leftBezier.intersects({ p1: { x: 0, y: y }, p2: { x: svgWidth, y: y } })[0]).x);
    rightX = Math.floor(rightBezier.get(rightBezier.intersects({ p1: { x: 0, y: y }, p2: { x: svgWidth, y: y } })[0]).x);

    group.ele('image', {
      href: `${assetsPath}/notes_long_among${critical ? '_crtcl' : ''}.png`,
      x: (leftX + rightX) / 2 - diamondWidth / 2,
      y: y - diamondWidth / 2,
      width: diamondWidth,
    });
  };

  const taps = {};
  const criticals = {};
  const flickModifiers = {};

  const slideStarts = {};
  const slideEnds = {};
  const slideDiamonds = {};
  const slideWaypoints = {};
  const slideWaypointRemovers = {};
  const slideEaseInModifiers = {};
  const slideEaseOutModifiers = {};

  susData.slideNotes.forEach(slideNote => {
    slideNote.forEach(note => {
      const key = getPositionKey(note);
      switch (note.noteType) {
        case 1:
          slideStarts[key] = [...(slideStarts[key] || []), note];
          break;
        case 2:
          slideEnds[key] = [...(slideEnds[key] || []), note];
          break;
        case 3:
          slideDiamonds[key] = [...(slideDiamonds[key] || []), note];
          break;
        case 5:
          slideWaypoints[key] = [...(slideWaypoints[key] || []), note];
          break;
        default:
      }

    });
  });
  susData.airNotes.forEach(note => {
    const key = getPositionKey(note);
    switch (note.noteType) {
      case 1:
      case 3:
      case 4:
        flickModifiers[key] = [...(flickModifiers[key] || []), note];
        break;
      case 2:
        slideEaseInModifiers[key] = [...(slideEaseInModifiers[key] || []), note];
        break;
      case 5:
      case 6:
        slideEaseOutModifiers[key] = [...(slideEaseOutModifiers[key] || []), note];
        break;
      default:
    }
  });
  susData.shortNotes.forEach(note => {
    const key = getPositionKey(note);
    switch (note.noteType) {
      case 1:
        taps[key] = [...(taps[key] || []), note];
        break;
      case 2:
        criticals[key] = [...(criticals[key] || []), note];
        break;
      case 3:
        slideWaypointRemovers[key] = [...(slideWaypointRemovers[key] || []), note];
        break;
      default:
    }
  });

  const svg = xmlbuilder.create().ele('svg', {
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    width: svgWidth,
    height: svgHeight,
  });
  const backgroundGroup = svg.ele('g', { id: 'background' });
  const linesGroup = svg.ele('g', { id: 'lines' });
  const laneLinesGroup = linesGroup.ele('g', { id: 'laneLines' })
  const measureLinesGroup = linesGroup.ele('g', { id: 'measureLines' });
  const beatLinesGroup = linesGroup.ele('g', { id: 'beatLines' });
  const slidePathsGroup = svg.ele('g', { id: 'slidePaths' });
  const slideDiamondsGroup = svg.ele('g', { id: 'slideDiamonds' });
  const notesGroup = svg.ele('g', { id: 'notes' });
  const criticalNotesGroup = svg.ele('g', { id: 'criticalNotes' });
  const arrowsGroup = svg.ele('g', { id: 'arrows' });

  backgroundGroup.ele('rect', {
    fill: '#00304030',
    // fill: '#000000FF',
    width: laneWidth * 12,
    height: svgHeight,
    x: leftMargin,
    y: 0,
  });

  laneLefts.filter((_, i) => i % 2 === 0).forEach((x, i, arr) => {
    laneLinesGroup.ele('line', {
      stroke: i === 0 | i === arr.length - 1 ? '#FFFFFFFF' : '#FFFFFF80',
      'stroke-width': 2,
      x1: x,
      y1: 0,
      x2: x,
      y2: svgHeight,
    });
  });
  measureBottoms.forEach(y => {
    measureLinesGroup.ele('line', {
      stroke: '#FFFFFFFF',
      'stroke-width': 2,
      x1: leftMargin,
      y1: y,
      x2: svgWidth - rightMargin,
      y2: y,
    });
  });
  susData.BEATs.forEach((measureBeat, measure) => {
    [...Array(measureBeat)].map((_, i) => i).slice(1).forEach(beat => {
      const y = measureBottoms[measure] - pixelsPerBeat * beat;
      beatLinesGroup.ele('line', {
        stroke: '#FFFFFF80',
        'stroke-width': 2,
        x1: leftMargin,
        y1: y,
        x2: svgWidth - rightMargin,
        y2: y,
      });
    });
  });

  // TODO: use asset/draw better gradient for paths

  susData.shortNotes.filter(note => note.lane > 1 && note.lane < 14).forEach(note => {
    const key = getPositionKey(note);
    switch (note.noteType) {
      case 1:
        if (key in flickModifiers) {
          drawNote(notesGroup, 'flick', note.measure, note.tick, note.lane - 2, note.width);
          drawFlickArrow(arrowsGroup, note.measure, note.tick, note.lane - 2, note.width, flickModifiers[key].some(note => note.noteType === 3), flickModifiers[key].some(note => note.noteType === 4));
        }
        else if (!(key in slideEaseInModifiers) && !(key in slideEaseOutModifiers)) {
          drawNote(notesGroup, 'normal', note.measure, note.tick, note.lane - 2, note.width);
        }
        break;
      case 2:
        if (!(key in slideStarts)) {
          drawNote(criticalNotesGroup, 'crtcl', note.measure, note.tick, note.lane - 2, note.width);
          if (key in flickModifiers) {
            drawFlickArrow(arrowsGroup, note.measure, note.tick, note.lane - 2, note.width, flickModifiers[key].some(note => note.noteType === 3), flickModifiers[key].some(note => note.noteType === 4), true);
          }
        }
        break;
      default:
    }
  });
  susData.slideNotes.forEach(slideNote => {
    const pathGroup = slidePathsGroup.ele('g');
    const diamondGroup = slideDiamondsGroup.ele('g');
    const start = slideNote.find(note => note.noteType === 1);
    const startKey = getPositionKey(start);

    let paths = slideNote.reduce((acc, cur, i, arr) => {
      const key = getPositionKey(cur);
      if (key in slideWaypointRemovers) {
        if (acc.length > 0) {
          acc[acc.length - 1].pathless = [...acc[acc.length - 1].pathless, cur];
        }
        return acc;
      }
      else {
        if (acc.length > 0) {
          acc[acc.length - 1].end = cur;
        }
        if (i === arr.length - 1) {
          return acc;
        }
        const key = getPositionKey(cur);
        return [...acc, { start: cur, easeIn: key in slideEaseInModifiers, easeOut: key in slideEaseOutModifiers, pathless: [] }]
      }
    }, []);
    // paths = paths.reduce((acc, cur) => {
    //   if (acc.length > 0) {
    //     const pathStart = acc[acc.length - 1].start;
    //     const pathMid = cur.start;
    //     const pathEnd = cur.end;
    //     if (!acc[acc.length - 1].easeIn &&
    //       !acc[acc.length - 1].easeOut &&
    //       !cur.easeIn &&
    //       !cur.easeOut &&
    //       (pathMid.tick - pathStart.tick) / (pathMid.lane - pathStart.lane) === (pathEnd.tick - pathMid.tick) / (pathEnd.lane - pathMid.lane) &&
    //       (pathMid.tick - pathStart.tick) / (pathMid.lane + pathMid.width - pathStart.lane + pathStart.width) === (pathEnd.tick - pathMid.tick) / (pathEnd.lane + pathEnd.width - pathMid.lane + pathMid.width)) {
    //       acc[acc.length - 1].end = pathEnd;
    //       if (cur.start.noteType === 3) {
    //         acc[acc.length - 1].pathless = [...acc[acc.length - 1].pathless, pathMid];
    //       }
    //       return acc;
    //     } else {
    //       return [...acc, cur];
    //     }
    //   }
    //   return [cur];
    // }, []);
    paths.forEach(path => {
      drawSlidePath(pathGroup, path.start.measure, path.start.tick, path.start.lane - 2, path.start.width, path.end.measure, path.end.tick, path.end.lane - 2, path.end.width, path.easeIn, path.easeOut, startKey in criticals);
      if (path.start.noteType === 3) {
        drawWaypointDiamond(diamondGroup, path.start.measure, path.start.tick, path.start.lane - 2, path.start.width, startKey in criticals);
      }
      path.pathless.forEach(pathless => {
        drawInterpolatedDiamond(
          diamondGroup,
          pathless.measure, pathless.tick,
          path.start.measure, path.start.tick, path.start.lane - 2, path.start.width,
          path.end.measure, path.end.tick, path.end.lane - 2, path.end.width,
          path.easeIn, path.easeOut, startKey in criticals
        );
      });
    });

    slideNote.forEach(note => {
      const key = getPositionKey(note);
      switch (note.noteType) {
        case 1:
        case 2:
          if (startKey in criticals || key in criticals) {
            drawNote(criticalNotesGroup, 'crtcl', note.measure, note.tick, note.lane - 2, note.width);
            if (key in flickModifiers) {
              drawFlickArrow(arrowsGroup, note.measure, note.tick, note.lane - 2, note.width, flickModifiers[key].some(note => note.noteType === 3), flickModifiers[key].some(note => note.noteType === 4), true);
            }
          }
          else if (key in flickModifiers) {
            drawNote(notesGroup, 'flick', note.measure, note.tick, note.lane - 2, note.width);
            drawFlickArrow(arrowsGroup, note.measure, note.tick, note.lane - 2, note.width, flickModifiers[key].some(note => note.noteType === 3), flickModifiers[key].some(note => note.noteType === 4));
          }
          else {
            drawNote(notesGroup, 'long', note.measure, note.tick, note.lane - 2, note.width);
          }
          break;
        default:
      }

    });
  });

  const svgString = svg.end({
    prettyPrint: true,
  });
  return svgString;

}

export default chart2svg;