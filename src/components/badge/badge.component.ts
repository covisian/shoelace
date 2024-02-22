import { classMap } from 'lit/directives/class-map.js';
import { HasSlotController } from '../../internal/slot.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './badge.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Badges are used to draw attention and display statuses or counts.
 * @documentation https://shoelace.style/components/badge
 * @status stable
 * @since 2.0
 *
 * @slot - The badge's content.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @csspart base - The component's base wrapper.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 */
export default class SlBadge extends ShoelaceElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  private readonly hasSlotController = new HasSlotController(this, '[default]', 'prefix', 'suffix');

  /** The badge's theme variant. */
  @property({ reflect: true }) variant:
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'soft'
    | 'neutral-soft'
    | 'default'
    | 'neutral' = 'primary';

  /** Draws a pill-style badge with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** Makes the badge pulsate to draw attention. */
  @property({ type: Boolean, reflect: true }) pulse = false;

  /** Makes the badge color softer */
  @property({ type: Boolean, reflect: true }) soft = false;

  render() {
    return html`
      <span
        part="base"
        class=${classMap({
          badge: true,
          'badge--primary': this.variant === 'primary',
          'badge--success': this.variant === 'success',
          'badge--warning': this.variant === 'warning',
          'badge--danger': this.variant === 'danger',
          'badge--neutral-soft': this.variant === 'neutral-soft',
          'badge--default': this.variant === 'default',
          'badge--neutral': this.variant === 'neutral',
          'badge--pill': this.pill,
          'badge--pulse': this.pulse,
          'badge--soft': this.soft,
          'badge--has-label': this.hasSlotController.test('[default]'),
          'badge--has-prefix': this.hasSlotController.test('prefix'),
          'badge--has-suffix': this.hasSlotController.test('suffix')
        })}
        role="status"
      >
        <slot name="prefix" part="prefix" class="badge__prefix"></slot>
        <slot part="label" class="badge__label"></slot>
        <slot name="suffix" part="suffix" class="badge__suffix"></slot>
      </span>
    `;
  }
}
