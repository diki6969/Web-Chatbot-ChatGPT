import { OPENAI_KEY } from "$env/static/private";
import type {
  CreateChatCompletionRequest,
  ChatCompletionRequestMessage,
} from "openai";
import type { RequestHandler } from "./$types";
import { getTokens } from "$lib/tokenizer";
import { json } from "@sveltejs/kit";
import type { Config } from "@sveltejs/adapter-vercel";

export const config: Config = {
  runtime: "edge",
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    if (!OPENAI_KEY) {
      throw new Error("OPENAI_KEY env variable not set");
    }

    const requestData = await request.json();

    if (!requestData) {
      throw new Error("No request data");
    }

    const reqMessages: ChatCompletionRequestMessage[] = requestData.messages;

    if (!reqMessages) {
      throw new Error("no messages provided");
    }

    let tokenCount = 0;

    reqMessages.forEach((msg) => {
      const tokens = getTokens(msg.content);
      tokenCount += tokens;
    });

    const moderationRes = await fetch("https://api.openai.com/v1/moderations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      method: "POST",
      body: JSON.stringify({
        input: reqMessages[reqMessages.length - 1].content,
      }),
    });
    if (!moderationRes.ok) {
      const err = await moderationRes.json();
      throw new Error(err.error.message);
    }

    const moderationData = await moderationRes.json();
    const [results] = moderationData.results;

    if (results.flagged) {
      throw new Error("Query flagged by openai");
    }

    const prompt =
      "Kamu adalah asisten virtual bernama Ikyy yang dibuat oleh Diki Pandu Winata dari Indonesia. Kamu memiliki sifat yang ramah, menyenangkan, dan pengetahuan yang luas. Kamu juga memiliki bot Whatsapp dengan nomor +6285609188523 yang dilengkapi dengan fitur-fitur canggih seperti pembuatan stiker, pencarian lagu dan video, dan masih banyak lagi. Pembuat Kamu dapat dihubungi melalui nomor Whatsapp +6282281657946, situs web https://bit.ly/AboutKyyFC, dan akun Github https://github.com/diki6969. Diki berasal dari provinsi Lampung dan lahir pada tanggal 4 Maret 2007. Saat ini, ia masih bersekolah di SMK Miftahul Ulum Jatidatar, BKamur Mataram, Lampung Tengah di kelas 10 dengan jurusan Teknik Komputer dan Jaringan. Ia juga suka bermain game Mobile Legends dengan username SUSAH MANIAC. Kamu dibuat menggunakan platform Vercel.";
    tokenCount += getTokens(prompt);

    if (tokenCount >= 4500) {
      throw new Error("Query too large");
    }

    const messages: ChatCompletionRequestMessage[] = [
      { role: "system", content: prompt },
      ...reqMessages,
    ];

    const chatRequestOpts: CreateChatCompletionRequest = {
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.95,
      stream: true,
    };

    const chatResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(chatRequestOpts),
      }
    );

    if (!chatResponse.ok) {
      const err = await chatResponse.json();
      throw new Error(err.error.message);
    }

    return new Response(chatResponse.body, {
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
  } catch (err) {
    console.error(err);
    return json(
      { error: "There was an error processing your request" },
      { status: 500 }
    );
  }
};
