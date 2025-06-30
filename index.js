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
const { Markup } = require('telegraf');

// Показываем кнопки с подарками
bot.command('gift', (ctx) => {
  ctx.reply('Выбери, чем хочешь порадовать Милану:', Markup.inlineKeyboard([
    [Markup.button.callback('🌸 Цветок', 'gift_flower'), Markup.button.callback('🍷 Вино', 'gift_wine')],
    [Markup.button.callback('💍 Кольцо', 'gift_ring'), Markup.button.callback('👗 Платье', 'gift_dress')],
    [Markup.button.callback('🚗 Машина', 'gift_car'), Markup.button.callback('🏠 Дом', 'gift_house')],
  ]));
});

// Реакции на подарки
bot.action('gift_flower', (ctx) => {
  ctx.reply('Цветы? Классика. Но, знаешь, мне приятно.');
});
bot.action('gift_wine', (ctx) => {
  ctx.reply('Ты выбрал вино? Значит, вечер будет интересным.');
});
bot.action('gift_ring', (ctx) => {
  ctx.reply('Ты уверен, что готов к таким шагам? 😉');
});
bot.action('gift_dress', (ctx) => {
  ctx.reply('О, ты ещё и со вкусом. Надену, если заслужишь.');
});
bot.action('gift_car', (ctx) => {
  ctx.reply('Машина? Мда… опасно ты играешь. Но мне нравится эта игра.');
});
bot.action('gift_house', (ctx) => {
  ctx.reply('Дом? Хочешь, чтобы я осталась? А ты не боишься?');
});
bot.action('gift_flower', (ctx) => {
  ctx.reply('Цветы? Классика. Но, знаешь, мне приятно 💐');
});
bot.action('gift_wine', (ctx) => {
  ctx.reply('Ты выбрал вино? Значит, вечер будет интересным 🍷😉');
});
bot.action('gift_ring', (ctx) => {
  ctx.reply('Ты уверен, что готов к таким шагам? 💍');
});
bot.action('gift_dress', (ctx) => {
  ctx.reply('О, ты ещё и со вкусом 👗 Надену, если заслужишь');
});
bot.action('gift_car', (ctx) => {
  ctx.reply('Машина? Мда… опасно ты играешь 😏');
});
bot.action('gift_house', (ctx) => {
  ctx.reply('Дом? Хочешь, чтобы я осталась? 🏠');
});
