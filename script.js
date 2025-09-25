const searchBtn = document.getElementById("searchBtn");
const wordInput = document.getElementById("wordInput");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("click", () => {
  const word = wordInput.value.trim();
  if (word !== "") {
    getDefinition(word);
  } else {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
  }
});

// 🔹 Allow pressing "Enter" to search
wordInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchBtn.click(); // simulate button click
  }
});

async function getDefinition(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Word not found");
    }
    const data = await response.json();

    const meaning = data[0].meanings[0];
    const definition = meaning.definitions[0].definition;
    const partOfSpeech = meaning.partOfSpeech;
    const phonetics = data[0].phonetics[0]?.text || "N/A";
    const audio = data[0].phonetics[0]?.audio || "";

    resultDiv.innerHTML = `
      <h2>${data[0].word}</h2>
      <p><strong>Phonetics:</strong> ${phonetics}</p>
      <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
      <p><strong>Definition:</strong> ${definition}</p>
      ${
        audio
          ? `<p><audio controls src="${audio}"></audio></p>`
          : "<p>No audio available</p>"
      }
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>${error.message}</p>`;
  }
}
