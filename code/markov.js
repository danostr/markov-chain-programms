class Markov {

	constructor() {
		this.transitions = {};
	}

	learnText(textSource, degree) {
		this.transitions = {};
		const nTransitions = textSource.length - degree;

		for (let i = 0; i < nTransitions; i++) {
			const state = textSource.slice(i, i + degree);
			const nextChar = textSource[i + degree];
			this.learnTransition(state, nextChar);
		}
		console.log("Transitions: ", this.transitions);  // Debugging statement
	}

	learnTransition(state, nextChar) {
		let entry = this.transitions[state];

		if (!this.transitions[state]) {
			this.transitions[state] = [nextChar];
		} else if (!entry.includes(nextChar)) {
			entry.push(nextChar);
		}
	}

	generateText(start, maxLength) {
		let state = start;
		const sequence = [start];

		while (sequence.length < maxLength) {
			const nextChar = this.randomTransition(state);
			if(!nextChar) {
				break;
			}
			sequence.push(nextChar);
			state = (state + nextChar).slice(1);
		}

		let result = sequence.join("");
		result = result.replaceAll("X", "&#13");
		return result + "...";
	}

	randomTransition(state) {
		const transitions = this.transitions[state];

		if (transitions) {
			return random(transitions);
		}
	}

	transitionsAsString() {
		const strings = [];
		const connectionsAsTable = Object.entries(this.transitions);

		for (let [theseSigns, nextChar] of connectionsAsTable) {
			theseSigns = theseSigns.replaceAll(" ", "_");
			nextChar = nextChar.join("|");
			nextChar = nextChar.replaceAll(" ", "_");
			const string = theseSigns + " -> " + nextChar;
			strings.push(string);
		}

		const result = strings.join("&#13;");
		return result;
	}
}