/* eslint-disable lit-a11y/no-aria-slot */
import { HasSlotController } from '../../internal/slot.js';
import { html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import componentStyles from '../../styles/component.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import SlDropdown from '../dropdown/dropdown.component.js';
import SlMenu from '../menu/menu.component.js';
import styles from './autocomplete.styles.js';
import type { CSSResultGroup } from 'lit';
import type SlInput from '../input/input.js';
import type SlMenuItem from '../menu-item/menu-item.js';

const escapeRegExp = (text: string) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

/**
 * @summary Autocompletes displays suggestions as you type.
 * @documentation https://shoelace.style/components/autocomplete
 * @status stable
 * @since 2.19.1
 * @dependency sl-dropdown
 * @dependency sl-menu
 *
 * @slot - The content that includes an input.
 * @slot empty-text - The text or content that is displayed when there is no suggestion based on the input.
 * @slot loading-text - The text or content that is displayed when the `loading` attribute evaluates to true.
 *
 * @csspart base - The component's internal wrapper.
 * @csspart trigger - The wrapper for the trigger slot.
 * @csspart empty-text - The empty text's wrapper.
 * @csspart loading-text - The loading text's wrapper.
 *
 */

export default class SlAutocomplete extends ShoelaceElement {
  static styles: CSSResultGroup = [componentStyles, styles];
  static dependencies = {
    'sl-dropdown': SlDropdown,
    'sl-menu': SlMenu
  };

  @query('sl-menu') menu: SlMenu;
  @query('sl-dropdown') dropdown: SlDropdown;
  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  private readonly hasSlotController = new HasSlotController(this, 'loading-text', 'empty-text');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  @state() private value = '';

  @state() private hasFocus = false;

  @property({ type: String, reflect: true }) emptyText: string;

  @property({ type: Boolean, reflect: true }) loading = false;

  @property({ type: String, reflect: true }) loadingText: string;

  @property({ type: Boolean, reflect: true }) autofilter = true;

  @property({ type: Boolean, reflect: true }) highlight = false;

  @property({ type: Number, reflect: true }) bottomSkidding = 10;

  @property({ type: Number, reflect: true }) scrollbarSkidding = 0;

  @property({ type: Number, reflect: true }) threshold = 1;

  constructor() {
    super();
    this.updateAvailableHeight = this.updateAvailableHeight.bind(this);
  }

  handleSlInput(event: CustomEvent) {
    const { value } = event.target as SlInput;

    if (this.autofilter) {
      this.options.forEach(option => {
        const shouldDisplay = new RegExp(`(${escapeRegExp(value ?? '')})`, 'ig').test(option.getTextLabel());

        if (shouldDisplay) {
          option.style.display = 'block';
          option.disabled = false;
          option.ariaHidden = 'false';
        } else {
          option.style.display = 'none';
          option.disabled = true;
          option.ariaHidden = 'true';
        }
      });
    }

    this.hasFocus = true;
    this.value = value;
    this.updateAvailableHeight();
  }

  handleKeydown(event: KeyboardEvent) {
    if (!this.shouldDisplayAutoComplete || event.ctrlKey || event.metaKey) {
      return;
    }

    const options = this.visibleOptions;

    if (options.length === 0) {
      return;
    }

    const firstItem = options[0];
    const lastItem = options[options.length - 1];

    switch (event.key) {
      case 'Tab':
      case 'Escape':
        this.hasFocus = false;
        break;

      case 'ArrowDown':
        event.preventDefault();
        this.menu.setCurrentItem(firstItem);
        firstItem.focus();
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.menu.setCurrentItem(lastItem);
        lastItem.focus();
        break;
    }
  }

  handleSlFocus() {
    // if (this.value.length >= this.threshold) {
    // this.hasFocus = true;
    // this.show();
    // }
    this.hasFocus = true;
    this.show();
  }

  handleSlAfterHide() {
    this.hasFocus = false;
  }

  show() {
    this.dropdown?.show();
    this.updateAvailableHeight();
  }

  hide() {
    this.dropdown?.hide();
  }

  reset() {
    this.value = '';
  }

  get options(): SlMenuItem[] {
    return (this.defaultSlot?.assignedElements() || []) as SlMenuItem[];
  }

  get visibleOptions() {
    return this.options.filter(option => option.style.display !== 'none');
  }

  get hasResults() {
    return this.visibleOptions.length > 0;
  }

  get shouldDisplayLoadingText() {
    return this.loading && (this.loadingText || this.hasSlotController.test('loading-text'));
  }

  get shouldDisplayEmptyText() {
    return (
      !this.shouldDisplayLoadingText &&
      !this.hasResults &&
      (this.emptyText || this.hasSlotController.test('empty-text'))
    );
  }

  // get shouldDisplayAutoComplete() {
  //   return (
  //     this.hasFocus &&
  //     ((this.value.length >= this.threshold && this.hasResults) ||
  //       this.shouldDisplayLoadingText ||
  //       this.shouldDisplayEmptyText)
  //   );
  // }

  get shouldDisplayAutoComplete() {
    return this.hasFocus && (this.hasResults || this.shouldDisplayLoadingText || this.shouldDisplayEmptyText);
  }

  updateAvailableHeight() {
    const rect = this.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - rect.bottom - this.bottomSkidding; // Altezza disponibile sotto l'elemento

    // Imposta la variabile CSS solo se l'altezza disponibile è positiva
    if (availableHeight > 0) {
      this.style.setProperty('--auto-size-available-height', `${availableHeight}px`);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.updateAvailableHeight);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.updateAvailableHeight);
  }

  render() {
    const { shouldDisplayLoadingText } = this;

    return html`
      <div part="base" treshold=${this.threshold}>
        <div
          part="trigger"
          @sl-focus=${this.handleSlFocus}
          @sl-input=${this.handleSlInput}
          @keydown=${this.handleKeydown}
        >
          <slot name="trigger"></slot>
        </div>

        <sl-dropdown
          ?open=${this.shouldDisplayAutoComplete}
          @sl-after-hide=${this.handleSlAfterHide}
          auto-size="both"
          exportparts="base__popup:custom-popup"
          placement
        >
          <sl-menu>
            <slot
              aria-hidden=${shouldDisplayLoadingText ? 'true' : 'false'}
              style="${styleMap({ display: shouldDisplayLoadingText ? 'none' : 'block' })}"
            >
            </slot>

            <div
              part="loading-text"
              id="loading-text"
              class="loading-text"
              aria-hidden=${shouldDisplayLoadingText ? 'false' : 'true'}
              style="${styleMap({ display: shouldDisplayLoadingText ? 'block' : 'none' })}"
            >
              <slot name="loading-text">${this.loadingText}</slot>
            </div>

            <div
              part="empty-text"
              id="empty-text"
              class="empty-text"
              aria-hidden=${this.shouldDisplayEmptyText ? 'false' : 'true'}
              style="${styleMap({ display: this.shouldDisplayEmptyText ? 'block' : 'none' })}"
            >
              <slot name="empty-text">${this.emptyText}</slot>
            </div>

            <div
              aria-hidden="true"
              style=${styleMap({ width: `calc(${this.clientWidth}px - ${this.scrollbarSkidding}px)` })}
            ></div>
          </sl-menu>
        </sl-dropdown>
      </div>
    `;
  }
}
