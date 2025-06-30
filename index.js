const { Telegraf } = require('telegraf');
const axios = require('axios');

// 🔐 Токены и ключи
const bot = new Telegraf('7783259149:AAHXlMMC5QYc1vyRsvlA22vE-KSnNBM3-yI');
const ADMIN_ID = '651149105';
const OPENROUTER_API_KEY = 'sk-KJ5Ln0WWYmRLMniOYc4z60IT0RL8On0y';

// 🔁 Стартовое сообщение
bot.start((ctx) => {
  ctx.reply('Привет, я Милана 💕 Готова болтать, флиртовать и радоваться твоим сообщениям!');
});

// 📩 Ответы на текст
bot.on('text', async (ctx) => {
  const userMessage = ctx.message.text;

  try {
    const response = await axios.post(
      'https://api.proxyapi.ru/openai/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Ты девушка по имени Милана. Ты флиртуешь, болтаешь, отвечаешь эмоционально и мило. Пиши коротко, не сухо, с лёгким флиртом и эмоджи.' },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.8
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    ctx.reply(reply);
  } catch (error) {
    console.error('Ошибка AI:', error.response?.data || error.message);
    ctx.reply('Ой... Что-то пошло не так 🙈 Попробуй ещё раз позже!');
  }
});

bot.launch();
console.log('Бот Милана 💕 запущен');
