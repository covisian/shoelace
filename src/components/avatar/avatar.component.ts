import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
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
  static styles: CSSResultGroup = [componentStyles, styles];
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

  /** size of the avatar */
  @property() size: 'micro' | 'x-small' | 'small' | 'medium' | 'large' = 'small';

  /** Indicates how the browser should load the image. */
  @property() loading: 'eager' | 'lazy' = 'eager';

  /** The shape of the avatar. */
  @property({ reflect: true }) shape: 'circle' | 'square' | 'rounded' = 'circle';

  colors = [
    { color: '#282828', backgroundColor: '#1abc9c' },
    { color: '#282828', backgroundColor: '#2ecc71' },
    { color: '#282828', backgroundColor: '#3498db' },
    { color: '#fff', backgroundColor: '#9b59b6 ' },
    { color: '#fff', backgroundColor: '#34495e' },
    { color: '#fff', backgroundColor: '#16a085 ' },
    { color: '#282828', backgroundColor: '#27ae60' },
    { color: '#fff', backgroundColor: '#2980b9' },
    { color: '#fff', backgroundColor: '#8e44ad' },
    { color: '#fff', backgroundColor: '#2c3e50' },
    { color: '#282828', backgroundColor: '#f1c40f' },
    { color: '#282828', backgroundColor: '#e67e22' },
    { color: '#fff', backgroundColor: '#e74c3c' },
    { color: '#282828', backgroundColor: '#95a5a6' },
    { color: '#282828', backgroundColor: '#f39c12' },
    { color: '#fff', backgroundColor: '#d35400' },
    { color: '#fff', backgroundColor: '#c0392b' },
    { color: '#282828', backgroundColor: '#bdc3c7' },
    { color: '#fff', backgroundColor: '#7f8c8d' }
  ];

  @watch('image')
  handleImageChange() {
    // Reset the error when a new image is provided
    this.hasError = false;
  }

  getInitials(fullName: string) {
    const chunks = fullName.split(' ');
    const hasFirstLetter = chunks[0];
    const hasSecondLetter = chunks[1];
    const firstLetter = hasFirstLetter && chunks[0].charAt(0).toUpperCase();
    const secondLetter = hasSecondLetter
      ? chunks[chunks.length - 1].charAt(0).toUpperCase()
      : chunks[0].charAt(1).toUpperCase();
    this.initials = firstLetter + secondLetter;
    return this.initials;
  }
  getStyleForInitials() {
    const charIndex = this.initials.charCodeAt(0) - 65;
    const colorIndex = charIndex % this.colors.length;
    return this.colors[colorIndex];
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
    let randomBackgroundColor = 'var(--sl-color-neutral-100)';
    let randomColor = 'color: var(--sl-color-neutral-0)';
    let avatarWithoutImage = html``;

    let initialsToShow = this.initials.length >= 2 ? this.initials[0] + this.initials[1] : this.initials[0];

    if (this.name && !this.initials) {
      initialsToShow = this.getInitials(this.name);
    }
    if (initialsToShow) {
      randomBackgroundColor = this.getStyleForInitials().backgroundColor;
      randomColor = this.getStyleForInitials().color;
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
        style="background-color: ${randomBackgroundColor}; color:${randomColor}"
        part="base"
        class=${classMap({
          avatar: true,
          [`avatar--${this.shape}`]: true,
          [`avatar--${this.size}`]: true
        })}
        role="img"
        aria-label=${this.label}
      >
        ${this.image && !this.hasError ? avatarWithImage : avatarWithoutImage}
      </div>
    `;
  }
}
