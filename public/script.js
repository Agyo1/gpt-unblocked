document.getElementById("submit").addEventListener("click", async () => {
  const selectedVersion = document.getElementById("gpt-version-selector").value;
  const userInput = document.getElementById("text-input").value;

  if (!userInput.trim()) {
    alert("Please enter a message.");
    return;
  }

  try {
    const userMessageDiv = document.createElement("div");
    userMessageDiv.className = "message user-message";
    userMessageDiv.textContent = userInput;

    // Append user message to conversation container
    const conversationContainer = document.getElementById(
      "conversation-container"
    );
    conversationContainer.appendChild(userMessageDiv);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: selectedVersion, userInput: userInput }),
    });

    if (!response.ok) {
      throw new Error("Server response was not ok: " + response.status);
    }

    const result = await response.json();
    console.log("API Response:", result);

    // const botMessageDiv = document.createElement("div");
    // botMessageDiv.className = "message bot-message";
    // botMessageDiv.textContent = JSON.stringify(
    //   result.choices[0].message.content,
    //   null,
    //   2
    // );
    const botMessageTextarea = document.createElement("textarea");
    botMessageTextarea.className = "message bot-message";
    botMessageTextarea.textContent = result.choices[0].message.content;
    botMessageTextarea.readOnly = true;

    // Append bot message to conversation container
    conversationContainer.appendChild(botMessageTextarea);

    // Clear input field
    document.getElementById("text-input").value = "";
  } catch (error) {
    console.error("Error:", error);
    alert("Error: " + error.message);
  }
});