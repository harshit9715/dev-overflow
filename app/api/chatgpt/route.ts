import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { question } = await req.json();
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an expert software developer. You are helping a junior developer understand a complex concept.",
          },
          {
            role: "user",
            content: `Answer this ${question}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
