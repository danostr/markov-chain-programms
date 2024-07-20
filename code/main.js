let textSource;
let markov;
	
/**
 * Setup function initializes the GUI and the Markov instance,
 * and calls textSelected to load initial text source.
 */
function setup() {
	GUI.generateGUI();
	markov = new Markov();
	textSelected();
}	
	
// Handles the text source selection. It loads the selected text source.
function textSelected() {
	GUI.textOutputElement.html("");
	GUI.learnTextButton.removeAttribute('disabled', '');
	GUI.generateTextButton.attribute('disabled', '');

	const selectedSource = GUI.textSelector.value();

	if (selectedSource.startsWith('uploaded-')) {
        const fileName = selectedSource.replace('uploaded-', ''); 
        displayUploadedText(textSource, fileName); 
    } else {
        loadText("sources/" + selectedSource);
    }
}	
	
// Handles degree selection change.
function degreeSelected() {
	GUI.textOutputElement.html();
	GUI.generateTextButton.attribute('disabled', true);
}	
	
//Loads text from the specified path, processes it, and updates the GUI.
function loadText(path) {
	loadStrings(path, stringArray => {
		textSource = stringArray.join("\n").toLowerCase();
		textSource = textSource.replaceAll("\n", "X");
		GUI.textOutputElement.html(textSource);
		GUI.learnTextButton.removeAttribute("disabled");
	}, error => {
		console.error('Error loading text file:', error);
		GUI.textOutputElement.html('Error loading text file. Please try again.');
	});
}	

/**
 * Learns the text using the Markov model with the specified degree.
 * Cleans the text by removing paired characters and numbers with functions from *utils.js*
 * Updates the GUI with the learned transitions and enables the generate text button.
 */
function learnText() {
	const degree = int(GUI.degreeSelector.value());
	let cleanedText = removePairedCharacters(textSource);
	cleanedText = removeNumbers(cleanedText);
	markov.learnText(cleanedText, degree);
	GUI.textOutputElement.html(markov.transitionsAsString());
	GUI.generateTextButton.removeAttribute('disabled');
}	

/**
 * Generates text using the Markov model starting from a random position in the text source.
 * Updates the GUI with the generated text.
 */	
function generateText() {
	const degree = int(GUI.degreeSelector.value());
	const firstChar = random(0, textSource.length - degree);
	const start = textSource.slice(firstChar, firstChar + degree);
	const generatedText = markov.generateText(start, int(GUI.lengthSelector.value()));
	GUI.textOutputElement.html(generatedText);
}	

/**
 * Handles changes in the text source selector.
 * Loads the selected text source or handles file upload if selected.
 */
function handleTextSourceChange() {
	GUI.generateTextButton.attribute('disabled', true);
	const selectedSource = GUI.textSelector.value();

	if (selectedSource.startsWith('uploaded-')) {
        const fileName = selectedSource.replace('uploaded-', '');
        const uploadedFilePath = 'sources/' + fileName; 
        loadText(uploadedFilePath); 
    } else if (selectedSource === 'upload') {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.txt';
		input.onchange = handleFileSelect;
		input.click();
	} else {
		loadText('sources/' + selectedSource);
	}
}

// Handles file selection and reads the uploaded file as text.
async function handleFileSelect(event) {
	const file = event.target.files[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = e => {
		const text = e.target.result;
		const fileName = file.name;
		displayUploadedText(text, fileName);
		GUI.textSelector.value('uploaded-' + fileName);
	};
	reader.readAsText(file);
}

/**
 * Displays the uploaded text and updates the GUI.
 * Adds the uploaded file name to the text source selector.
 */
function displayUploadedText(text, fileName) {
	textSource = text;
	GUI.textOutputElement.html(text);
	const uploadedFileName = 'uploaded-' + fileName;
	GUI.textSelector.option(fileName, uploadedFileName);
	GUI.learnTextButton.removeAttribute('disabled');
}