import { css } from 'lit';

export default css`
  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    width: var(--size);
    height: var(--size);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
    text-align: center;
    leading-trim: both;
    text-edge: cap;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .avatar--micro {
    height: 16px;
    width: 16px;
    font-size: 8px;
  }
  .avatar--x-small {
    height: 24px;
    width: 24px;
    font-size: 12px;
  }
  .avatar--small {
    height: 32px;
    width: 32px;
    font-size: 16px;
  }
  .avatar--medium {
    height: 40px;
    width: 40px;
    font-size: 20px;
  }
  .avatar--large {
    height: 64px;
    width: 64px;
    font-size: 30px;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`;
