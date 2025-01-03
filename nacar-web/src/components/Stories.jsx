import { useState, useEffect } from "react";

const StoriesGallery = ({ galleries }) => {
  const [selectedGallery, setSelectedGallery] = useState(null); // Galería seleccionada
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice de la imagen actual
  const [autoAdvanceInterval, setAutoAdvanceInterval] = useState(null); // Intervalo de avance automático

  // Cerrar modal
  const closeModal = () => {
    setSelectedGallery(null);
    setCurrentImageIndex(0);
    clearInterval(autoAdvanceInterval); // Detener avance automático
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

  // Iniciar avance automático
  useEffect(() => {
    if (selectedGallery) {
      const interval = setInterval(() => {
        nextImage();
      }, 3000); // Cambia de imagen cada 3 segundos
      setAutoAdvanceInterval(interval);

      return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }
  }, [selectedGallery, currentImageIndex]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Contenedor de burbujas */}
      <div className="flex gap-4 overflow-x-auto py-4">
        {galleries.map((gallery, index) => (
          <div key={index} className="flex flex-col items-center">
            <button
              className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden border-4 border-primary"
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
  <div className="relative bg-white p-4 rounded-lg max-w-screen-md w-full"
      onClick={(e) => e.stopPropagation()} // Evita que clics dentro cierren el modal
    >
      {/* Indicadores de progreso */}
      <div className="absolute top-0 left-0 w-full flex gap-1 p-2">
        {selectedGallery.images.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 bg-gray-300 rounded ${index <= currentImageIndex ? "bg-primary" : ""}`}
          ></div>
        ))}
      </div>
      <button
         className="justify-left text-4xl font-extrabold text-arena hover:text-red-700 transition-all transform hover:scale-105"
        onClick={closeModal}
      >
        ×
      </button>

      {/* Imagen actual */}
      <div className="relative w-full max-h-[80vh] rounded-md flex">
        {/* Área izquierda (retroceso) */}
        <div
          className="absolute top-0 left-0 h-full w-1/2 cursor-pointer"
          onClick={prevImage}
        ></div>


        {/* Imagen */}
        <img
          src={selectedGallery.images[currentImageIndex].src}
          alt={`Imagen ${currentImageIndex + 1}`}
          className="object-contain w-full max-h-[80vh] rounded-md pointer-events-none"
        />

        {/* Área derecha (avanzar) */}
        <div
          className="absolute top-0 right-0 h-full w-1/2 cursor-pointer"
          onClick={nextImage}
        ></div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default StoriesGallery;
