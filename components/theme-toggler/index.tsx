import React, { ReactElement } from 'react';
import './index.scss';

interface ThemeTogglerProps {
  size?: number;
}

const ThemeToggler = (props: ThemeTogglerProps): ReactElement<HTMLDivElement> => {
  const { size = 0.4 } = props;
  return (
    <div style={{ transform: `scale(${size})` }}>
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
