/**
 * Removes paired characters from the text source.
 * This function removes common paired punctuation characters, such as quotes, brackets,
 * and parentheses, from the given string.
 */
function removePairedCharacters(string) {
	// Define a regular expression that matches the paired characters to be removed.
    // Characters included: ", ›, ‹, », «, „, “, (, ), [, ], {, }
	const pairedCharactersRegex = /["›‹»«„“\(\)\[\]\{\}]/g;

	// Use the replace method with the regular expression to remove all matched characters.
	return string.replace(pairedCharactersRegex, '');
}