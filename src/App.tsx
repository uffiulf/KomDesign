
import { useState, useEffect } from 'react';
import './App.css';
import planetVideo from './assets/planet.mp4';

function App() {
  const [h1Visible, setH1Visible] = useState(true);
  const [videoVisible, setVideoVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // These values determine when the animations trigger. You can adjust them.
      setVideoVisible(scrollY > 50); 
      setH1Visible(scrollY < 250);
      setContentVisible(scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component is removed
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // The empty array ensures this effect runs only once

  return (
    <>
      <div className="scroll-container">
        
        <header className={`main-header ${h1Visible ? 'fade-in' : 'fade-out'}`}>
          <h1>The Game of Modes</h1>
        </header>

        <video
          src={planetVideo}
          autoPlay
          loop
          muted
          playsInline
          className={`background-video ${videoVisible ? 'fade-in' : 'fade-out'}`}
        />

        {/* This spacer creates the scrollable area */}
        <div style={{ height: '200vh' }}></div>

        <main className={`content-main ${contentVisible ? 'fade-in' : 'fade-out'}`}>
          <article>
            <h2>Text</h2>
            <h3>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</h3>
            <p>
                I denne oppgaven har jeg lastet ned react + vite.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non accumsan lacus. Maecenas a elementum neque. Integer iaculis congue erat in bibendum. Integer ac mi euismod, convallis est id, convallis ante. Suspendisse laoreet tortor convallis tortor pellentesque, lacinia molestie ligula rhoncus. Vestibulum luctus tincidunt turpis nec convallis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sagittis sit amet magna vel posuere. Praesent ac porta tortor. Sed libero dui, iaculis et tellus tempor, hendrerit blandit diam. Fusce iaculis quam justo, eu efficitur mi mollis quis. Donec suscipit felis ante, elementum vulputate nulla malesuada ut. Nulla varius porta turpis eu semper. Nam in nunc vel nulla luctus ultricies. Ut at fringilla nunc. Ut sed congue nisi.
            </p>
          </article>
        </main>
        
        {/* This spacer ensures there's room to see the full fade-in */}
        <div style={{ height: '50vh' }}></div>

      </div>
    </>
  );
}

export default App;
