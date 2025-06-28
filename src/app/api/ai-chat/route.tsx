import { generateWithV0 } from "@/configs/V0Model"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()
  try {
    console.log("Received prompt:", prompt)

    const result = await generateWithV0(prompt)
    console.log("V0 result:", result)

    return NextResponse.json({
      result: result,
    })
  } catch (err: any) {
    console.error("Error processing request:", err)
    return NextResponse.json(
      {
        error: err.message || "Internal Server Error",
      },
      { status: 500 },
    )
  }
}
