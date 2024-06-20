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
    font-weight: var(--sl-font-weight-bold);
    height: 24px;

    /* this is to align line-height with smart*/
    line-height: 1.2;
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-x-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-x-small);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-x-small);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-color-danger-500);
    font-size: var(--sl-input-font-size-medium);
    position: relative;
    top: 3px;
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    height: 16px;
    line-height: var(--sl-line-height-normal);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-2x-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-2x-small);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(---sl-input-help-text-font-size-2x-small);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }

  /* Error text */
  .form-control--has-error-text .form-control__error-text {
    display: block;
    color: var(--sl-input-error-text-color);
    height: 16px;
    line-height: var(--sl-line-height-normal);
  }

  .form-control--has-error-text.form-control--small .form-control__error-text {
    font-size: var(--sl-input-error-text-font-size-2x-small);
  }

  .form-control--has-error-text.form-control--medium .form-control__error-text {
    font-size: var(--sl-input-error-text-font-size-2x-small);
  }

  .form-control--has-error-text.form-control--large .form-control__error-text {
    font-size: var(--sl-input-error-text-font-size-2x-small);
  }

  .form-control--has-error-text.form-control--radio-group .form-control__error-text {
    margin-top: var(--sl-spacing-2x-small);
  }

  /* Bottom spacing */

  .form-control--has-bottom-spacing.form-control--small {
    min-height: var(--sl-form-min-heigth-small);
  }

  .form-control--has-bottom-spacing.form-control--medium {
    min-height: var(--sl-form-min-heigth-medium);
  }

  .form-control--has-bottom-spacing.form-control--large {
    min-height: var(--sl-form-min-heigth-large);
  }
`;
