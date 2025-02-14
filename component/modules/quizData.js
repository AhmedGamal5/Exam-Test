export async function fetchQuestions(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch questions");
  return response.json();
}

export function shuffleQuestions(questions) {
  for (let i = questions.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[randomIndex]] = [questions[randomIndex], questions[i]];
  }
}
