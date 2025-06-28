const V0_API_KEY = "v1:ldh9gZRcpptSKorZccrz1nyk:ebVOSpw4T2wflNWIcoH1hjiV"

export const generateWithV0 = async (prompt: string) => {
  try {
    const response = await fetch("https://api.v0.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${V0_API_KEY}`,
      },
      body: JSON.stringify({
        model: "v0-1.5-md",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`V0 API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error calling V0 API:", error)
    throw error
  }
}

export const generateCodeWithV0 = async (prompt: string) => {
  try {
    const response = await fetch("https://api.v0.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${V0_API_KEY}`,
      },
      body: JSON.stringify({
        model: "v0-1.5-md",
        messages: [
          {
            role: "user",
            content: prompt + "\n\nPlease return the response in JSON format with files structure for a React project.",
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`V0 API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error calling V0 API for code generation:", error)
    throw error
  }
}
