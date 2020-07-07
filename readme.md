# Kanjitab

## My additions

* Option to quiz on
  * Hiragana
  * Hiragana with Digraphs
  * Katakana
  * Katakana with Digraphs
  * RTK Kanji translations
  * RTK Kanji Kunyomi/Onyomi reading
* Dark mode option

## Demo

https://eyl327.github.io/kanjitab/extension/

# Readme from [datamimi's kanjitab](https://github.com/datamimi/kanjitab)

## What's this?

I'm pretty bad at making time to practise kana as part of my daily routine, so I built a browser extension to help with that. This Chrome extension displays a randomly selected kana when a new
browser tab is opened. The user is asked to type an English translation; if
correct, the user is redirected to Google. If incorrect, the tab closes and the
user is appropriately ashamed.

![Screenshot](https://github.com/nomblr/kanjitab/blob/master/extension/screenshot.jpg)

## How do I install this?

Create a new folder somewhere convenient on your Mac/PC

Download all the files in the 'extension' folder in this repo, to that folder

Fire up Chrome and go to 'Preferences -> Extensions'

Enable 'Developer Mode' by ticking the box at the top right of the page

Hit 'Load unpacked extension'

Select the folder you created in Step 1

This should now show up in your list of extensions

Happy kana practicing!

## Is this case sensitive?

Nope! You can type your translation in upper or lower case, or both if you're
feeling fancy.

## What if a kana has several possible translations?

If you type in any one of the correct translations, this will be judged as a correct
translation.

## How can I redirect to my usual home page?

If you'd rather you were redirected to your usual homepage after correctly
translating a kana, edit the URL on line 16 of 'script.js' accordingly.

## How can I adapt this to work with more/different kanji/scripts?

The kana used to drive this extension are taken from the wikipedia entry for
hiragana (https://en.wikipedia.org/wiki/hiragana). Each kana in the
table has a unique numeric character reference (this is a universal code for
displaying that particular kanji in HTML) and an English translation.

This information was used to populate hiragana.json, a file which stores the codes
and meanings for all the kanji used by this extension.

You can add, remove or modify this file to include a wider/narrower/different range of
hiragana as long as you don't mess with the underlying structure of the JSON.

Maybe you'd like to use this script to learn cuneiform, or Arabic script, or
Cyrillic? That's cool too! Just follow the same process as above.
