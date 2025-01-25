/* eslint-disable @typescript-eslint/no-this-alias */
// TrieNode class to represent each node in the Trie
export class TrieNode {
	children: { [key: string]: TrieNode } = {}; // Children nodes
	isEndOfWord = false; // Flag to check if it's the end of a word

	// Method to add a word to the Trie
	addWord(word: string): void {
		let node: TrieNode = this;
		for (const char of word) {
			if (!node.children[char]) {
				node.children[char] = new TrieNode();
			}
			node = node.children[char];
		}
		node.isEndOfWord = true;
	}

	// Method to get words with a given prefix
	getWords(prefix: string): string[] {
		let node: TrieNode = this;
		for (const char of prefix) {
			if (!node.children[char]) return [];
			node = node.children[char];
		}
		return this.collectWords(node, prefix);
	}

	// Helper method to collect all words from a given node
	private collectWords(node: TrieNode, prefix: string): string[] {
		const words: string[] = [];
		if (node.isEndOfWord) words.push(prefix);

		for (const char in node.children) {
			words.push(...this.collectWords(node.children[char], prefix + char));
		}

		return words;
	}
}
