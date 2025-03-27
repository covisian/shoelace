import { css } from 'lit';

export default css`
  :host {
      display: block;
      width: 100%;
      max-width: 300px;
    }
    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 5px;
    }
    sl-dropdown {
      width: 100%;
    }
`;
