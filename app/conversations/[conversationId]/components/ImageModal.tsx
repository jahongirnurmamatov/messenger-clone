'use client';

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps{
    isOpen?:boolean;
    onClose:()=>void;
    src?:string|null;
}

const ImageModal:React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    src
}) => {
    const fallbackSrc = "/images/upload.png";
    return (
        <Modal 
        isOpen={isOpen}
        onClose={onClose}
        >
            <div className="w-80 h-80">
            {src ? (
          <Image
            alt="image"
            className="object-cover"
            fill
            src={src}
          />
        ) : (
          <Image
            alt="fallback image"
            className="object-cover"
            fill
            src={fallbackSrc}
          />
        )}
            </div>
        </Modal>
      );
}
 
export default ImageModal;