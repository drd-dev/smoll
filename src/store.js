import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const theme = writable(browser && localStorage.theme || 'light');
export const generatedLinks = writable( browser && localStorage.generatedLinks || []);


if(browser){
theme.subscribe((/** @type {string} */ value) => {
    localStorage.theme = value;
});

generatedLinks.subscribe((/** @type {string} */ value) => {
    localStorage.generatedLinks =  JSON.stringify(value);
});

}
  