import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY
});

export async function POST(req) {
  try {
    const body = await req.json();
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a grammar checker. Identify all grammatical errors in the user's text and return an only the corrected string where you correct the wrong part and then wrap what with <span style='color: red;'></span> dont return anything else",
        },
        {
          role: "user",
          content: body.text,
        },
      ],
    });
    const correctedText = completion.choices[0].message.content ?? "";

    return Response.json({ success: true, correctedText });
  } catch (error) {
    return Response.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
