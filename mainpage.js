
  const OPENROUTER_API_KEY = "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";

  async function getMentorAdvice() {
    const skills = document.getElementById('mentorSkills').value.trim();
    const interests = document.getElementById('mentorInterests').value.trim();
    const goals = document.getElementById('mentorGoals').value.trim();
    const result = document.getElementById('mentorResult');

    if (!skills || !interests || !goals) {
      result.textContent = 'Please fill in all fields for a personalized suggestion.';
      return;
    }

    result.innerHTML = 'Thinking... <span style="font-size:1.2em">🤖</span>';

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.href,
          "X-Title": "AI Career Mentor",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "user",
              content: `Here are my details:\n- Skills: ${skills}\n- Interests: ${interests}\n- Goals: ${goals}\n\nGive me a personalized AI career roadmap based on this.`
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${response.statusText} (${response.status}). ${errorData.error?.message || 'No additional details.'}`);
      }

      const data = await response.json();
      const reply = data.choices[0]?.message?.content || "Sorry, no advice was generated.";
      result.innerHTML = reply.replace(/\n/g, "<br>");
    } catch (err) {
      console.error(err);
      result.textContent = `Sorry, an error occurred. Please check the console (F12) for details. Error: ${err.message}`;
    }
  }

  function startVoiceInput(fieldId) {
    const input = document.getElementById(fieldId);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onstart = () => {
      input.placeholder = "Listening...";
    };

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      input.value = speechText;
      input.placeholder = "Voice input captured";
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      input.placeholder = "Try again";
    };
  }
