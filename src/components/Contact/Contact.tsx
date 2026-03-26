import React from "react";



type ContactProps = {
  className?: string;
};

function ContactForm({ className }: ContactProps) {
    
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    {/* to control de error of the form */}
    const [errorName, setErrorName] = React.useState("");
    const [errorEmail, setErrorEmail] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        if (newName.trim() !== "") {
            setErrorName(""); 
        } else {
            setErrorName("Este texto es obligatorio");
        }
    }
    const ControlChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        
        // this is de form of a standard email, if the text does not fit in this mold, we show an error
        const StandartEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value.trim() === "") {
            setErrorEmail("El correo es obligatorio");
        } else if (!StandartEmail.test(value)) {
            
            setErrorEmail("Por favor, ingresa un correo válido (ej: tu@email.com)");
        } else {
            setErrorEmail("");
        }
    };
    const ControlChangeMesagge = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setMessage(value);

        if (value.trim() === "") {
            setErrorMessage("El mensaje es obligatorio");
        } else if (value.trim().length < 10) {
            setErrorMessage("Tu mensaje debe tener al menos 10 caracteres");
        } else {
            setErrorMessage("");
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        var isError = false;
        e.preventDefault();
        if (name.trim() === "") {
            setErrorName("Este texto es obligatorio");
            return; 
        }
        if (email.trim() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { 
            setErrorEmail("Revisa tu correo"); isError = true; 
        }
        if (message.trim().length < 10) { setErrorMessage("Mensaje muy corto"); isError = true; }

        if (isError) return;

        {/* here can add the logic to send the form data to your backend or an email service */}
        console.log("Formulario enviado:", { name, email, message });

    };

    return (
        
            <div id="contacto">
                <form 
                    onSubmit={handleSubmit}
                    className={`flex flex-col gap-4 max-w-md mx-auto ${className ?? ""}`}
                >
                    <h1 className=" p-4 col-span-full text-4xl lg:text-6xl font-bold text-foreground mb-6 text-center">
                        ¿Tienes alguna consulta?
                        <span className="text-primary block">Consultanos!</span>
                    </h1>
                    
                    {/* Name */}
                    <input 
                        value={name} 
                        onChange={handleChangeName}
                        type="text" 
                        placeholder="Tu nombre completo" 
                        className="border border-border rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground" 
                    />
                    {/* if errorName is not empty put the text errorName in screen   */}
                    {errorName && (
                        <span className="text-red-500 text-sm font-medium">{errorName}</span>
                    )}

                    
                    {/* Email */}
                    <input 
                        value={email} 
                        onChange={ControlChangeEmail}
                        type="email" 
                        placeholder="Tu correo electrónico" 
                        className="border border-border rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground " 
                    />
                   {errorEmail && (
                        <span className="text-red-500 text-sm font-medium">{errorEmail}</span>
                    )}
                    {/* Message */}
                    <textarea 
                        value={message}
                        onChange={ControlChangeMesagge}
                        placeholder="Escribe tu consulta o mensaje aquí..." 
                        className="border border-border rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground min-h-[160px] resize-y"
                    ></textarea>
                    <div className="flex justify-between mt-1">
                        <span className="text-red-500 text-sm font-medium">
                            {errorMessage}
                        </span>
                        <span className="text-gray-400 text-xs">
                            {message.length} caracteres
                        </span>
                    </div>

                    {/* Button */}
                    <button 
                        type="submit" 
                        className="bg-primary text-white py-3 rounded-md hover:opacity-90 transition-opacity font-medium mt-2"
                    >
                        Enviar consulta
                    </button>
                </form>
            </div>
       
    );
}

export default ContactForm;