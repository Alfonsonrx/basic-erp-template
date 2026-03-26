import { Link } from "react-router-dom";
import { Mail } from "lucide-react"; 

export default function Footer() {
    
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border bg-background pt-16 pb-8">
            <div className="container mx-auto px-4 lg:px-6">
                
                {/* principal cuadricule of footer */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  mb-12">
                    
                    {/* Marca y Redes */}
                    <div className=" col-span-2 lg:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">SSD</span>
                            </div>
                            <span className="text-xl font-bold text-foreground">Saas Damian</span>
                        </Link>
                        <p className="text-muted-foreground mb-6 max-w-xs">
                            Simplificando la gestión de tu negocio con herramientas potentes y fáciles de usar. Todo lo que necesitas en un solo lugar.
                        </p>
                       
                     
                    </div>

                    {/* Product */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-foreground mb-2">Producto</h3>
                        <a href="#funciones" className="text-muted-foreground hover:text-primary transition-colors">Características</a>
                        <a href="#precios" className="text-muted-foreground hover:text-primary transition-colors">Precios</a>
                        <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Actualizaciones</Link>
                        <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Guías y Tutoriales</Link>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-foreground mb-2">Compañía</h3>
                        <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Sobre nosotros</Link>
                        <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
                        <a href="#contacto" className="text-muted-foreground hover:text-primary transition-colors">Contacto</a>
                        <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Socios</Link>
                    </div>

                    {/* legal */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-foreground mb-2">Legal</h3>
                        <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Términos de servicio</Link>
                        <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Política de privacidad</Link>
                        <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Política de cookies</Link>
                    </div>
                </div>

                {/*  Copyright */}
                <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground text-center md:text-left">
                        &copy; {currentYear} Saas Damian. Todos los derechos reservados.
                    </p>
                    
                    {/* support */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>tuCorreo@algo.com</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}