import { FC, useState } from 'react';
import InputComponent from '../components/inputComponent';
import MessageDisplay from '../components/messageComponent';
import axios  from 'axios';
interface Message {
    id: number;
    text: string;
    isUser: boolean;
}

const ChatGpt: FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const getResponse = async (text: string): Promise<string> => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/generatecontent/',
                { prompt: text },
                { headers: { 'Content-Type': 'application/json' } }
            );
            return response.data.response || 'No response from server';
        } catch (error) {
            console.error('Error:', error);
            return 'An error occurred';
        }
    };

    const handleSend = async (text: string) => {
        // Add the user's message to the chat
        const userMessage: Message = {
            id: messages.length + 1,
            text: text,
            isUser: true,
        };
        setMessages((prev) => [...prev, userMessage]);

        // Get the bot's response and add it to the chat
        const botText = await getResponse(text);
        const botResponse: Message = {
            id: messages.length + 2,
            text: botText,
            isUser: false,
        };

        setMessages((prev) => [...prev, botResponse]);
    };

    return (
        <div className="flex flex-col h-screen">
            <h1 className="text-3xl font-bold text-center text-blue-600 p-4">
                Chat with Gemini </h1>
            <MessageDisplay messages={messages} />
            <InputComponent onSend={handleSend} />
        </div>
    );
};

export default ChatGpt;
