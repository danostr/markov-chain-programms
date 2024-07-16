const GUI = {

	textSelector: undefined,
	degreeSelector: undefined,
	lengthSelector: undefined,
	degreeDisplay: undefined,
	learnTextButton: undefined,
	generateTextButton: undefined,
	textOutput: undefined,

	generateGUI() {
		noCanvas();

		this.textOutputElement = select('#textOutputElement');
		this.textSelector = select("#textSelector");
		this.textSelector.changed(handleTextSourceChange);

		this.degreeSelector = select("#degreeSelector");
		this.degreeSelector.changed(degreeSelected);

		this.lengthSelector = select("#lengthSelector");

		this.learnTextButton = select("#learnTextButton");
		this.learnTextButton.mousePressed(learnText);

		this.generateTextButton = select("#generateTextButton");
		this.generateTextButton.mousePressed(generateText);
	}
}