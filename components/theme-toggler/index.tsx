import React, { ReactElement } from 'react';
import './index.scss';

const ThemeToggler = (): ReactElement<HTMLDivElement> => {
  return (
    <div style={{ transform: `scale(1)` }}>
      <label className="daynight">
        <input type="checkbox" className="daynight__checkbox" />
        <span className="daynight__sky">
          <span className="daynight__stars"></span>
          <span className="daynight__morestars"></span>
          <span className="daynight__sunmoon"></span>
        </span>
      </label>
    </div>
  );
};

export default ThemeToggler;
