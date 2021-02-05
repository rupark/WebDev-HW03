// function taken from https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/04-react-intro/notes.md
export function uniq(xs) {
    return Array.from(new Set(xs));
}

export function updatebulls(secret, guess) {
    let bulls = 0;
    var i;
    for (i = 0; i < (secret.toString()).length; i++) {
      if (secret.toString().charAt(i) == guess.toString().charAt(i)) {
        bulls = bulls + 1;
      }
    }
    return bulls;
}

export function updatecows(secret, guess) {
    let cows = 0;
    var i;
    for (i = 0; i < (secret.toString()).length; i++) {
      if ((secret.toString()).includes((guess.toString()).charAt(i))
      && secret.toString().charAt(i) != guess.toString().charAt(i)) {
        cows = cows + 1;
      }
    }
    return cows;
}

export function lives_left(guesses) {
    return 8 - guesses.length;
}
