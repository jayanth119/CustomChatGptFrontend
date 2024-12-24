import { FC, useEffect, useState, useCallback } from 'react';
import InputComponent from '../components/inputComponent';
import MessageDisplay from '../components/messageComponent';
import axios from 'axios';
import Cookies from 'js-cookie';

interface Message {
    id: number;
    text: string;
    isUser: boolean;
}

const ChatGpt: FC = ( ) => {
    const [messages, setMessages] = useState<Message[]>([]);

    // Load messages from cookies on component mount
    useEffect(() => {
        const savedMessages = Cookies.get('messages');
        if (savedMessages) {
            const parsedMessages = JSON.parse(savedMessages);
            console.log('Loaded messages from cookies:', parsedMessages);
            setMessages(parsedMessages);
        }
    }, []);

    // Save messages to cookies whenever they change
    useEffect(() => {
        if (messages.length > 0) {
            Cookies.set('messages', JSON.stringify(messages), { expires: 1 }); // Expires in 1 day
            console.log('Messages saved to cookies:', messages);
        }
    }, [messages]);

    // Fetch response from the backend
    const getResponse = useCallback(async (text: string): Promise<string> => {
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
    }, []);

    // Handle sending user messages and receiving bot responses
    const handleSend = useCallback(
        async (text: string) => {
            const userMessage: Message = {
                id: messages.length > 0 ? messages[messages.length - 1].id + 1 : 1,
                text,
                isUser: true,
            };

            setMessages((prev) => [...prev, userMessage]);

            const botResponse = await getResponse(text);
            const botMessage: Message = {
                id: userMessage.id + 1, // Ensure sequential ID
                text: botResponse,
                isUser: false,
            };

            setMessages((prev) => [...prev, botMessage]);
        },
        [messages, getResponse]
    );

    return (
        <div className="flex flex-col h-screen">
            <h1 className="text-3xl font-bold text-center text-blue-600 p-4">
                Chat with Gemini
            </h1>
            <div className="flex flex-col h-full">
                <MessageDisplay messages={messages} />
                <InputComponent onSend={handleSend} />
            </div>
        </div>
    );
};

export default ChatGpt;
