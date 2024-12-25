import { FC, useEffect, useState, useCallback } from 'react';
import InputComponent from '../components/inputComponent';
import MessageDisplay from '../components/messageComponent';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface Message {
    id: number;
    text: string;
    isUser: boolean;
}

const ChatGpt: FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const location = useLocation();
    const taskType = location.pathname.split('/')[1];  // Extract task from the URL (e.g., "code-genx", "doc-sumex", etc.)

    // Load messages from localStorage on component mount
    useEffect(() => {
        const savedMessages = localStorage.getItem('messages');
        if (savedMessages) {
            const parsedMessages = JSON.parse(savedMessages);
            console.log('Loaded messages from localStorage:', parsedMessages);
            setMessages(parsedMessages);
        }
    }, []);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('messages', JSON.stringify(messages)); // Save messages in localStorage
            console.log('Messages saved to localStorage:', messages);
        }
    }, [messages]);

    // Fetch response from the backend based on task type
    const getResponse = useCallback(async (text: string): Promise<string> => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/${taskType}/`,
                { prompt: text },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log('Response:', response.data);
            return response.data.response || 'No response from server';
        } catch (error) {
            console.error('Error:', error);
            return 'An error occurred';
        }
    }, [taskType]);

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
        <div className="w-full h-full flex flex-col">
            <h1 className="text-3xl font-bold text-center text-blue-600 p-4">
                Chat with Gemini - {taskType}
            </h1>
            <div className="w-full h-full flex flex-col overflow-hidden">
                <div className="flex-grow overflow-y-auto p-4">
                    <MessageDisplay messages={messages} />
                </div>
                <div className="p-4">
                    <InputComponent onSend={handleSend} />
                </div>
            </div>
        </div>

    );
};

export default ChatGpt;
