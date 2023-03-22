import { RequestHandler } from 'express';
import { Configuration, OpenAIApi } from "openai";

const OpenAIConfig = new Configuration({
   apiKey: process.env.OPENAPI_KEY as string
})

const openapi = new OpenAIApi(OpenAIConfig);

export const chatCompletion: RequestHandler = async (req, res) => {
   try {
      const { prompt } = req.body;

      const answer = await openapi.createCompletion({
         model: "text-davinchi-003",
         prompt,
         temperature: 0,
         max_tokens: 3000
      })

      const text = answer.data.choices[0].text as String;

      res.status(200).json({ text })
   } catch (err: any) {
      res.status(500).json({ message: err.message });
   }
}