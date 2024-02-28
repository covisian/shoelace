import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  :host(sl-button[block]) {
    display: block;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-bg1);
    color: var(--sl-color-neutral-950);
    border: var(--sl-border-default);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-bg2);
    color: var(--sl-color-neutral-1000);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-1000);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-button-border-color-primary);
    color: #ffffff;
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-400);
    border-color: var(--sl-color-primary-400);
    color: #ffffff;
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-button-border-color-primary);
    color: #ffffff;
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-button-border-color-success);
    color: #282828;
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-400);
    border-color: var(--sl-color-success-400);
    color: #282828;
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-button-border-color-success);
    color: #282828;
  }

  /* Neutral */
  .button--standard.button--neutral {
    border-color: var(--sl-color-neutral-950);
    background-color: var(--sl-color-neutral-950);
    color: var(--sl-color-neutral-50);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-1000);
    color: var(--sl-color-neutral-100);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-1000);
    color: var(--sl-color-neutral-200);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-button-border-color-warning);
    color: #282828;
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-400);
    border-color: var(--sl-color-warning-400);
    color: #282828;
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-button-border-color-warning);
    color: #282828;
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-button-border-color-danger);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-400);
    border-color: var(--sl-color-danger-400);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-button-border-color-danger);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral Soft */
  .button--standard.button--neutral-soft {
    background-color: var(--sl-color-bg0);
    color: var(--sl-color-neutral-950);
    border: var(--sl-border-base);
  }

  .button--standard.button--neutral-soft:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-100);
  }

  .button--standard.button--neutral-soft:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-200);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    color: var(--sl-color-color-950);
    border: var(--sl-border-default);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-bg2);
    color: var(--sl-color-neutral-1000);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-1000);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-primary-500);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    color: #ffffff;
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: #ffffff;
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-success-500);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    color: #282828;
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-600);
    background-color: var(--sl-color-success-600);
    color: #282828;
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-950);
    color: var(--sl-color-neutral-1000);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-950);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-600);
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-warning-500);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    color: #282828;
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-600);
    background-color: var(--sl-color-warning-600);
    color: #282828;
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-danger-500);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-600);
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral-soft */
  .button--outline.button--neutral-soft {
    border: var(--sl-border-base);
    color: var(--sl-color-neutral-950);
  }

  .button--outline.button--neutral-soft:hover:not(.button--disabled),
  .button--outline.button--neutral-soft.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-100);
  }

  .button--outline.button--neutral-soft:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-200);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-400);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  /*
   * Link buttons
   */

  .button.button--link {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
    text-decoration: underline;
  }

  .button.button--link:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-400);
  }

  .button.button--link:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button.button--link:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Square modifier
   */

  .button--square {
    border-radius: var(--sl-border-radius-large);
  }

  .button--square.button--has-label {
    min-width: unset;
    min-height: unset;
  }

  .button--square.button--has-label.button--small {
    width: 30px;
    height: 30px;
  }

  .button--square.button--has-label.button--medium {
    width: 40px;
    height: 40px;
  }

  .button--square.button--has-label.button--large {
    width: 50px;
    height: 50px;
  }

  /*
   * Block modifier
   */

  .button--square.button--block.button--has-label.button--small,
  .button--square.button--block.button--has-label.button--medium,
  .button--square.button--block.button--has-label.button--large {
    width: 100%;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      .sl-button-group__button:not(
          .sl-button-group__button--first,
          .sl-button-group__button--radio,
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`;
