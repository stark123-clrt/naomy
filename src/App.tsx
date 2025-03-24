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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Envoi direct au webhook
      const webhookUrl = 'https://ondiyochristian.app.n8n.cloud/webhook/51346204-081a-4ad5-a1e0-c41927b10241';
      
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'no-cors'
      });

      // Réinitialiser le formulaire et afficher la confirmation
      setIsModalOpen(false);
      setShowConfirmation(true);
      setFormData({ nom: '', prenom: '', email: '', telephone: '', ville: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section avec image de fond */}
      <div 
        className="relative bg-teal-700 text-white py-24"
        style={{
          backgroundImage: 'linear-gradient(rgba(13, 148, 136, 0.9), rgba(13, 148, 136, 0.9)), url("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6 leading-tight">Conférence sur la Santé Mentale</h1>
          <p className="text-2xl mb-8 font-light">Animée par Naomy benon</p>
          <div className="flex justify-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              <span className="text-xl">15 AVRIL</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6" />
              <span className="text-xl">11H - 15H</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              <span className="text-xl">PARIS</span>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-teal-700 px-12 py-4 rounded-full font-bold text-lg hover:bg-teal-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Réserver votre place - 20€
          </button>
        </div>
      </div>

      {/* Section Présentation */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Prenez soin de votre santé mentale</h2>
            <p className="text-lg text-gray-600 mb-6">
              Rejoignez-nous pour une conférence transformative sur la santé mentale. 
              Découvrez des outils pratiques et des perspectives nouvelles pour améliorer 
              votre bien-être psychologique.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1602192509154-0b900ee1f851?q=80&w=600" 
                  alt="Méditation" 
                  className="rounded-lg mb-3 w-full h-40 object-cover"
                />
                <h3 className="font-semibold text-gray-800">Méditation guidée</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600" 
                  alt="Thérapie de groupe" 
                  className="rounded-lg mb-3 w-full h-40 object-cover"
                />
                <h3 className="font-semibold text-gray-800">Partage d'expériences</h3>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=800" 
              alt="Bien-être mental" 
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="container mx-auto px-4 py-16 bg-white rounded-2xl shadow-lg my-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <Video className="w-8 h-8 text-teal-600" />
            Aperçu de l'événement
          </h2>
          <div className="aspect-video bg-gray-100 rounded-xl shadow-inner overflow-hidden">
            <iframe
              src="https://streamable.com/e/ejxh3l?src=player-page-share&autoplay=1"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Réservation</h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    value={formData.nom}
                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    value={formData.prenom}
                    onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    value={formData.telephone}
                    onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    value={formData.ville}
                    onChange={(e) => setFormData({...formData, ville: e.target.value})}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors font-semibold text-lg"
              >
                Confirmer la réservation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Message */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Réservation confirmée !</h3>
            <p className="text-gray-600 mb-6">
              Votre réservation a été enregistrée avec succès. 
              Une personne vous contactera très prochainement pour finaliser votre inscription.
            </p>
            <button
              onClick={() => setShowConfirmation(false)}
              className="bg-teal-600 text-white py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
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