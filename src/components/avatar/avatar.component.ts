import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { watch } from '../../internal/watch.js';
import ShoelaceElement from '../../internal/shoelace-element.js';
import SlIcon from '../icon/icon.component.js';
import styles from './avatar.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Avatars are used to represent a person or object.
 * @documentation https://shoelace.style/components/avatar
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 *
 * @slot icon - The default icon to use when no image or initials are present. Works best with `<sl-icon>`.
 *
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the avatar's icon.
 * @csspart initials - The container that wraps the avatar's initials.
 * @csspart image - The avatar image. Only shown when the `image` attribute is set.
 *
 * @cssproperty --size - The size of the avatar.
 */
export default class SlAvatar extends ShoelaceElement {
  static styles: CSSResultGroup = styles;
  static dependencies = {
    'sl-icon': SlIcon
  };

  @state() private hasError = false;

  /** The image source to use for the avatar. */
  @property() image = '';

  /** A label to use to describe the avatar to assistive devices. */
  @property() label = '';

  /** Name and surname from which the initials will be taken. */
  @property() name = '';

  /** Initials to use as a fallback when no image is available (1-2 characters max recommended). */
  @property() initials = '';

  /** Indicates how the browser should load the image. */
  @property() loading: 'eager' | 'lazy' = 'eager';

  /** The shape of the avatar. */
  @property({ reflect: true }) shape: 'circle' | 'square' | 'rounded' = 'circle';

  @watch('image')
  handleImageChange() {
    // Reset the error when a new image is provided
    this.hasError = false;
  }

  getInitials(fullName: string) {
    const names = fullName.split(' ');
    const initials = names.map(elem => elem.charAt(0));
    return initials.join('').toUpperCase();
  }

  getRandomColor() {
    const colors = [
      '#1abc9c',
      '#2ecc71',
      '#3498db',
      '#9b59b6',
      '#4551b6',
      '#16a085',
      '#98a085',
      '#27ae60',
      '#2980b9',
      '#8e44ad',
      '#f1c40f',
      '#e67e22',
      '#e74c3c',
      '#95a5a6',
      '#f39c12',
      '#d35400',
      '#c0392b',
      '#bdc3c7',
      '#7f8c8d'
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  render() {
    const avatarWithImage = html`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${() => (this.hasError = true)}"
      />
    `;
    let randomBackgroundColor = 'var(--sl-color-neutral-400)';
    let avatarWithoutImage = html``;

    let initialsToShow = this.initials;

    if (this.name && !this.initials) {
      initialsToShow = this.getInitials(this.name);
    }
    if (initialsToShow) {
      randomBackgroundColor = this.getRandomColor();
      avatarWithoutImage = html` <div part="initials" class="avatar__initials">${initialsToShow}</div> `;
    } else {
      avatarWithoutImage = html`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <sl-icon name="person-fill" library="system"></sl-icon>
          </slot>
        </div>
      `;
    }

    return html`
      <div
        style="background-color: ${randomBackgroundColor}"
        part="base"
        class=${classMap({
          avatar: true,
          'avatar--circle': this.shape === 'circle',
          'avatar--rounded': this.shape === 'rounded',
          'avatar--square': this.shape === 'square'
        })}
        role="img"
        aria-label=${this.label}
      >
        ${this.image && !this.hasError ? avatarWithImage : avatarWithoutImage}
      </div>
    `;
  }
}
