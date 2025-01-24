import { useState } from "react";
import ModalGallery from "./ModalGallery";

const EventsGallery = ({ events }) => {
    const [selectedGallery, setSelectedGallery] = useState(null);

    return (
        <>
            <ModalGallery
                isOpen={!!selectedGallery}
                onClose={() => setSelectedGallery(null)}
                images={selectedGallery || []}
            />
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-screen-xl mx-auto"
            >
                {
                    events
                        .sort((a, b) => a.data.id - b.data.id)
                        .map((evento, index) => {
                            const isEven = index % 2 === 0;
                            const cardClass = isEven
                                ? "flex flex-col items-center p-8 rounded-lg shadow-lg bg-arena text-white"
                                : "flex flex-col items-center p-8 rounded-lg shadow-lg bg-white text-arena";

                            const iconColorClass = isEven
                                ? "text-white"
                                : "text-arena";
                            const { data } = evento;
                            const { id, img, title, description, gallery } = data;
                            return (
                                <div key={id} className={cardClass}>
                                    <div 
                                        className="border-4 border-primary overflow-hidden cursor-pointer"
                                        style={{
                                            width: "100%",
                                            maxWidth: "256px",
                                            aspectRatio: "1", // Asegura una relación 1:1 para un cuadrado perfecto
                                            margin: "0 auto",
                                        }}
                                        onClick={() => setSelectedGallery(gallery)}
                                    >
                                        <img
                                            src={img.src}
                                            alt={title}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <h2 className="text-lg font-bold mt-4">
                                        {title}
                                    </h2>
                                    <p className="text-center">{description}</p>
                                    <button
                                        onClick={() => setSelectedGallery(gallery)}
                                        className={`text-2xl mt-4 ${iconColorClass} hover:text-hoverRosa`}
                                    >
                                        <i className="fas fa-images" />
                                    </button>
                                </div>
                            );
                        })
                    }   
                </div>
        </>
    );
};

export default EventsGallery;
