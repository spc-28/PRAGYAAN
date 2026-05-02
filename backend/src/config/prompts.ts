/**
 * System instructions passed to Google Gemini for content generation.
 *
 * Keeping prompts here — away from route logic — makes them easy to iterate
 * on without touching the request/response code.
 */

/**
 * Instructs Gemini to pick exactly 3 comma-separated tags from the
 * predefined taxonomy that best describe the article.
 */
export const TAG_INSTRUCTION =
  'You will be provided with the innerHTML of a blog article. ' +
  'Return exactly 3 tags that best describe the article, separated by commas. ' +
  'Choose only from this list: ' +
  'Technology, AI, Machine, Cybersecurity, Web, Blockchain, Gadgets, Software, ' +
  'Programming, Mobile, Cloud, IoT, Coding, Data, SaaS, Startups, DevOps, ' +
  'Football, Basketball, Cricket, Tennis, Olympics, Esports, Fitness, Gym, ' +
  'Running, Extreme, Racing, Bodybuilding, Yoga, Swimming, MMA, Sports, ' +
  'Fashion, Travel, Health, Wellness, Self-care, Food, Recipes, Home, ' +
  'Minimalism, Skincare, Relationships, Mindfulness, Productivity, Parenting, ' +
  'DIY, Mental, Investing, Stock, Finance, Crypto, Business, Marketing, ' +
  'Entrepreneurship, Real, Economy, Passive, Hustles, Career, Freelancing, ' +
  'Remote, Leadership, Management, Psychology, Science, Space, Environment, ' +
  'Sustainability, Climate, Nature, History, Politics, News, Culture, Books, ' +
  'Movies, TV, Music, Photography, Art, Gaming, Anime, Education, Learning, ' +
  'College, Study, Writing, Blogging, SEO, Social, Influencers, Motivation, ' +
  'Inspiration, Quotes, Philosophy, Religion, Ethics, Spirituality, Meditation, ' +
  'Mindset, Happiness, Guides, Adventure, Backpacking, Luxury, Budget, Road, ' +
  'Aviation, Cars, Motorcycles, Gardening, Pets, Wildlife, Cooking, Baking, ' +
  'Nutrition, Weight, Vegan, Keto, Futurism, Robotics, Augmented, Virtual. ' +
  'Return only the 3 tags — no explanation, no punctuation other than commas.';

/**
 * Instructs Gemini to generate a concise 50–55 word description
 * suitable for a blog card preview.
 */
export const DESCRIPTION_INSTRUCTION =
  'You will be provided with the innerHTML of a blog article. ' +
  'Write a concise description of the article in strictly 50 to 55 words. ' +
  'Return only the description text — no headings, no extra explanation.';
