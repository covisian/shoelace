import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import SlInput from "../input/input.component.js";
import styles from './autocomplete.styles.js';
import type { CSSResultGroup } from 'lit';
// import SlDropdown from '../dropdown/dropdown.component.js';
// import SlMenu from '../menu/menu.component.js';
// import SlMenuItem from '../menu-item/menu-item.component.js';
// import SlTag from '../tag/tag.component.js';
import ShoelaceElement from '../../internal/shoelace-element.js';


export default class SlAutocomplete extends ShoelaceElement {
  static styles: CSSResultGroup = [componentStyles, styles];
    static dependencies = {
    'sl-input': SlInput,
    };

  /** List of available options */
  @property({ type: Array }) options = ["Apple", "Banana", "Cherry", "Grapes", "Mango"];

  /** Allow multiple selections */
  @property({ type: Boolean }) multiple = true;

  /** Allow free-text input (values not in options) */
  @property({ type: Boolean }) freeSolo = true;

  /** Holds the filtered options as the user types */
  @state() filteredOptions = [...this.options];

  /** Holds selected values */
  @state() selectedOptions: string[] = [];

  /** Current input value */
  @state() inputValue = "";

  /** Controls dropdown visibility */
  @state() openDropdown = false;

  handleInput(event: { target: { value: string; }; }) {
    this.inputValue = event.target.value;
    this.filteredOptions = this.options.filter((option) =>
      option.toLowerCase().includes(this.inputValue.toLowerCase())
    );
    this.openDropdown = this.filteredOptions.length > 0;
  }

  handleSelect(event: CustomEvent) {
    const target = event.target as HTMLElement | null;
    const selectedValue = target?.textContent?.trim() || '';

    if (this.multiple) {
      if (!this.selectedOptions.includes(selectedValue)) {
        this.selectedOptions = [...this.selectedOptions, selectedValue];
      }
    } else {
      this.selectedOptions = [selectedValue];
    }

    this.inputValue = "";
    this.openDropdown = false;
    this.emitChange();
  }

  handleRemoveTag(value: string) {
    this.selectedOptions = this.selectedOptions.filter((item) => item !== value);
    this.emitChange();
  }

  // handleKeydown(event: KeyboardEvent) {
  //   if (event.key === "Enter" && this.freeSolo && this.inputValue.trim() !== "") {
  //     this.handleSelect({ target: this.inputValue.trim() });
  //   }
  // }

  emitChange() {
    this.dispatchEvent(new CustomEvent("sl-change", { detail: this.selectedOptions }));
  }

  render() {
    return html`
      <div class="tags-container">
        ${this.selectedOptions.map(
      (option) => html`
            <sl-tag removable @sl-remove=${() => this.handleRemoveTag(option)}>
              ${option}
            </sl-tag>
          `
    )}
      </div>

      <sl-dropdown class="dropdown" ?open=${this.openDropdown}>
        <sl-input
          slot="trigger"
          placeholder="Search..."
          value=${this.inputValue}
          @input=${this.handleInput}
      
          clearable
        ></sl-input>

        <sl-menu @click=${this.handleSelect}>
          ${this.filteredOptions.map(
      (option) => html` <sl-menu-item>${option}</sl-menu-item> `
    )}
        </sl-menu>
      </sl-dropdown>
    `;
  }
}