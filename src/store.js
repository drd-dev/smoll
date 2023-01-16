import { writable } from "svelte/store";
import { browser } from "$app/environment";


export const theme = writable(browser && localStorage.theme || 'light');

theme.subscribe((/** @type {string} */ value) => {
  if(browser){
    localStorage.theme = value;
  }
});
  