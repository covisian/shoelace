import { css } from 'lit';

export default css`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  .form-control .form-control__error-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }

  /* Error text */
  .form-control--has-error-text .form-control__error-text {
    display: block;
    color: var(--sl-color-danger-500);
    margin-top: var(--sl-spacing-2x-small);
  }

  .form-control--has-error-text.form-control--small .form-control__error-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-error-text.form-control--medium .form-control__error-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-error-text.form-control--large .form-control__error-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-error-text.form-control--radio-group .form-control__error-text {
    margin-top: var(--sl-spacing-2x-small);
  }

  /* Bottom spacing */

  .form-control--has-bottom-spacing.form-control--small {
    min-height: 84.781px;
  }

  .form-control--has-bottom-spacing.form-control--medium {
    min-height: 99.984px;
  }

  .form-control--has-bottom-spacing.form-control--large {
    min-height: 120.797px;
  }
`;
