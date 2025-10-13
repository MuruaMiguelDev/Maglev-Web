import { enableSmoothScroll } from './smoothScroll.js';
import { wireContactForm } from './form.js';
import { wireCallButtons } from './callNow.js';
import { wireMobileMenu } from './mobileMenu.js';
import { wireCounters } from './counters.js';
import { wireHeaderColor } from './headerEffects.js';
import { wireHeroParallax } from './parallax.js';

enableSmoothScroll(90);
wireContactForm();
wireCallButtons('+5493513418294');
wireMobileMenu();
wireCounters();
wireHeaderColor();
wireHeroParallax();