import React, {Component, useCallback, useRef, useState} from 'react';
import classNames from 'classnames';

import styles from './App.module.css';

function TestButton({background, children}) {
  let [outlined, setOutlined] = useState(false);
  let waiting = useRef(false);
  let onDown = useCallback(function(e) {
    // TODO: This prevents touch scrolling but I don't want it to. (It also
    // prevents double-tap to zoom, which _is_ desirable.)
    e.preventDefault();
    if (waiting.current) {
      return;
    }
    waiting.current = true;
    setTimeout(() => {
      waiting.current = false;
      setOutlined(o => !o);
    }, 0);
  }, []);

  return (
    <div
      className={classNames(styles.testButton, {
        [styles.testButtonOutlined]: outlined,
      })}
    >
      <div
        className={styles.testButtonInner}
        onMouseDown={onDown}
        onTouchStart={onDown}
        style={{backgroundColor: background}}
      >
        {children}
      </div>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles.intro}>
          <div className={styles.container}>
            <h1>
              How fast are your eyes? <span aria-hidden>👀</span>
            </h1>
            <p>
              Research claims that humans perceive discrete interactions under
              100ms as “instant”. For example, clicking a button feels instant
              if it reacts in that time.
            </p>
            <p>
              Want to see what that feels like? To test yourself, tap the
              buttons below.
            </p>
          </div>
        </header>
        <div className={styles.container}>
          <p>
            In this test, one button has a{' '}
            <strong aria-label="500 millisecond">500ms</strong> delay. Try them
            both, then choose which one is faster.
          </p>
          <div className={styles.testButtons}>
            <TestButton background="#ba68c8">1</TestButton>
            <TestButton background="#64b5f6">2</TestButton>
          </div>
          <p>
            You say <strong>button 1</strong> feels faster.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
