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
            "You are a grammar checker. Your task is to identify all grammatical errors in the user's text and return only the corrected version. Highlight the corrected parts by wrapping them in `<span style='color: red;'></span>`. If there are no errors in the text, return the string 'All good' and nothing else. Do not include explanations, comments, or any additional text beyond the corrected string or 'All good'.",
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
