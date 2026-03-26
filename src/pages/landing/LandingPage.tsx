import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, CheckCircle, Contact } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@types";
import { LanguageSwitcher } from "@components/LanguageSwitcher";
import { PrimaryButton, SecondaryButton } from "@components/Buttons";
import BackgroundBlobs from "@components/Backgrounds/BgSvg";
import Opinion from "@components/Opinions/Opinion";
import ContactForm from "@components/Contact/Contact";
import Footer from "@components/layout/Footer";


// Landing Navbar Component
function LandingNavbar() {
  const { isOnTenantSubdomain } = useSelector(
    (state: RootState) => state.tenant,
  );
  const { lang } = useParams<{ lang?: string }>();

  const getPath = (path: string) => lang ? `/${lang}${path}` : `/en${path}`;
  if (isOnTenantSubdomain) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <header className=" sticky top-0 z-40">
      <div className=" bg-white/60  flex items-center justify-between px-4 lg:px-6 py-3 
      rounded-b-2xl  backdrop-blur-sm">
        {/* Logo */}
        <Link to={getPath("/")} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SSD</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Saas Damian</h1>
        </Link>



        {/* Right side - Actions */}
        <div className="items-center  hidden md:flex gap-x-4 pl-36 scroll-auto">
            <a href="#home" className="hover:opacity-80 transition-opacity">
              <SecondaryButton >Home</SecondaryButton>
            </a>
            <a href="#precios" className="hover:opacity-80 transition-opacity">
              <SecondaryButton>Precios</SecondaryButton>
            </a>
            <a href="#opinions" className="hover:opacity-80 transition-opacity">
              <SecondaryButton>Opiniones</SecondaryButton>
            </a>
            <a href="#contacto" className="hover:opacity-80 transition-opacity">
              <SecondaryButton>Contáctanos</SecondaryButton>
            </a>

        </div>
        <div className="flex items-center gap-3 ">
          <Link to={getPath("/auth")} className="text-foreground font-medium hover:bg-muted px-4 py-2 rounded-md transition-colors">
            Iniciar Sesion
          </Link>
          
          <Link to={getPath("/auth")}>
            <PrimaryButton>Registro</PrimaryButton>
          </Link>
          {lang && <LanguageSwitcher />}
        </div>
      </div>
    </header>
  );
}

