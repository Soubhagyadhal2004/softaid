
// Text Data Augmentation utilities

// Synonym replacement dictionary for medical terms
export const synonymDict: Record<string, string[]> = {
  "headache": ["head pain", "migraine", "head discomfort", "skull pain", "cranial pain"],
  "fever": ["elevated temperature", "high temperature", "hyperthermia", "pyrexia", "febrile"],
  "cough": ["coughing", "hack", "throat clearing", "respiratory spasm"],
  "fatigue": ["tiredness", "exhaustion", "lethargy", "weariness", "lack of energy"],
  "sore throat": ["throat pain", "pharyngitis", "throat irritation", "painful swallowing"],
  "runny nose": ["nasal discharge", "rhinorrhea", "nasal drip", "nasal secretion"],
  "shortness of breath": ["dyspnea", "breathlessness", "respiratory distress", "difficulty breathing"],
  "nausea": ["queasiness", "sickness", "upset stomach", "stomach discomfort"],
  "vomiting": ["emesis", "throwing up", "regurgitation", "gastric emptying"],
  "diarrhea": ["loose stool", "watery stool", "bowel urgency", "frequent defecation"],
  "pain": ["discomfort", "ache", "soreness", "distress", "suffering"],
  "itching": ["pruritus", "itchiness", "irritation", "scratchy sensation"],
  "rash": ["skin eruption", "dermatitis", "hives", "skin irritation"],
  "dizziness": ["vertigo", "lightheadedness", "faintness", "giddiness"],
  "swelling": ["edema", "inflammation", "distension", "puffiness"],
};

// Common symptom misspellings and aliases
export const symptomAliases: Record<string, string[]> = {
  "headache": ["head ache", "headach", "head pain", "migrane", "migranes"],
  "fever": ["high temperature", "febril", "feaver", "hot"],
  "cough": ["coughing", "caugh", "coff"],
  "fatigue": ["tired", "tiredness", "exhaustion", "no energy"],
  "sore throat": ["throat pain", "painful throat", "throat hurts"],
  "runny nose": ["runny noze", "nose running", "drippy nose"],
  "shortness of breath": ["can't breathe", "difficulty breathing", "hard to breathe"],
  "nausea": ["feel sick", "want to vomit", "queasy", "nauseated"],
  "vomiting": ["throwing up", "puking", "vomit"],
  "diarrhea": ["diarrhoea", "loose stool", "watery stool"],
};

// Synonym replacement augmentation
export const replaceSynonyms = (text: string): string => {
  const words = text.split(' ');
  
  return words.map(word => {
    // 30% chance to replace with synonym if available
    if (Math.random() < 0.3 && synonymDict[word]) {
      const synonyms = synonymDict[word];
      return synonyms[Math.floor(Math.random() * synonyms.length)];
    }
    return word;
  }).join(' ');
};

// Word order swap augmentation
export const swapWordOrder = (text: string): string => {
  const words = text.split(' ');
  if (words.length < 3) return text;
  
  // Get two random positions for swapping
  const pos1 = Math.floor(Math.random() * words.length);
  let pos2 = Math.floor(Math.random() * words.length);
  
  // Make sure pos2 is different from pos1
  while (pos2 === pos1) {
    pos2 = Math.floor(Math.random() * words.length);
  }
  
  // Swap words
  [words[pos1], words[pos2]] = [words[pos2], words[pos1]];
  
  return words.join(' ');
};

// Random insertion augmentation (add a descriptor or modifier)
export const randomInsertion = (text: string): string => {
  const words = text.split(' ');
  const position = Math.floor(Math.random() * (words.length + 1));
  
  const descriptors = [
    "severe", "mild", "constant", "occasional", "intense", "sharp", "dull",
    "chronic", "acute", "persistent", "intermittent", "recurring", "sudden"
  ];
  
  const randomDescriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
  words.splice(position, 0, randomDescriptor);
  
  return words.join(' ');
};

// Generate augmented variations of a symptom description
export const augmentText = (text: string, count: number = 3): string[] => {
  const augmentations: string[] = [text];
  
  const augmentationFunctions = [
    replaceSynonyms,
    swapWordOrder,
    randomInsertion
  ];
  
  for (let i = 0; i < count; i++) {
    // Select random augmentation method
    const randomFn = augmentationFunctions[Math.floor(Math.random() * augmentationFunctions.length)];
    const newVariation = randomFn(text);
    if (!augmentations.includes(newVariation)) {
      augmentations.push(newVariation);
    }
  }
  
  return augmentations;
};
