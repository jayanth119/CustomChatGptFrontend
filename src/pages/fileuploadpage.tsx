import { FC, useEffect, useState, useCallback } from 'react';
import FileInputComponent  from '../components/FileinputComponent';
import MessageDisplay from '../components/messageComponent';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface Message {
    id: number;
    text: string;
    isUser: boolean;
}

const FilePage: FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null); // Track uploaded file
    const location = useLocation();
    const taskType = location.pathname.split('/')[1];

    useEffect(() => {
        const savedMessages = localStorage.getItem('messages');
        if (savedMessages) {
            const parsedMessages = JSON.parse(savedMessages);
            setMessages(parsedMessages);
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('messages', JSON.stringify(messages));
        }
    }, [messages]);

    const handleFileChange = (file: File) => {
        setUploadedFile(file); // Update the uploaded file
    };

    const handleSend = useCallback(
        async (text: string) => {
            if (!uploadedFile) {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
                        text: "Please upload a file before sending.",
                        isUser: false,
                    },
                ]);
                return;
            }

            const userMessage: Message = {
                id: messages.length > 0 ? messages[messages.length - 1].id + 1 : 1,
                text: `Prompt: ${text}, File: ${uploadedFile.name}`,
                isUser: true,
            };

            setMessages((prev) => [...prev, userMessage]);

            const formData = new FormData();
            formData.append('file', uploadedFile);
            formData.append('prompt', text);

            try {
                const response = await axios.post(
                    `http://127.0.0.1:8000/api/doc-sumex/`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                const botResponse = response.data.response || 'No response from server';
                const botMessage: Message = {
                    id: userMessage.id + 1,
                    text: botResponse,
                    isUser: false,
                };
                setMessages((prev) => [...prev, botMessage]);
            } catch (error) {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: userMessage.id + 1,
                        text: 'An error occurred while processing your request.',
                        isUser: false,
                    },
                ]);
            }
        },
        [messages, uploadedFile]
    );

    return (
        <div className="flex flex-col h-screen">
            <h1 className="text-3xl font-bold text-center text-blue-600 p-4">
                Chat with Gemini - {taskType}
            </h1>
            <div className="flex flex-col h-full overflow-hidden">
                <div className="flex-grow overflow-y-auto p-4">
                    <MessageDisplay messages={messages} />
                </div>
                <div className="p-4">
                    <FileInputComponent onFileChange={handleFileChange} onSend={handleSend} />
                </div>
            </div>
        </div>
    );
};

export default FilePage;
