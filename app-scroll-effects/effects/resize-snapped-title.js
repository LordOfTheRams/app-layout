/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '../app-scroll-effects-behavior.js';

import {ElementWithBackground, registerEffect} from '../../helpers/helpers.js';

/**
 * Upon scrolling past a threshold, CSS transition the font size of a designated
 * title element between two values.
 */
registerEffect('resize-snapped-title', {
  /** @this {ResizeSnappedTitle} */
  setUp: function setUp(config) {
    var title = this._getDOMRef('mainTitle');
    var condensedTitle = this._getDOMRef('condensedTitle');
    var duration = config.duration || '0.2s';
    var fx = {};

    if (!condensedTitle) {
      console.warn(
          'Scroll effect `resize-snapped-title`: undefined `condensed-title`');
      return false;
    }
    if (!title) {
      console.warn(
          'Scroll effect `resize-snapped-title`: undefined `main-title`');
      return false;
    }

    title.style.transitionProperty = 'opacity';
    title.style.transitionDuration = duration;
    condensedTitle.style.transitionProperty = 'opacity';
    condensedTitle.style.transitionDuration = duration;
    fx.condensedTitle = condensedTitle;
    fx.title = title;
    this._fxResizeSnappedTitle = fx;
  },
  /** @this {ResizeSnappedTitle} */
  run: function run(p, y) {
    var fx = this._fxResizeSnappedTitle;
    if (p > 0) {
      fx.title.style.opacity = 0;
      fx.condensedTitle.style.opacity = 1;
    } else {
      fx.title.style.opacity = 1;
      fx.condensedTitle.style.opacity = 0;
    }
  },
  /** @this {ResizeSnappedTitle} */
  tearDown: function tearDown() {
    var fx = this._fxResizeSnappedTitle;
    fx.title.style.transition = '';
    fx.condensedTitle.style.transition = '';
    delete this._fxResizeSnappedTitle;
  }
});

/**
 * @interface
 * @extends {ElementWithBackground}
 */
class ResizeSnappedTitle {
  constructor() {
    /**
     * @type {?}
     */
    this._fxResizeSnappedTitle;
  }
}
