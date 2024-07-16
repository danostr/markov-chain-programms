class Markow {

	constructor() {
		this.transitions = {};
	}

	learnText(textSource, degree) {
		this.transitions = {};
		const nTransitions = textSource.length - degree;

		for (let i = 0; i < nTransitions; i++) {
			const lastSign = textSource.slice(i, i + degree);
			const nextSign = textSource[i + degree];
			this.learnTransition(lastSign, nextSign);
		}
	}

	learnTransition(lastSign, nextSign) {
		const entry = this.transitions[lastSign];
		if (!this.transitions[lastSign]) {
			this.transitions[lastSign] = [nextSign];
		} else {
			if (!entry.includes(nextSign)) {
				entry.push(nextSign);
			}
		}
	}

	generateText(begin, maxLength) {
		let lastSign = begin;
		const sequence = [begin];

		while (sequence.length < maxLength) {
			const nextSign = this.randomTransition(lastSign);
			if(!nextSign) {
				break;
			}
			sequence.push(nextSign);
			lastSign = (lastSign + nextSign).slice(1);
		}

		let result = sequence.join("");
		result = result.replaceAll("X", "&#13");
		return result + "...";
	}

	randomTransition(lastSign) {
		const entry = this.transitions[lastSign];
		if (entry) {
			return random(entry);
		}
	}

	transitionsAsString() {
		const strings = [];
		const connectionsAsTable = Object.entries(this.transitions);
		for (let [theseSigns, nextSign] of connectionsAsTable) {
			theseSigns = theseSigns.replaceAll(" ", "_");
			nextSign = nextSign.join("|");
			nextSign = nextSign.replaceAll(" ", "_");
			const string = theseSigns + " -> " + nextSign;
			strings.push(string);
		}
		const result = strings.join("&#13;");
		return result;
	}
}