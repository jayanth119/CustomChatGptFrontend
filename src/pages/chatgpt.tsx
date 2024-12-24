import { FC, useState } from 'react';
import InputComponent from '../components/inputComponent';
import MessageDisplay  from '../components/messageComponent';

interface Message {
    id: number;
    text: string;
    isUser: boolean;
}

const ChatGpt: FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSend = (text: string) => {
        const userMessage: Message = {
            id: messages.length + 1,
            text,
            isUser: true,
        };
        setMessages((prev) => [...prev, userMessage]);

        // Simulate bot response
        setTimeout(() => {
            const botResponse: Message = {
                id: messages.length + 2,
                text: 'This is a bot response.',
                isUser: false,
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-screen">
            <MessageDisplay messages={messages} />
            <InputComponent onSend={handleSend} />
        </div>
    );
};

export default ChatGpt;
