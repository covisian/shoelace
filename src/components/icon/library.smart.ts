import { getBasePath } from '../../utilities/base-path.js';
import type { IconLibrary } from './library.js';

const smartLibrary: IconLibrary = {
  name: 'smart',
  resolver: name => {
    if (name.includes('cv-')) {
      return `https://smart-cdn.app.covisian.com/web/v1/svg/${name}.svg`;
    } else {
      return getBasePath(`assets/icons/${name}.svg`);
    }
  }
};

export default smartLibrary;
