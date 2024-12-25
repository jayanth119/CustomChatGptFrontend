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
        <div className="file-input-component">
            <input
                type="file"
                onChange={handleFileChange}
                className="file-input"
            />
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your prompt"
                className="text-input"
            />
            <button onClick={handleSendClick} className="send-button">
                Send
            </button>
        </div>
    );
};

export default FileInputComponent;
