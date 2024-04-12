import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import { property, query } from 'lit/decorators.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import SlIconButton from '../icon-button/icon-button.component.js';
import styles from './tab.styles.js';
import type { CSSResultGroup } from 'lit';

let id = 0;

/**
 * @summary Tabs are used inside [tab groups](/components/tab-group) to represent and activate [tab panels](/components/tab-panel).
 * @documentation https://shoelace.style/components/tab
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon-button
 *
 * @slot - The tab's label.
 * @slot step - The tab step for variant=wizard
 *
 * @event sl-close - Emitted when the tab is closable and the close button is activated.
 *
 * @csspart base - The component's base wrapper.
 * @csspart close-button - The close button, an `<sl-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 */
export default class SlTab extends ShoelaceElement {
  static styles: CSSResultGroup = [componentStyles, styles];
  static dependencies = { 'sl-icon-button': SlIconButton };

  private readonly localize = new LocalizeController(this);

  private readonly attrId = ++id;
  private readonly componentId = `sl-tab-${this.attrId}`;

  @query('.tab') tab: HTMLElement;

  /** The name of the tab panel this tab is associated with. The panel must be located in the same tab group. */
  @property({ reflect: true }) panel = '';

  /** Draws the tab in an active state. */
  @property({ type: Boolean, reflect: true }) active = false;

  /** Makes the tab closable and shows a close button. */
  @property({ type: Boolean }) closable = false;

  /** Disables the tab and prevents selection. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Inherits variant property if set on Sl-Tab-Group */
  @property({ type: String, reflect: true }) variant: 'default' | 'wizard' | 'segment' | 'segment-soft' = 'default';

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tab');
    this.setVariant();
    const tabGroup = this.closest('sl-tab-group');
    if (tabGroup) {
      tabGroup.addEventListener('sl-tab-group-variant-changed', this.handleTabGroupVariantChanged.bind(this));
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    const tabGroup = this.closest('sl-tab-group');
    if (tabGroup) {
      tabGroup.removeEventListener('sl-tab-group-variant-changed', this.handleTabGroupVariantChanged.bind(this));
    }
  }

  private handleTabGroupVariantChanged(
    event: CustomEvent<{ variant: 'default' | 'wizard' | 'segment' | 'segment-soft' }>
  ) {
    this.variant = event.detail.variant;
  }

  private handleCloseClick(event: Event) {
    event.stopPropagation();
    this.emit('sl-close');
  }

  private setVariant() {
    const wizardTabGroup = this.closest('sl-tab-group[variant="wizard"]');
    const segmentTabGroup = this.closest('sl-tab-group[variant="segment"]');
    const segmentSoftTabGroup = this.closest('sl-tab-group[variant="segment-soft"]');
    if (wizardTabGroup) {
      this.variant = 'wizard';
    }
    if (segmentTabGroup) {
      this.variant = 'segment';
    }
    if (segmentSoftTabGroup) {
      this.variant = 'segment-soft';
    }
  }

  @watch('active')
  handleActiveChange() {
    this.setAttribute('aria-selected', this.active ? 'true' : 'false');
  }

  @watch('disabled')
  handleDisabledChange() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  focus(options?: FocusOptions) {
    this.tab.focus(options);
  }

  blur() {
    this.tab.blur();
  }

  render() {
    this.id = this.id.length > 0 ? this.id : this.componentId;

    return html`
      <div
        part="base"
        class=${classMap({
          tab: true,
          'tab--active': this.active,
          'tab--closable': this.closable,
          'tab--disabled': this.disabled,
          'tab--wizard': this.variant === 'wizard',
          'tab--segment': this.variant === 'segment',
          'tab--segment-soft': this.variant === 'segment-soft'
        })}
        tabindex=${this.disabled ? '-1' : '0'}
      >
        ${this.variant !== 'wizard'
          ? html` <slot></slot> `
          : this.variant === 'wizard'
            ? html`
                <span class="circle"><slot name="step"></slot></span>
                <span class="label"><slot></slot></span>
              `
            : ''}
        ${this.closable
          ? html`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term('close')}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sl-tab': SlTab;
  }
}
