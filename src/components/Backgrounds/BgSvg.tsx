const BackgroundSection = () => {
  return (
    
    // 'bg-repeat' asegura que el patrón cubra todo el espacio
    // 'bg-fixed' hace que el fondo no se mueva al hacer scroll (opcional)
    <div className="opacity-30 absolute inset-0 -z-10 bg-topography bg-repeat bg-center bg-[length:400px_400px]">
      <div className="absolute inset-0 flex items-center justify-center ">
        <svg width="1500" height="600" viewBox="0 0 1440 387" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 354.5V314.5L180 281V321L21 354.5Z" fill="#81E9FF"/>
          <path d="M0 387V347.5L314.5 280V320L0 387Z" fill="#0C00FA" fillOpacity="0.5"/>
          <path d="M1125 107V67.5L1439.5 0V40L1125 107Z" fill="#0C00FA" fillOpacity="0.5"/>
        </svg>

      </div>
    </div>
    
  );
};

export default BackgroundSection;