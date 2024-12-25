import { useState } from "react";

const StoriesGallery = ({ galleries }) => {
  const [selectedGallery, setSelectedGallery] = useState(null); // Galería seleccionada
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice de la imagen actual

  // Cerrar modal
  const closeModal = () => {
    setSelectedGallery(null);
    setCurrentImageIndex(0);
  };

  // Avanzar a la siguiente imagen
  const nextImage = () => {
    if (selectedGallery && currentImageIndex < selectedGallery.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      closeModal(); // Cierra el modal si es la última imagen
    }
  };

  // Retroceder a la imagen anterior
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Contenedor de burbujas */}
      <div className="flex gap-4 overflow-x-auto py-4">
        {galleries.map((gallery, index) => (
          <div key={index} className="flex flex-col items-center">
            <button
              className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden border-4 border-primary"
              onClick={() => {
                setSelectedGallery(gallery);
                setCurrentImageIndex(0); // Reinicia a la primera imagen
              }}
            >
              <img
                src={gallery.cover.src}
                alt={`Galería ${index}`}
                className="object-cover w-full h-full"
              />
            </button>
            {/* Nombre de la galería */}
            <p className="mt-2 text-sm text-white">{gallery.name}</p>
          </div>
          
        ))}
      </div>
      {/* Modal de galería */}
      {selectedGallery && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal} // Cierra el modal al hacer clic fuera del contenido
        >
          <div
            className="relative bg-white p-4 rounded-lg max-w-screen-md w-full"
            onClick={(e) => e.stopPropagation()} // Evita que clics dentro cierren el modal
          >
            {/* Imagen actual */}
            <div className="relative w-full max-h-[80vh] rounded-md flex">
              {/* Área izquierda (retroceso) */}
              <div
                className="absolute top-0 left-0 h-full w-1/2 cursor-pointer"
                onClick={prevImage}
              ></div>
  
              {/* Imagen */}
              <img
                src={selectedGallery.images[currentImageIndex]}
                alt={`Imagen ${currentImageIndex + 1}`}
                className="object-contain w-full max-h-[80vh] rounded-md pointer-events-none"
              />
  
              {/* Área derecha (avanzar) */}
              <div
                className="absolute top-0 right-0 h-full w-1/2 cursor-pointer"
                onClick={nextImage}
              ></div>
            </div>
  
            {/* Botón de cerrar */}
            <button
              className="absolute top-2 right-2 text-red-500 text-2xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default StoriesGallery;