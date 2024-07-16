let textSource;
let markow;
	
function setup() {
	GUI.generateGUI();
	markow = new Markow();
	textSelected();
	smooth();
	noLoop();
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
	markow.learnText(textSource, int(GUI.degreeSelector.value()));
	GUI.textOutputElement.html(markow.transitionsAsString());
	GUI.generateTextButton.removeAttribute('disabled');
}	
	
function generateText() {
	const begin = textSource.slice(0, int(GUI.degreeSelector.value()));
	const generatedText = markow.generateText(begin, int(GUI.lengthSelector.value()));
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