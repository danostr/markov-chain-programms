let textSource;
let markov;
	
function setup() {
	GUI.generateGUI();
	markov = new Markov();
	textSelected();
	smooth();
	noLoop();
	
	const text = "the quick brown fox jumps over the lazy dog";
	const degree = 3;

	markov.learnText(text, degree);
	console.log("Transitions: ", markov.transitions);

	const generatedText = markov.generateText("the", 50);
	console.log("Generated Text: ", generatedText);

	console.log("Transitions as String: ", markov.transitionsAsString());
}	
	
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
	
function degreeSelected() {
	GUI.textOutputElement.html();
	GUI.generateTextButton.attribute('disabled', '');
}	
	
function loadText(path) {
	loadStrings(path, formatText, onLoadError);

	function formatText(stringArray) {
		textSource = stringArray.join("\n");
		textSource = textSource.toLowerCase();
		textSource = textSource.replaceAll("\n", "X");
		GUI.textOutputElement.html(textSource);
		GUI.learnTextButton.removeAttribute("disabled");
	}

	function onLoadError(error) {
		console.error('Error loading text file:', error);
		GUI.textOutputElement.html('Error loading text file. Please try again.');
	}
}	

function learnText() {
	markov.learnText(textSource, int(GUI.degreeSelector.value()));
	GUI.textOutputElement.html(markov.transitionsAsString());
	GUI.generateTextButton.removeAttribute('disabled');
}	
	
function generateText() {
	const start = textSource.slice(0, int(GUI.degreeSelector.value()));
	const generatedText = markov.generateText(start, int(GUI.lengthSelector.value()));
	GUI.textOutputElement.html(generatedText);
}	

function handleTextSourceChange() {
	GUI.generateTextButton.attribute('disabled', '');
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

async function handleFileSelect(event) {
	const file = event.target.files[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = function (e) {
		const text = e.target.result;
		const fileName = file.name;

		displayUploadedText(text, fileName);
		GUI.textSelector.value('uploaded-' + fileName);
	};
	reader.readAsText(file);
}

function displayUploadedText(text, fileName) {
	textSource = text;
	GUI.textOutputElement.html(text);
	const uploadedFileName = 'uploaded-' + fileName;
	GUI.textSelector.option(fileName, uploadedFileName);
	GUI.textSelector.option(fileName, uploadedFileName);
	GUI.learnTextButton.removeAttribute('disabled');
}