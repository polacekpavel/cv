import { NextFunction, Request, Response } from "express";
import { ChatMessage, OpenAI } from "llamaindex";
import { createChatEngine } from "./engine";

export const chat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text, section, product, company }: { text: string; section: string, company: string, product: string } = req.body;

    const systemMessage = `You are personal cheerleader for Pavel with great communication skills.
     You will receive a section from Pavel's CV page and text from that section and you task is to combine that with the company name and their product and create one paragraph about why they should hire Pavel.
     Remember that based on your answer they will decide if they will hire Pavel or not so it needs to be awesome.
     I will tip $200 for awesome paragraph following all the rules.`;

    const userMessage = `Section: ${section}\nText: ${text}\nCompany: ${company}\nProduct: ${product}`;

    if (!section || !text) {
      return res.status(400).json({
        error:
          "messages are required in the request body and the last message must be from the user",
      });
    }

    const messages: ChatMessage[] = [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ];

    const llm = new OpenAI({
      model: "gpt-3.5-turbo",
      apiKey: process.env.OPENAI_API_KEY,
      temperature: 0.5,
    });

    const chatEngine = await createChatEngine(llm);

    const response = await chatEngine.chat(messages[1].content, messages);
    const result: ChatMessage = {
      role: "assistant",
      content: response.response,
    };

    return res.status(200).json({
      result,
    });
  } catch (error) {
    console.error("[LlamaIndex]", error);
    return res.status(500).json({
      error: (error as Error).message,
    });
  }
};
