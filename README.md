# 🌙 Moonlight Tales

**Where AI Magic Meets Bedtime Wonder**

Moonlight Tales is an AI-powered web app that creates funny and heartwarming bedtime stories for children based on a single sentence or idea. With a beautifully illustrated interface and playful storytelling, this app brings joy, laughter, and life lessons to kids — one story at a time.

---

## 🧠 Powered by Lyzr Agent

This project connects to a Lyzr AI inference agent that generates creative bedtime stories on demand using the following endpoint:

```
POST https://agent-prod.studio.lyzr.ai/v3/inference/chat/
```

**Headers:**

```
Content-Type: application/json  
x-api-key: sk-default-iPEOmf2biknSikwsVOh0xbDtT5nNkUx6
```

**Example Payload:**

```json
{
  "user_id": "rahulrajasekharanmenon64325@gmail.com",
  "agent_id": "#",
  "session_id": "#",
  "message": "A curious girl finds a talking sock in her laundry basket"
}
```

---

## ✨ Features

- 🎨 Cute, animated bedtime-themed UI (clouds, stars, moon)
- 🧒 Child-friendly fonts (e.g., Comic Neue, Baloo 2)
- 💡 Single sentence input to generate full story
- 📖 Storybook-style display with soft scrolling or flipping
- 🌈 Gentle moral or life lesson in every tale
- 🎵 Optional toggle for soothing background music
- 📱 Fully responsive and mobile-friendly

---

## 🌈 Tech Stack

- **Frontend**: HTML, CSS, JavaScript or React
- **Styling**: Tailwind CSS (for pastel tones, smooth UI)
- **Font**: Google Fonts - Comic Neue / Baloo
- **API**: Lyzr Agent (AI backend)
- **Audio**: Howler.js (optional background music)

---

## 🚀 How to Use

1. **Clone the repository**

```bash
git clone https://github.com/RahulRmCoder/moonlight-tales.git
cd moonlight-tales
```

2. **Install dependencies**

```bash
npm install
```

3. **Set your environment variables**

Create a `.env` file and add your key:

```env
VITE_LYZR_API_KEY=sk-default-iPEOmf2biknSikwsVOh0xbDtT5nNkUx6
```

4. **Run the development server**

```bash
npm run dev
```

---

## 📁 Project Structure

```
moonlight-tales/
├── public/               # Static assets (images, sounds)
├── src/
│   ├── components/       # InputBox, StoryDisplay, etc.
│   ├── styles/           # Tailwind or CSS files
│   ├── App.jsx
│   └── main.jsx
├── .env
├── index.html
├── package.json
└── README.md
```

---

## 🧪 Sample API Call (cURL)

```bash
curl -X POST 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: sk-default-iPEOmf2biknSikwsVOh0xbDtT5nNkUx6' \
  -d '{
        "user_id": "rahulrajasekharanmenon64325@gmail.com",
        "agent_id": "#",
        "session_id": "#",
        "message": "A giraffe who wants to touch the moon"
      }'
```

---

## 🌟 Example Input → Output

**Input:**  
`A shy dragon wants to become a stand-up comedian`

**Generated Story:**  
> Once upon a time in the giggle-filled valley of Burniebelly, a shy dragon named Drako discovered a love for telling jokes. Every time he tried to breathe fire, he sneezed sparkles instead…

(Continues with a moral at the end.)

---

## 📜 License

This project is licensed under the MIT License.

---

## 🌠 Ending Note

> “Sweet dreams are made of stories.”  
Bring imagination to life and make bedtime magical — one sentence at a time.
# moonlight-tales
