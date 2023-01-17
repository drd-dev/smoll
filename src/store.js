import { writable } from 'svelte/store';
import { browser } from '$app/environment';



const storedTheme = browser ? localStorage.getItem('theme') : 'dark';
export const theme = writable(storedTheme);

theme.subscribe(/** @type {string} */ (value) => {
    if(browser && value){
        localStorage.setItem("theme", value);
    }
})


const storedLinks = browser ? localStorage.getItem('links') : "[{}]";
export const generatedLinks = writable(storedLinks ? JSON.parse(storedLinks) : []);

generatedLinks.subscribe(/** @type {Object} */ (value) => {
    if(browser && value) {
        localStorage.setItem("links", JSON.stringify(value));
    }
});