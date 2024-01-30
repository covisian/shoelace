import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    contain: strict;
    box-sizing: content-box !important;
  }
  :host([size='custom']) {
    font-size: var(--icon-size, 12px);
  }
  :host([size='small']) {
    font-size: var(--sl-font-size-medium);
  }
  :host([size='medium']) {
    font-size: var(--sl-font-size-x-large)
  }
  :host([size='large']) {
    font-size: 32px;
  }
  :host([size='extra']) {
    font-size: 64px;
  }
  :host([color='primary']) {
    color: #3880ff;
  }
  :host([color='secondary']) {
    color: #0cd1e8;
  }
  :host([color='tertiary']) {
    color: #f4a942;
  }
  :host([color='success']) {
    color: #10dc60;
  }
  :host([color='warning']) {
    color: #ffce00;
  }
  :host([color='danger']) {
    color: #f14141;
  }
  :host([color='light']) {
    color: #f4f5f8;
  }
  :host([color='medium']) {
    color: #989aa2;
  }
  :host([color='dark']) {
    color: #222428;
  }
  svg {
    display: block;
    height: 100%;
    width: 100%;
  }

  :host([animation]) {
    animation-name: spin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
