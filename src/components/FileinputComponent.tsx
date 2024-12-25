import React, { useState } from 'react';

interface FileInputComponentProps {
    onFileChange: (file: File) => void;
    onSend: (text: string) => Promise<void>;
}

const FileInputComponent: React.FC<FileInputComponentProps> = ({ onFileChange, onSend }) => {
    const [text, setText] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileChange(file); // Notify parent of file change
        }
    };

    const handleSendClick = async () => {
        if (text.trim()) {
            await onSend(text.trim()); // Send text to the parent
            setText(''); // Clear input field
        }
    };

    return (
        <div className="fixed bottom-10 left-10 right-10  p-4 rounded-lg">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="file"
                        id="file-upload"
                        onChange={handleFileChange}
                        className="block w-1/4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter your prompt"
                        className="flex-1 block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <button
                        type="button"
                        onClick={handleSendClick}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FileInputComponent;
