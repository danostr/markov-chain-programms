const GUI = {

	//HTML element selectors to be defined
	textSelector: undefined,
	degreeSelector: undefined,
	lengthSelector: undefined,
	degreeDisplay: undefined,
	learnTextButton: undefined,
	generateTextButton: undefined,
	textOutputElement: undefined,

	/**
	 * Initializes the GUI by selecting HTML elements and setting up eent handlers.
	 * This function should be called once to setup the GUI components and their interactions.
     */
	generateGUI() {
		noCanvas();

		// Select the HTML element for text output
		this.textOutputElement = select('#textOutputElement');

		// Select the HTML element for text source input and attach a change event handler
		this.textSelector = select("#textSelector");
		this.textSelector.changed(handleTextSourceChange);

		// Select the HTML element for degree selection and attach a change event handler
		this.degreeSelector = select("#degreeSelector");
		this.degreeSelector.changed(degreeSelected);

		// Select the HTML element for generated text length selection
		this.lengthSelector = select("#lengthSelector");

		// Select the learn text button and attach a click event handler
		this.learnTextButton = select("#learnTextButton");
		this.learnTextButton.mousePressed(learnText);

		// Select the generate text button and attach a click event handler
		this.generateTextButton = select("#generateTextButton");
		this.generateTextButton.mousePressed(generateText);
	}
}