import { useState } from "react";

const ModalGallery = ({ isOpen, onClose, images }) => {
    const [loadedImages, setLoadedImages] = useState({});

    const handleImageLoad = (index) => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }));
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div className="bg-primary p-4 rounded-lg w-full max-w-5xl max-h-screen flex justify-center items-center overflow-y-auto animate-blurred-fade-in">
                <div className="grid grid-cols-2 gap-4 w-full">
                    {images.map((image, index) => {
                        const isLoaded = loadedImages[index];

                        return (
                            <div
                                key={index}
                                className="relative w-full h-80 flex justify-center items-center"
                            >
                                {/* Placeholder con animación de carga */}
                                {!isLoaded && (
                                    <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-md"></div>
                                )}

                                {/* Imagen con efecto de fade-in */}
                                <img
                                    src={image.src}
                                    alt={`Galería ${index}`}
                                    className={`object-cover w-full h-full rounded-md transition-opacity duration-500 ${
                                        isLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                    onLoad={() => handleImageLoad(index)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ModalGallery;
