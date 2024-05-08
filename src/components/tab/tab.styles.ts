import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
  }
  :host(sl-tab[variant='segment']),
  :host(sl-tab[variant='segment-soft']) {
    display: contents;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    align-self: stretch;
    cursor: pointer;

    transition:
      var(--transition-speed) box-shadow,
      var(--transition-speed) color;
  }

  .tab.tab--wizard {
    background: transparent;
    width: auto;
    .circle {
      display: flex;
      width: 32px;
      height: 32px;
      margin-right: 8px;
      color: var(--sl-color-neutral-950);
      background: var(--sl-color-bg0);
      border-radius: var(--sl-border-radius-circle);
      align-items: center;
      justify-content: center;
      font-size: var(--sl-font-size-small);
    }
    &:hover {
      color: var(--sl-color-neutral-950);
    }
  }

  .tab.tab--wizard:hover:not(.tab--disabled) {
    color: var(--sl-color-neutral-950);
  }

  .tab.tab--wizard.tab--active {
    .circle {
      background: var(--sl-color-neutral-950);
      color: var(--sl-color-bg1);
    }
    .label {
      color: var(--sl-color-neutral-950);
    }
  }

  .tab.tab--segment {
    display: flex;
    background: var(--sl-color-bg0);
    width: auto;
    box-sizing: border-box;
    justify-content: center;
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium);
    height: 30px;
    font-size: var(--sl-font-size-x-small);

    &:hover {
      color: var(--sl-color-neutral-950);
    }
  }

  .tab.tab--segment:hover:not(.tab--disabled),
  .tab.tab--segment-soft:hover:not(.tab--disabled) {
    color: var(--sl-color-neutral-950);
  }

  .tab.tab--segment.tab--active {
    background: var(--sl-color-fg0);
  }

  .tab--segment-soft {
    display: flex;
    background: transparent;
    width: auto;
    justify-content: center;
    box-sizing: border-box;
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium);
    height: 30px;
    font-size: var(--sl-font-size-x-small);

    &:hover {
      color: var(--sl-color-neutral-950);
    }
  }

  .tab.tab--segment-soft:hover:not(.tab--disabled) {
    color: var(--sl-color-neutral-950);
  }

  .tab.tab--segment-soft.tab--active {
    background: var(--sl-color-bg1);
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus {
    outline: none;
  }

  .tab:focus-visible:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
    border-radius: 9999px;
  }

  .tab.tab--segment.tab--active:not(.tab--disabled) {
    color: var(--sl-color-neutral-50);
    border-radius: 4px;
    width: auto;
  }

  .tab.tab--segment-soft.tab--active:not(.tab--disabled) {
    color: var(--sl-color-neutral-950);
    border-radius: 4px;
    width: auto;
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      color: unset;
    }
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`;
