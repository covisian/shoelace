import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    // align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.65em 0.9em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  .badge__label {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .badge__prefix,
  .badge__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .badge__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Badge spacing
   */

  .badge--has-prefix {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .badge--has-prefix .badge__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .badge--has-suffix {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .badge--has-suffix .badge__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: #ffffff;
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: #282828;
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-50);
    color: var(--sl-color-neutral-950);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: #282828;
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral-0 {
    background-color: var(--sl-color-neutral-0);
    color: var(--sl-color-neutral-950);
    border: var(--sl-border-base);
  }

  .badge--neutral-1000 {
    background-color: var(--sl-color-neutral-1000);
    color: var(--sl-color-neutral-50);
  }

  /* Soft modifier */
  .badge--soft.badge--primary {
    background-color: var(--sl-color-primary-50);
    color: var(--sl-color-blue-600);
  }

  .badge--soft.badge--success {
    background-color: var(--sl-color-success-50);
    color: var(--sl-color-success-600);
  }

  .badge--soft.badge--warning {
    background-color: var(--sl-color-warning-50);
    color: var(--sl-color-warning-600);
  }

  .badge--soft.badge--danger {
    background-color: var(--sl-color-danger-50);
    color: var(--sl-color-danger-600);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-50);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  .badge--pulse.badge--neutral-0 {
    --pulse-color: var(--sl-color-neutral-50);
  }

  .badge--pulse.badge--neutral-1000 {
    --pulse-color: var(--sl-color-neutral-1000);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`;
