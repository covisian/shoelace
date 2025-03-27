import { html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import componentStyles from '../../styles/component.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import SlDropdown from '../dropdown/dropdown.component.js';
import SlIcon from '../icon/icon.js';
import SlInput from '../input/input.js';
import SlMenu from '../menu/menu.component.js';
import SlMenuItem from '../menu-item/menu-item.js';
import styles from './autocomplete.styles.js';
import type { CSSResultGroup } from 'lit';

const escapeRegExp = (text: string) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

export interface AutocompleteOption {
  value: string;
  label?: string;
  selected?: boolean;
  [key: string]: unknown;
}

export default class SlAutocomplete extends ShoelaceElement {
  static styles: CSSResultGroup = [componentStyles, styles];
  static dependencies = {
    'sl-dropdown': SlDropdown,
    'sl-menu': SlMenu,
    'sl-menu-item': SlMenuItem,
    'sl-input': SlInput,
    'sl-icon': SlIcon
  };

  @query('sl-menu') menu: SlMenu;
  @query('sl-menu') menuItem: SlMenuItem;
  @query('sl-dropdown') dropdown: SlDropdown;
  @query('sl-input') input: SlInput;

  @state() private hasFocus = false;

  @property({ type: String, reflect: true }) emptyText: string = ' We could not find any matches. Please try again.';
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: String, reflect: true }) loadingText: string;
  @property({ type: Boolean, reflect: true }) autofilter = true;
  @property({ type: Boolean, reflect: true }) multiSelect = false;
  @property({ type: Number }) maxDisplayedOptions = 2;

  // Proxy input properties
  @property({ type: String }) value = '';
  @property({ type: String }) type = 'text';
  @property({ type: String }) label = '';
  @property({ type: String }) help = '';
  @property({ type: String }) size = 'medium';
  @property({ type: String }) placeholder = '';
  @property({ type: Boolean }) clearable = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;

  @property({ type: Boolean }) checked = false;

  // New options property
  @property({ type: Array }) options: AutocompleteOption[] = [];

  // constructor() {
  //   super();
  // }

  show() {
    this.hasFocus = true;
    this.dropdown?.show();
  }

  hide() {
    this.dropdown?.hide();
  }

  handleInput(event: CustomEvent) {
    const { value } = event.target as SlInput;
    this.filterOptions(value);
    this.hasFocus = true;
    this.value = value;
  }

  filterOptions(filterValue: string) {
    if (!this.autofilter) return;

    const menuItems = this.renderRoot?.querySelectorAll('sl-menu-item');
    menuItems?.forEach((item: SlMenuItem) => {
      const option: AutocompleteOption = item.dataset.option
        ? (JSON.parse(item.dataset.option) as AutocompleteOption)
        : { value: item.textContent || '' };

      const shouldDisplay = new RegExp(`(${escapeRegExp(filterValue ?? '')})`, 'ig').test(
        option.value! || option.label!
      );

      if (shouldDisplay) {
        item.style.display = 'block';
        item.disabled = false;
        item.ariaHidden = 'false';
      } else {
        item.style.display = 'none';
        item.disabled = true;
        item.ariaHidden = 'true';
      }
    });
  }

  handleSelect(event: CustomEvent) {
    const selectedItem = event.detail.item as SlMenuItem;
    const optionData = JSON.parse(selectedItem.dataset.option || '{}');

    if (this.multiSelect) {
      // Toggle selection for multi-select
      const existingOptionIndex = this.options.findIndex(opt => opt.value === optionData.value);

      if (existingOptionIndex !== -1) {
        this.options[existingOptionIndex].selected = !this.options[existingOptionIndex].selected;
      }

      // Update value to show selected options with a limit
      const selectedOptions = this.options.filter(opt => opt.selected);
      const displayOptions = selectedOptions.slice(0, this.maxDisplayedOptions);
      const extraOptionsCount = Math.max(0, selectedOptions.length - this.maxDisplayedOptions);

      this.value =
        displayOptions.map(opt => opt.label || opt.value).join(', ') +
        (extraOptionsCount > 0 ? ` +${extraOptionsCount} more` : '');
    } else {
      // Single select behavior
      this.value = optionData.value || optionData.label;
      this.hide();
    }

    // Emit custom event with selection details
    this.dispatchEvent(
      new CustomEvent('sl-select', {
        detail: {
          value: this.value,
          options: this.multiSelect ? this.options.filter(opt => opt.selected) : [optionData],
          item: selectedItem
        },
        bubbles: true,
        composed: true
      })
    );

    // Trigger re-render to update selected state
    this.requestUpdate();
  }

  handleClear() {
    // Deselect all options when input is cleared
    if (this.multiSelect) {
      this.options = this.options.map(option => ({
        ...option,
        selected: false
      }));
    }

    this.value = '';
    this.requestUpdate();
    this.show();
  }

  createOptionTemplate(option: AutocompleteOption) {
    return html`
      <sl-menu-item data-option=${JSON.stringify(option)} type="checkbox" .checked=${option.selected}>
        ${option.label || option.value}
      </sl-menu-item>
    `;
  }

  render() {
    return html`
      <div part="base">
        <sl-input
          .value=${this.value}
          .type=${this.type}
          .label=${this.label}
          .help=${this.help}
          .size=${this.size}
          .placeholder=${this.placeholder}
          ?clearable=${this.clearable}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @sl-input=${this.handleInput}
          @sl-focus=${() => this.show()}
          @sl-clear=${this.handleClear}
        ></sl-input>

        <sl-dropdown
          ?open=${this.hasFocus && this.options.length > 0}
          @sl-after-hide=${() => (this.hasFocus = false)}
          auto-size="both"
        >
          <sl-menu @sl-select=${this.handleSelect}>
            ${this.options.length > 0
              ? repeat(
                  this.options,
                  option => option.value,
                  option => this.createOptionTemplate(option)
                )
              : html` <sl-menu-item part="empty-text">${this.emptyText}</sl-menu-item> `}
          </sl-menu>
        </sl-dropdown>
      </div>
    `;
  }
}
