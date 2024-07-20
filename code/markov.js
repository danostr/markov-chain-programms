class Markov {

	constructor() {
		this.transitions = {}; // Initialize an empty object to store transitions
	}

	// Learns the transitions from the given text source based on the specified degree.
	learnText(textSource, degree) {
		this.transitions = {}; // Reset transitions
		const nTransitions = textSource.length - degree; // Calculate the number of transitions

		// Loop through the text and learn transitions
		for (let i = 0; i < nTransitions; i++) {
			const state = textSource.slice(i, i + degree); // Current state
			const nextChar = textSource[i + degree]; // Next character
			this.learnTransition(state, nextChar);
		}
		console.log("Transitions: ", this.transitions);  // Debugging statement
	}

	// Learns a single transition from the given state to the next character.
	learnTransition(state, nextChar) {
		let entry = this.transitions[state]; // Get the current transition list for the state

		// If the state is new, create a new entry
		if (!this.transitions[state]) {
			this.transitions[state] = [nextChar];
		} else if (!entry.includes(nextChar)) { 
			entry.push(nextChar); // Add the next character if it is not already present
		}
	}

	//  Generates text starting from the given state up to the specified maximum length.
	generateText(start, maxLength) {
		let state = start; 
		const sequence = [start]; // Initialize the sequence with the starting state

		// Initialize the sequence with the starting state
		while (sequence.length < maxLength) {
			const nextChar = this.randomTransition(state); // Get a random next character for the current state
			if(!nextChar) {
				break; // Get a random next character for the current state
			}
			sequence.push(nextChar); // Add the next character to the sequence
			state = (state + nextChar).slice(1); // Update the state by removing the first character and adding the next character
		}

		let result = sequence.join("");  // Join the sequence into a single string
		result = result.replaceAll("X", "&nbsp");  // Replace 'X' with spaces
		return result + "...";  // Add ellipsis to indicate continuation
	}

	// Gets a random transition for the given state.
	randomTransition(state) {
		const transitions = this.transitions[state]; // Get the transitions for the current state

		if (transitions) {
			return random(transitions); // Return a random transition if it exists
		}
	}

	// Converts the transitions to a string representation.
	transitionsAsString() {
		const strings = [];
		const connectionsAsTable = Object.entries(this.transitions); // Convert transitions to an array of entries

		// Loop through the entries and create a string representation
		for (let [theseSigns, nextChar] of connectionsAsTable) {
			theseSigns = theseSigns.replaceAll(" ", "_"); // Replace spaces with underscores
			nextChar = nextChar.join("|"); // Join next characters with '|'
			nextChar = nextChar.replaceAll(" ", "_"); // Replace spaces with underscores
			const string = theseSigns + " -> " + nextChar; // Create the transition string
			strings.push(string);
		}

		const result = strings.join("&#13;"); // Join all transition strings with a carriage return
		return result;
	}
}