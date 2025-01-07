import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
    width: 100%;
  }

  sl-dropdown {
    display: block;
    width: 100%;
  }

  sl-dropdown::part(panel) {
    display: block;
    width: 100%;
  }

  sl-dropdown::part(custom-popup) {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    padding: 16px;
  }
`;
