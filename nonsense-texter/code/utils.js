// Removes paired characters from the text source such as quotes, brackets etc.
function removePairedCharacters(string) {
	// Define a regular expression that matches the paired characters to be removed.
    // Characters included: ", ›, ‹, », «, „, “, (, ), [, ], {, }
	const pairedCharactersRegex = /["›‹»«„“\(\)\[\]\{\}]/g;

	return string.replace(pairedCharactersRegex, '');
}

// Utility function to remove all numbers from a given string.
function removeNumbers(string) {
	return string.replace(/\d+/g, '');
}