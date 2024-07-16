function removePairedCharacters(string) {
	return string.replaceAll(/["›‹»«„“\(\)\[\]\{\}]/g, '');
}