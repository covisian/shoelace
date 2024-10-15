import { css } from 'lit';

export default css`
  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border-radius: 4px;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-style: italic;
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
    padding: 4px;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: 8px;
    padding-inline-end: 10px;
  }

  /* Primary */

  .alert--primary {
    background-color: var(--sl-color-primary-600);
    color: #fff;
  }

  .alert--primary.alert--outline {
    border: 1px solid var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-50);
    color: #282828;
  }

  .alert--primary .alert__icon {
    color: #fff;
  }

  .alert--primary.alert--outline .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__close-button {
    color: #fff;
    &::part(base):hover {
      color: #fff;
    }
  }

  .alert--primary.alert--outline .alert__close-button {
    color: var(--sl-color-primary-600);
    &::part(base):hover {
      color: var(--sl-color-primary-600);
    }
  }

  /* Success */

  .alert--success {
    background-color: var(--sl-color-success-600);
    color: #fff;
  }

  .alert--success.alert--outline {
    border: 1px solid var(--sl-color-success-600);
    background-color: var(--sl-color-success-50);
    color: #282828;
  }

  .alert--success .alert__icon {
    color: #fff;
  }

  .alert--success.alert--outline .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--success .alert__close-button {
    color: #fff;
    &::part(base):hover {
      color: #fff;
    }
  }

  .alert--success.alert--outline .alert__close-button {
    color: var(--sl-color-success-600);
    &::part(base):hover {
      color: var(--sl-color-success-600);
    }
  }

  /* Neutral */

  .alert--neutral {
    background-color: var(--sl-color-fg0);
    color: var(--sl-color-bg1);
  }

  .alert--neutral.alert--outline {
    border: 1px solid var(--sl-color-neutral-600);
    background-color: var(--sl-color-neutral-50);
    color: var(--sl-color-fg0);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-bg1);
  }

  .alert--neutral.alert--outline .alert__icon {
    color: var(--sl-color-fg0) !important;
  }

  .alert--neutral .alert__close-button {
    color: var(--sl-color-bg1);
    &::part(base):hover {
      color: var(--sl-color-bg1);
    }
  }

  .alert--neutral.alert--outline .alert__close-button {
    color: var(--sl-color-fg0) !important;
    &::part(base):hover {
      color: var(--sl-color-fg0) !important;
    }
  }

  /* Warning */

  .alert--warning {
    background-color: var(--sl-color-warning-400);
    color: #282828;
  }

  .alert--warning.alert--outline {
    border: 1px solid var(--sl-color-warning-600);
    background-color: var(--sl-color-warning-50);
    color: #282828;
  }

  .alert--warning .alert__icon {
    color: #282828;
  }

  .alert--neutral.alert--outline .alert__icon {
    color: #282828;
  }

  .alert--warning .alert__close-button {
    color: #282828;
    &::part(base):hover {
      color: #282828;
    }
  }

  .alert--neutral.alert--outline .alert__close-button {
    color: #282828;
    &::part(base):hover {
      color: #282828;
    }
  }

  /* Danger */

  .alert--danger {
    background-color: var(--sl-color-danger-400);
    color: #fff;
  }

  .alert--danger.alert--outline {
    border: 1px solid var(--sl-color-danger-600);
    background-color: var(--sl-color-danger-50);
    color: #282828;
  }

  .alert--danger .alert__icon {
    color: #fff;
  }

  .alert--danger.alert--outline .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__close-button {
    color: #fff;
    &::part(base):hover {
      color: #fff;
    }
  }

  .alert--danger.alert--outline .alert__close-button {
    color: var(--sl-color-danger-600);
    &::part(base):hover {
      color: var(--sl-color-danger-600);
    }
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: 8px;
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    padding-inline-start: 10px;
  }

  .sl-top-right {
    position: fixed;
    top: 0;
    right: 0;
  }

  .sl-top-center {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .sl-top-left {
    position: fixed;
    top: 0;
    left: 0;
  }

  .sl-bottom-right {
    position: fixed;
    bottom: 0;
    right: 0;
  }

  .sl-bottom-center {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .sl-bottom-left {
    position: fixed;
    bottom: 0;
    left: 0;
  }
`;
