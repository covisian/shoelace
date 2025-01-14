import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    width: 100%;
    position: relative;
  }

  sl-dropdown {
    display: block;
    width: 100%;
  }

  sl-dropdown::part(panel) {
    display: block;
    width: 100%;
  }

  sl-menu {
    overflow-x: hidden;
  }
`;