// Main Landing Page Component
export default function LandingPage() {
  const { lang } = useParams<{ lang?: string }>();
  
  const getPath = (path: string) => lang ? `/${lang}${path}` : `/en${path}`;

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Also check on mount in case there's a hash in the URL
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  interface Feature {
    id: number;
    name: string;
    description: string;
  }
  const features: Feature[] = [
    {
      id: 1,
      name: "Gestión de Clientes",
      description: "Gestiona tus clientes de manera eficiente"
    },
    {
      id: 2,
      name: "Seguimiento de Proyectos",
      description: "Monitorea el progreso de tus proyectos en tiempo real"
    },
    {
      id: 3,
      name: "Colaboración en Equipo",
      description: "Fomenta la colaboración entre miembros del equipo"
    },
    {
      id: 4,
      name: "Control de Inventario",
      description: "Mantén un control preciso de tu inventario"
    },
    {
      id: 5,
      name: "Programación de Citas",
      description: "Programa y gestiona tus citas de manera eficiente"
    },
    {
      id: 6,
      name: "Facturación y Emisión de Facturas",
      description: "Crea y emite facturas de forma rápida y sencilla"
    }
  ];

  return (
    <div className="relative min-h-screen ">
      <BackgroundBlobs /> 
      <LandingNavbar />
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 lg:py-24">
        
        <div className="max-w-6xl mx-auto text-center">

         {/* Hero Section Modern SaaS */}
        <div id="home" className="scroll-mt-32 flex flex-col items-center justify-center text-center gap-6 py-12">
            
            
            <div className="inline-flex items-center gap-2  text-sm font-medium mb-4
             bg-blue-50 border border-blue-200 text-blue-700 rounded-full px-4 py-1">
                <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                Descubre la nueva versión 2.0
            </div>

            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground tracking-tight max-w-4xl">
                Maneja tu Negocio <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-500">
                    Todo en un lugar
                </span>
            </h1>

            {/* 3. Sub */}
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mt-4">
                Simplifica la gestión de tu negocio con nuestra plataforma todo en uno. 
                Desde CRM hasta facturación, tenemos las herramientas que necesitas para escalar tu empresa.
            </p>

            {/* 4. Boton  of accion */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to={getPath("/auth")}>
                    <PrimaryButton className="flex items-center gap-2 text-lg px-8 py-4 shadow-lg shadow-primary/30 hover:-translate-y-1 transition-transform">
                        Comenzar Gratis
                        <ArrowRight className="w-5 h-5" />
                    </PrimaryButton>
                </Link>
                <a href="#funciones">
                    <SecondaryButton className="text-lg px-8 py-4 border-2 border-border text-foreground hover:bg-muted  transition-colors rounded-lg">
                        Ver Funciones
                    </SecondaryButton>
                </a>
            </div>

          {/* 5. (Imagen de tu app)  Aca van los screenshots */}
          <div className="w-full max-w-5xl mt-16 p-2 lg:p-4 rounded-2xl bg-gradient-to-b from-border to-transparent">
              <div className="rounded-xl overflow-hidden border border-border bg-card shadow-2xl flex items-center justify-center h-64 lg:h-[500px]">
                  {/* aca pones los <img src="..." /> con la captura del app */}
                  <p className="text-muted-foreground font-medium">
                      [ Aquí va una imagen espectacular de tu panel de control ]
                  </p>
              </div>
          </div>
      </div>
          


          {/* Features Grid */}
          <div id="funciones" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 justify-center">
            <h1 className="col-span-full text-4xl lg:text-6xl font-bold text-foreground mb-6 text-center">
              Nuestras
              <span className="text-primary block">Funciones</span>
            </h1>
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center gap-2 p-4 rounded-lg bg-card border border-border
                transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-foreground font-medium">{feature.name}</span>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        <Opinion />
            <h1 className=" p-4 col-span-full text-4xl lg:text-6xl font-bold text-foreground mb-6 text-center">
              Nuestros
              <span className="text-primary block">Valores</span>
            </h1>
        {/* prices */}
        <div id="precios" className="scroll-mt-32 max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Planes simples y <span className="text-primary">Transparentes</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a las necesidades de tu negocio. Sin costos ocultos.
            </p>
          </div>

          {/* target container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
            
            {/* 1. PLAN BASIC  */}
            <div className="bg-card border border-border rounded-2xl p-8 flex flex-col shadow-sm h-full">
              <h3 className="text-2xl font-bold text-foreground mb-2">Básico</h3>
              <p className="text-muted-foreground mb-6">Ideal para comenzar a organizar tu negocio paso a paso.</p>
              
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-foreground">$5.000</span>
                <span className="text-muted-foreground font-medium"> CLP / mes</span>
              </div>
              
              {/* Lista de funciones */}
              <ul className="flex flex-col gap-4 mb-8 flex-1">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-muted-foreground shrink-0" /> 
                  <span className="text-foreground">Funcion Uno</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-muted-foreground shrink-0" /> 
                  <span className="text-foreground">Funcion Dos</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground opacity-50">
                  <CheckCircle className="w-5 h-5 shrink-0" /> 
                  <span>Funcion que no hace y la otra si</span>
                </li>
              </ul>
              
              
              <button className="w-full py-3 rounded-lg border-2 border-border font-bold text-foreground hover:bg-muted transition-colors">
                Elegir Básico
              </button>
            </div>

            {/* 2. PLAN PREMIUM */}
            
            <div className="relative bg-card border-2 border-primary rounded-2xl p-8 flex flex-col shadow-xl shadow-primary/10 md:scale-105 z-10 h-full">
              
              
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold tracking-wide shadow-md">
                MÁS POPULAR
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-2">Profesional</h3>
              <p className="text-muted-foreground mb-6">Herramientas avanzadas para escalar tus ventas al máximo.</p>
              
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-foreground">$10.000</span>
                <span className="text-muted-foreground font-medium"> CLP / mes</span>
              </div>
              
              {/* List of functions */}
              <ul className="flex flex-col gap-4 mb-8 flex-1">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" /> 
                  <span className="text-foreground font-medium">Todo lo del plan Básico</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" /> 
                  <span className="text-foreground font-medium">funcion avanzada 1</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" /> 
                  <span className="text-foreground font-medium">funcion avanzada 2</span>
                </li>
              </ul>
              
              
              <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/30">
                Comenzar con Profesional
              </button>
            </div>

          </div>
        </div>
        
        <ContactForm className="mt-10" />

      </main>


      {/* Footer */}
      <footer className="">
        <div className="">
          <Footer />

        </div>
      </footer>
    </div>
  );
}