
import { useState, useEffect } from 'react';
// import type { SyntheticEvent } from 'react'; // No longer needed
import './App.css';
import reactLogo from './assets/react-logo.png';
import webstormLogo from './assets/WebStorm_Icon.svg';
import geminiLogo from './assets/Google_Gemini_logo.svg';
import githubLogo from './assets/github.svg';

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
  const [h1IsVisible, setH1IsVisible] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  // --- State for intro prompt ---
  const [promptVisible, setPromptVisible] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [typingFinished, setTypingFinished] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const fullPromptText = "Begin scrollytale";

  // --- Effect for showing the intro prompt after a delay ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setPromptVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // --- Effect for the typewriter animation ---
  useEffect(() => {
    if (promptVisible && typewriterText.length < fullPromptText.length) {
      const timeout = setTimeout(() => {
        setTypewriterText(fullPromptText.slice(0, typewriterText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (promptVisible && typewriterText.length === fullPromptText.length) {
      setTypingFinished(true);
    }
  }, [promptVisible, typewriterText]);

  // --- Scroll handling effect ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setH1IsVisible(scrollY < 300);
      setContentVisible(scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="scroll-container">
        <header className={`main-header ${h1IsVisible ? 'fade-in' : 'fade-out'}`}>
          
          <div className="video-text-container">
            <video src="/planet.mp4" autoPlay loop muted playsInline className="header-video" />
            <h1 className="video-text-mask">The Game of Modes</h1>
          </div>

          <div className={`scroll-prompt ${promptVisible ? 'fade-in' : 'fade-out'}`}>
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
              <span>+</span>
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
