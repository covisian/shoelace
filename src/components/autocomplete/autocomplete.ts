import SlAutocomplete from './autocomplete.component.js';

export * from './autocomplete.component.js';
export default SlAutocomplete;

SlAutocomplete.define('sl-autocomplete');

declare global {
  interface HTMLElementTagNameMap {
    'sl-autocomplete': SlAutocomplete;
  }
}
