import React, { useState } from 'react';

const CopyToClipboard = ({ content }:{content:string}) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 1000);  
            });
    };

    return (
        <div className="my-4 font-mono border py-5 px-2
            bg-black text-white text-xs rounded-sm relative dark:text-white dark:border-none whitespace-pre-line">
            <button className="absolute right-0 text-white top-0 px-3 py-[2px] bg-indigo-600"
                    onClick={handleCopy}
            >
                Copy
            </button>
            {content}
            {isCopied && <div className="animate-growAndFade absolute bottom-0 left-0 right-0 bg-green-500  text-white flex items-center justify-center text-base">Copied successfully!</div>}
        </div>
    );
};

export default CopyToClipboard;
