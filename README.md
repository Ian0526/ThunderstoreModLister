
# Discord Bot Setup Guide

This repository contains the code for a simple Discord bot that fetches and displays a list of mods from a specified Thunderstore mod profile using a UUID. This guide will walk you through the steps needed to set up and deploy your own bot.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.x)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- A Discord account
- A Discord server where you have permissions to add a bot
- A [Discord Developer Portal](https://discord.com/developers/applications) account

## Getting Started

### 1. Clone the Repository

Start by cloning this repository to your local machine:

```bash
git clone https://github.com/Ian0526/ThunderstoreModLister.git
cd ThunderstoreModLister
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies using npm:

```bash
npm install
```

### 3. Create a Discord Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and log in.
2. Click on **New Application**.
3. Give your application a name, and then click **Create**.
4. Navigate to the **Bot** tab on the left-hand menu.
5. Click on **Add Bot** and confirm.
6. Under **Privileged Gateway Intents**, enable the following:
    - **PRESENCE INTENT**
    - **SERVER MEMBERS INTENT**
    - **MESSAGE CONTENT INTENT**
7. Copy the **TOKEN**. You'll need this later.

### 4. Set Up Environment Variables

Create a `.env` file in the root of your project directory and add your bot token:

```bash
echo DISCORD_TOKEN=your-bot-token > .env
```

Replace `your-bot-token` with the token you copied from the Discord Developer Portal.

### 5. Update the Bot Code

The bot is set up to respond to the `!modlist <uuid>` command in a Discord server. The code fetches mod names from a specified Thunderstore mod profile based on the provided UUID.

If you need to make changes, open the `bot.js` file in your favorite text editor and adjust the logic as needed.

### 6. Run the Bot

Start the bot by running the following command:

```bash
node bot.js
```

You should see a confirmation message in the console indicating that the bot is online.

### 7. Invite the Bot to Your Server

To invite your bot to a server:

1. Go to the [OAuth2 URL Generator](https://discord.com/developers/applications).
2. Under **SCOPES**, select `bot`.
3. Under **BOT PERMISSIONS**, select the necessary permissions.
4. Copy the generated URL and paste it into your browser.
5. Select the server where you want to add the bot, and click **Authorize**.

### 8. Test the Bot

In your Discord server, type `!modlist <uuid>` to see the bot in action. Replace `<uuid>` with a valid Thunderstore mod profile UUID.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
