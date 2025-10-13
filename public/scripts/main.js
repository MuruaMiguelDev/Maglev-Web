import { enableSmoothScroll } from '/scripts/smoothScroll.js';
import { wireContactForm } from '/scripts/form.js';
import { wireCallButtons } from '/scripts/callNow.js';
import { wireMobileMenu } from '/scripts/mobileMenu.js';
import { wireCounters } from '/scripts/counters.js';
import { wireHeaderColor } from '/scripts/headerEffects.js';
import { wireHeroParallax } from '/scripts/parallax.js';

enableSmoothScroll(90);
wireContactForm();
wireCallButtons('+5493513418294');
wireMobileMenu();
wireCounters();
wireHeaderColor();
wireHeroParallax();