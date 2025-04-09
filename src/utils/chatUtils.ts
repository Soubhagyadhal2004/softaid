const calculateSymptomSimilarity = (userSymptoms: Set<string>, diseaseSymptoms: Set<string>): number => {
  const matchingSymptoms = new Set([...userSymptoms].filter(symptom => diseaseSymptoms.has(symptom)));
  const totalSymptoms = new Set([...userSymptoms, ...diseaseSymptoms]);
  
  // Fix: Convert matchingSymptoms to array before accessing length
  return Array.from(matchingSymptoms).length / Array.from(totalSymptoms).length;
};
