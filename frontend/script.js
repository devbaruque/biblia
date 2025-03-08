document
  .getElementById("questionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const questionInput = document.getElementById("questionInput");
    const loading = document.getElementById("loading");
    const responseDiv = document.getElementById("response");
    const questionDisplay = document.getElementById("questionDisplay");
    const submitButton = this.querySelector("button");
    const containerResposta = document.getElementById("responseContainer");

    const question = questionInput.value;

    loading.style.display = "block";
    responseDiv.style.display = "none";
    questionDisplay.style.display = "none";
    submitButton.disabled = true;
    containerResposta.style.display = "none";

    questionInput.value = "";
    fetch("https://biblia-puug.vercel.app/api/chat", {
      // URL do backend no Vercel
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: question }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        loading.style.display = "none";
        questionDisplay.style.display = "block";
        questionDisplay.textContent = `Pergunta: ${question}`;
        responseDiv.style.display = "block";
        containerResposta.style.display = "block";
        responseDiv.innerHTML = data.message;
        submitButton.disabled = false;
      })
      .catch((error) => {
        loading.style.display = "none";
        responseDiv.style.display = "block";
        responseDiv.textContent =
          "Ocorreu um erro ao buscar a resposta. Tente novamente.";
        submitButton.disabled = false;
        console.error("Erro:", error);
      });
  });
