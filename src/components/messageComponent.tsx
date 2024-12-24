import { FC, useEffect, useRef } from 'react';

interface Message {
    id: number;
    text: string;
    isUser: boolean;
}

const MessageDisplay: FC<{ messages: Message[] }> = ({ messages }) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    // Automatically scroll to the bottom whenever messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100 dark:bg-gray-900 space-y-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                    <div
                        className={`max-w-lg p-4 rounded-lg shadow-md break-words ${
                            message.isUser
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-gray-300 text-black dark:bg-gray-700 dark:text-white rounded-bl-none'
                        }`}
                    >
                        {message.text}
                    </div>
                </div>
            ))}
            <div ref={bottomRef}></div>
        </div>
    );
};





export default MessageDisplay;
