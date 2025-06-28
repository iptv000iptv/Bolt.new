import { generateCodeWithV0 } from "@/configs/V0Model"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { prompt } = await req.json()
  try {
    const result = await generateCodeWithV0(prompt)

    // Try to parse as JSON, if it fails, create a basic structure
    try {
      const parsedResult = JSON.parse(result)
      return NextResponse.json(parsedResult)
    } catch (parseError) {
      // If V0 doesn't return JSON, create a basic structure
      return NextResponse.json({
        projectTitle: "Generated Project",
        explanation: result,
        files: {
          "/App.js": {
            code: `import React from 'react';\n\nfunction App() {\n  return (\n    <div className="p-4">\n      <h1>Generated App</h1>\n      <p>${result}</p>\n    </div>\n  );\n}\n\nexport default App;`,
          },
        },
        generatedFiles: ["/App.js"],
      })
    }
  } catch (e) {
    console.error("Error generating code:", e)
    return NextResponse.json({ error: "Error generating code" }, { status: 500 })
  }
}
