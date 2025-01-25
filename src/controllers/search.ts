import { Request, Response } from 'express';
import { TrieNode } from '../Trie/trie';

import fs from 'fs';
import path from 'path';


// In-memory Trie and Cache
const trie = new TrieNode();
const cache: { [key: string]: string[] } = {};

// Preload some words from a word list file
const wordListPath = path.join(process.cwd(), 'wordlist.txt');
const DICTIONARY = fs.readFileSync(wordListPath, 'utf-8').split('\n').filter(Boolean);

// Add each word from the dictionary to the Trie
DICTIONARY.forEach((word) => trie.addWord(word));

export const search = async (req: Request, res: Response): Promise<void> => {
	const query = (req.query.query as string)?.toLowerCase();


	// If query is empty, return an empty suggestions array
	if (!query) {
		res.status(200).json({ suggestions: [] });
		return;
	}

	// Check if the result is already in the cache
	if (cache[query]) {
		res.status(200).json({ suggestions: cache[query] });
		return;
	}

	// Fetch suggestions from the Trie
	const suggestions = trie.getWords(query).slice(0, 10); // Limit to 10 results
	cache[query] = suggestions; // Cache the result
	res.status(200).json({ suggestions });
	return;
};






