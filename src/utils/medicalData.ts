
// Medical data and disease database

// Sample database of diseases and their symptoms
export const diseaseDatabase = [
  {
    disease: "Common Cold",
    symptoms: new Set(["runny nose", "sneezing", "cough", "sore throat", "headache", "mild fever"])
  },
  {
    disease: "Influenza (Flu)",
    symptoms: new Set(["high fever", "body aches", "fatigue", "headache", "cough", "sore throat"])
  },
  {
    disease: "COVID-19",
    symptoms: new Set(["fever", "dry cough", "fatigue", "loss of taste", "loss of smell", "shortness of breath"])
  },
  {
    disease: "Migraine",
    symptoms: new Set(["severe headache", "sensitivity to light", "nausea", "vomiting"])
  },
  {
    disease: "Allergic Rhinitis",
    symptoms: new Set(["sneezing", "runny nose", "itchy eyes", "congestion"])
  }
];

import { TrainingData } from '@/types/chat';

// Training data for medicine recommendations
export const medicineIntents: TrainingData = {
  intents: [
    {
      tag: "cold",
      patterns: ["I have a runny nose", "Sneezing a lot", "My nose is blocked"],
      responses: [
        "You may have a common cold. Try steam inhalation and stay warm.",
        "Over-the-counter meds like Cetirizine or Paracetamol may help.",
        "Do you also have a fever or sore throat?"
      ]
    },
    {
      tag: "flu",
      patterns: ["High fever", "Body ache and chills", "Cough and sore throat"],
      responses: [
        "Sounds like flu. Rest well, drink warm fluids, and take paracetamol.",
        "If symptoms worsen, antiviral drugs like Oseltamivir may be prescribed.",
        "Are you experiencing breathlessness or chest pain as well?"
      ]
    },
    {
      tag: "covid",
      patterns: ["Loss of taste", "Shortness of breath", "Dry cough", "COVID symptoms"],
      responses: [
        "These could be COVID-19 symptoms. Please isolate and get tested.",
        "Take antipyretics, stay hydrated, and monitor oxygen levels.",
        "Have you been vaccinated or tested recently?"
      ]
    },
    {
      tag: "malaria",
      patterns: ["Chills and shivering", "Fever that comes and goes", "Muscle pain", "Sweating"],
      responses: [
        "You may have malaria. A blood test will confirm the diagnosis.",
        "Start taking prescribed anti-malarials like Artemisinin combination therapy (ACT).",
        "Are you experiencing nausea or vomiting as well?"
      ]
    },
    {
      tag: "typhoid",
      patterns: ["High fever for days", "Abdominal pain", "Feeling very weak", "Constipation or diarrhea"],
      responses: [
        "You could have typhoid. A Widal test is suggested.",
        "Ciprofloxacin or Cefixime may be prescribed based on severity.",
        "Is the fever persistent or fluctuating?"
      ]
    },
    {
      tag: "migraine",
      patterns: ["Throbbing headache", "Pain on one side", "Light sensitivity", "Aura before headache"],
      responses: [
        "Sounds like a migraine. Rest in a quiet dark room and avoid screen time.",
        "You can try medications like Sumatriptan or Naproxen.",
        "Do you also experience nausea or blurred vision?"
      ]
    },
    {
      tag: "asthma",
      patterns: ["Wheezing", "Chest tightness", "Shortness of breath", "Difficulty in breathing"],
      responses: [
        "This may be asthma. Avoid dusty environments and known allergens.",
        "Use prescribed inhalers like Salbutamol during attacks.",
        "Do you have a history of asthma or allergies?"
      ]
    },
    {
      tag: "dengue",
      patterns: ["Severe body pain", "High fever", "Rashes", "Bleeding gums", "Low platelet count"],
      responses: [
        "Dengue might be the issue. Avoid aspirin and get platelet count checked regularly.",
        "Use paracetamol for fever, rest well, and stay hydrated with ORS.",
        "Have you noticed any bleeding or bruising?"
      ]
    },
    {
      tag: "depression",
      patterns: ["Feeling low", "No energy", "Hopelessness", "I can't sleep", "Loss of interest"],
      responses: [
        "You might be experiencing depression. Talk to a mental health professional.",
        "SSRIs like Sertraline or CBT therapy might help. Avoid self-diagnosing.",
        "Have these feelings been constant for more than 2 weeks?"
      ]
    },
    {
      tag: "acidity",
      patterns: ["Heartburn", "Acid reflux", "Burning in chest after food"],
      responses: [
        "This could be acidity. Avoid spicy foods and eat smaller meals.",
        "Antacids like Pantoprazole or Ranitidine may help.",
        "Do you also experience bloating or burping?"
      ]
    },
    {
      tag: "ulcer",
      patterns: ["Stomach pain", "Pain after eating", "Nausea", "Frequent burping"],
      responses: [
        "Possible peptic ulcer. A gastroscopy can confirm it.",
        "Take antacids or PPIs like Omeprazole after doctor's advice.",
        "Are you taking any painkillers frequently?"
      ]
    },
    {
      tag: "healthy",
      patterns: ["I'm fine", "I feel good", "No health issues"],
      responses: [
        "That's great! Stay hydrated, eat well, and do regular checkups.",
        "Happy to hear you're feeling well! Would you like health tips?"
      ]
    }
  ]
};
