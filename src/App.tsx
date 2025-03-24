import React, { useState } from 'react';
import { X, Video, Calendar, Clock, MapPin } from 'lucide-react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    ville: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Création des données à envoyer au format JSON
      // S'assurer qu'aucune valeur n'est null ou undefined
      const reservationDetails = {
        nom: formData.nom || "",
        prenom: formData.prenom || "",
        email: formData.email || "",
        telephone: formData.telephone || "",
        ville: formData.ville || "",
        content: "Réservation d'événement", // Ajout d'un champ content explicite
        timestamp: new Date().toISOString() // Ajouter un timestamp pour traçabilité
      };

      console.log('Envoi des données:', JSON.stringify(reservationDetails));

      const webhookResponse = await fetch(
        'https://n8n-7qm2.onrender.com/webhook/d651a66a-df31-497c-b5fa-9bb4fe5a47e1', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reservationDetails)
        }
      );

      // Vérification de la réponse
      if (!webhookResponse.ok) {
        throw new Error(`Erreur HTTP: ${webhookResponse.status}`);
      }

      // Essayez de récupérer la réponse en JSON d'abord
      let responseData;
      const contentType = webhookResponse.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await webhookResponse.json();
        console.log('Réponse JSON du webhook:', responseData);
      } else {
        // Sinon, récupérez en format texte
        responseData = await webhookResponse.text();
        console.log('Réponse texte du webhook:', responseData);
      }

      // Réinitialisation et affichage du message de confirmation
      setIsModalOpen(false);
      setShowConfirmation(true);
      setFormData({ nom: '', prenom: '', email: '', telephone: '', ville: '' });
    } catch (webhookError) {
      console.error('Erreur lors de l\'envoi au webhook:', webhookError);
      alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div 
        className="relative hero-gradient text-white py-16 md:py-24 lg:py-32"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight tracking-tight">
            VIVRE LA <br className="hidden md:block"/>RESTAURATION
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 font-light max-w-3xl mx-auto leading-relaxed px-4">
            Un moment exclusif dédié à la résilience, la guérison intérieure et la transformation personnelle.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 lg:gap-16 mb-8 md:mb-16">
            <div className="flex items-center justify-center gap-3 bg-white/10 px-4 md:px-6 py-3 rounded-full backdrop-blur-sm">
              <Calendar className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-lg md:text-xl font-medium">15 AVRIL</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white/10 px-4 md:px-6 py-3 rounded-full backdrop-blur-sm">
              <Clock className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-lg md:text-xl font-medium">11H - 15H</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white/10 px-4 md:px-6 py-3 rounded-full backdrop-blur-sm">
              <MapPin className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-lg md:text-xl font-medium">PARIS</span>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="shine-effect bg-white text-teal-700 px-8 md:px-16 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl hover:bg-teal-50 transition-all transform hover:scale-105 shadow-xl mx-4 md:mx-0 w-full md:w-auto"
          >
            Réserver votre place - 20€
          </button>
        </div>
      </div>

      {/* Programme Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center text-gray-800">Programme de la journée</h2>
          <div className="space-y-6 md:space-y-8">
            {[
              {
                title: "Séance interactive de partage d'expérience",
                description: "Chaque personne peut partager brièvement un moment de leur vie où ils ont expérimenté un processus de restauration, et comment cela les a transformés."
              },
              {
                title: "Atelier d'introspection et de guérison",
                description: "Un moment de guérison intérieure, de réflexion personnelle et de réconciliation avec soi-même."
              },
              {
                title: "Session de prière",
                description: "Chaque personne peut se faire prier individuellement pour une restauration spécifique (relationnelle, émotionnelle, etc.)"
              },
              {
                title: "Temps de réflexion en petits groupes",
                description: "Réfléchir sur leur propre processus de restauration en utilisant des outils pratiques."
              },
              {
                title: "Moment de partage des outils pratiques",
                description: "Temps de convivialité et de fraternité pour échanger sur les outils de restauration."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-start gap-4 md:gap-6 card-hover">
                <div className="text-3xl md:text-4xl text-teal-600">✨</div>
                <div>
                  <h3 className="font-semibold text-xl md:text-2xl mb-2 md:mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-teal-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">Notre Mission</h2>
            <p className="text-lg md:text-xl mb-12 md:mb-16 leading-relaxed px-4">
              L'objectif est d'aider les jeunes confrontés à des traumatismes, addictions ou défis de vie, 
              en vous offrant un espace de partage et de reconstruction dans un cadre chaleureux. 
              Nous croyons en la puissance de la guérison collective et du soutien mutuel.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3]">
                <img 
                  src="https://imgur.com/CQwnApm.jpeg" 
                  alt="Espace de partage" 
                  className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3]">
                <img 
                  src="https://imgur.com/9Ajdbc9.jpeg" 
                  alt="Soutien mutuel" 
                  className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center flex items-center justify-center gap-4">
            <Video className="w-8 h-8 md:w-12 md:h-12 text-teal-600" />
            Aperçu de l'événement
          </h2>
          <div className="aspect-video bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            <iframe
              src="https://streamable.com/e/ejxh3l?src=player-page-share"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-10 max-w-md w-full mx-4 md:mx-auto">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Réservation</h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="space-y-4 md:space-y-6">
                {[
                  { label: "Nom", type: "text", value: formData.nom, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, nom: e.target.value}) },
                  { label: "Prénom", type: "text", value: formData.prenom, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, prenom: e.target.value}) },
                  { label: "Email", type: "email", value: formData.email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value}) },
                  { label: "Téléphone", type: "tel", value: formData.telephone, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, telephone: e.target.value}) },
                  { label: "Ville", type: "text", value: formData.ville, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, ville: e.target.value}) }
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-base md:text-lg"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                ))}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-600 text-white py-4 px-6 rounded-xl hover:bg-teal-700 transition-colors font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Confirmer la réservation'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Message */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 md:p-10 max-w-md w-full mx-4 md:mx-auto text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Réservation confirmée !</h3>
            <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
              Votre réservation a été enregistrée avec succès. 
              Une personne vous contactera très prochainement pour finaliser votre inscription.
            </p>
            <button
              onClick={() => setShowConfirmation(false)}
              className="bg-teal-600 text-white py-3 md:py-4 px-8 md:px-10 rounded-xl hover:bg-teal-700 transition-colors font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;