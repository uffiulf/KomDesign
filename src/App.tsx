
import { useState, useEffect, useRef } from 'react';
import type { SyntheticEvent } from 'react';
import './App.css';
import planetVideo from './assets/planet.mp4';
import reactLogo from './assets/react-logo.png';
import webstormLogo from './assets/WebStorm_Icon.svg';
import geminiLogo from './assets/Google_Gemini_logo.svg';

function App() {
  // --- State for scroll animations ---
  const [h1Visible, setH1Visible] = useState(true);
  const [videoVisible, setVideoVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  // --- Refs and State for video crossfade ---
  const videoRef1 = useRef<HTMLVideoElement | null>(null);
  const videoRef2 = useRef<HTMLVideoElement | null>(null);
  const [activeVideo, setActiveVideo] = useState(1);
  const FADE_DURATION = 1.5; // Must match CSS transition duration

  // --- Scroll handling effect ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVideoVisible(scrollY > 50);
      setH1Visible(scrollY < 250);
      setContentVisible(scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Video crossfade handler ---
  const handleTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;

    // Guard against null refs
    if (!v1 || !v2) return;

    if (video.duration - video.currentTime < FADE_DURATION) {
      if (video === v1 && activeVideo === 1) {
        setActiveVideo(2);
        v2.currentTime = 0;
        v2.play().catch(err => console.error("Video 2 play failed:", err));
      } else if (video === v2 && activeVideo === 2) {
        setActiveVideo(1);
        v1.currentTime = 0;
        v1.play().catch(err => console.error("Video 1 play failed:", err));
      }
    }
  };

  return (
    <>
      <div className="scroll-container">
        <header className={`main-header ${h1Visible ? 'fade-in' : 'fade-out'}`}>
          <h1>The Game of Modes</h1>
        </header>

        <div className={`background-video-container ${videoVisible ? 'fade-in' : 'fade-out'}`}>
          <video
            ref={videoRef1}
            src={planetVideo}
            autoPlay
            loop
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className={`background-video ${activeVideo === 1 ? 'video-active' : 'video-inactive'}`}
          />
          <video
            ref={videoRef2}
            src={planetVideo}
            autoPlay
            loop
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className={`background-video ${activeVideo === 2 ? 'video-active' : 'video-inactive'}`}
          />
        </div>

        <div style={{ height: '200vh' }}></div>

        <main className={`content-main ${contentVisible ? 'fade-in' : 'fade-out'}`}>
          <article>
            <h2>Text</h2>
            <h3>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</h3>
            <p>
                I denne oppgaven har jeg lastet ned react + vite.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non accumsan lacus. Maecenas a elementum neque. Integer iaculis congue erat in bibendum. Integer ac mi euismod, convallis est id, convallis ante. Suspendisse laoreet tortor convallis tortor pellentesque, lacinia molestie ligula rhoncus. Vestibulum luctus tincidunt turpis nec convallis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sagittis sit amet magna vel posuere. Praesent ac porta tortor. Sed libero dui, iaculis et tellus tempor, hendrerit blandit diam. Fusce iaculis quam justo, eu efficitur mi mollis quis. Donec suscipit felis ante, elementum vulputate nulla malesuada ut. Nulla varius porta turpis eu semper. Nam in nunc vel nulla luctus ultricies. Ut at fringilla nunc. Ut sed congue nisi.
            </p>
            <div className="tech-logos">
              <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                <img src={reactLogo} className="logo-pulsing" alt="React logo" />
              </a>
              <span>+</span>
              <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
                <img src="/vite.svg" className="logo-pulsing" alt="Vite logo" />
              </a>
              <span>+</span>
              <a href="https://www.jetbrains.com/webstorm/" target="_blank" rel="noopener noreferrer">
                <img src={webstormLogo} className="logo-pulsing" alt="WebStorm logo" />
              </a>
              <span>+</span>
              <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer">
                <img src={geminiLogo} className="logo-pulsing" alt="Gemini logo" />
              </a>
            </div>
          </article>
        </main>
        
        <div style={{ height: '50vh' }}></div>
      </div>
    </>
  );
}

export default App;
