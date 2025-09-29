
import { useState, useEffect, useRef } from 'react';
import type { SyntheticEvent } from 'react';
import './App.css';
import planetVideo from './assets/planet.mp4';
import reactLogo from './assets/react-logo.png';
import webstormLogo from './assets/WebStorm_Icon.svg';
import geminiLogo from './assets/Google_Gemini_logo.svg';
import githubLogo from './assets/github.svg';
import viteLogo from './assets/vite.svg';

// --- SVG Icon as a React Component ---
const ArrowDownIcon = (props: { className?: string; }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
    <g>
      <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
      <polygon points="12 12.586 8.707 9.293 7.293 10.707 12 15.414 16.707 10.707 15.293 9.293 12 12.586"/>
    </g>
  </svg>
);

function App() {
  // --- State for scroll animations ---
  const [promptIsVisible, setPromptIsVisible] = useState(true);
  const [videoIsVisible, setVideoIsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  
  // --- New state for H1 animation ---
  const [h1Opacity, setH1Opacity] = useState(0);
  const [h1Scale, setH1Scale] = useState(0.5);
  const [h1Parallax, setH1Parallax] = useState(0);

  // --- State for intro prompt ---
  const [typewriterText, setTypewriterText] = useState('');
  const [typingFinished, setTypingFinished] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const fullPromptText = "Begin scrollytale";

  // --- Refs and State for video crossfade ---
  const videoRef1 = useRef<HTMLVideoElement | null>(null);
  const videoRef2 = useRef<HTMLVideoElement | null>(null);
  const [activeVideo, setActiveVideo] = useState(1);
  const FADE_DURATION = 1.5;

  // --- Effect for the typewriter animation ---
  useEffect(() => {
    if (typewriterText.length < fullPromptText.length) {
      const timeout = setTimeout(() => {
        setTypewriterText(fullPromptText.slice(0, typewriterText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTypingFinished(true);
    }
  }, [typewriterText]);

  // --- Scroll handling effect ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Define animation phases
      const fadeInStart = 400;
      const fadeInEnd = 700;
      const sinkStart = 700;
      const fadeOutStart = 1000;
      const fadeOutEnd = 1200;

      setPromptIsVisible(scrollY < 50);
      setVideoIsVisible(scrollY > 50);
      setContentVisible(scrollY > 1400);

      // --- H1 Animation Logic ---
      if (scrollY >= fadeInStart && scrollY < fadeInEnd) {
        // Phase 1: Fade in and grow
        const progress = (scrollY - fadeInStart) / (fadeInEnd - fadeInStart);
        setH1Opacity(progress);
        setH1Scale(0.5 + progress * 0.5); // from 0.5 to 1.0
        setH1Parallax(0);
      } else if (scrollY >= fadeInEnd && scrollY < fadeOutStart) {
        // Phase 2: Hold and sink
        setH1Opacity(1);
        setH1Scale(1);
        const parallaxProgress = (scrollY - sinkStart) * 0.2;
        setH1Parallax(parallaxProgress);
      } else if (scrollY >= fadeOutStart && scrollY < fadeOutEnd) {
        // Phase 3: Fade out while sinking
        const progress = (scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        setH1Opacity(1 - progress);
        const parallaxProgress = (scrollY - sinkStart) * 0.2;
        setH1Parallax(parallaxProgress);
      } else if (scrollY >= fadeOutEnd) {
        setH1Opacity(0);
      } else {
        // Before it all starts
        setH1Opacity(0);
        setH1Scale(0.5);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Video crossfade handler ---
  const handleTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
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
        <header className="main-header">
          <div style={{ 
            opacity: h1Opacity, 
            transform: `translateY(${h1Parallax}px) scale(${h1Scale})` 
          }}>
            <h1 className="main-title">The Game of Modes</h1>
          </div>
          <div className={`scroll-prompt ${promptIsVisible ? 'fade-in' : 'fade-out'}`}>
            <p className={`typewriter ${typingFinished ? 'typing-finished' : ''}`}>{typewriterText}</p>
            <div className="hint-container" onClick={() => setHintVisible(prev => !prev)}>
              <ArrowDownIcon className={`arrow-down ${hintVisible ? 'morph-out' : ''}`} />
              <div className={`hint-box ${hintVisible ? 'morph-in' : ''}`}>
                <p className="hint-text">
                  Hint: I'm not a button, just start scrolling
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className={`background-video-container ${videoIsVisible ? 'fade-in' : 'fade-out'}`}>
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

        <div style={{ height: '250vh' }}></div>

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
              <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
                <img src={viteLogo} className="logo-pulsing" alt="Vite logo" />
              </a>
              <a href="https://www.jetbrains.com/webstorm/" target="_blank" rel="noopener noreferrer">
                <img src={webstormLogo} className="logo-pulsing" alt="WebStorm logo" />
              </a>
              <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer">
                <img src={geminiLogo} className="logo-pulsing" alt="Gemini logo" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <img src={githubLogo} className="logo-pulsing" alt="GitHub logo" />
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
