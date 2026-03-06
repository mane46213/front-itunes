import { Link } from 'react-router-dom';
import { Zap, Shield, Mail, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full">
              <span className="text-primary-500 text-sm font-semibold">Plateforme officielle</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Rechargez iTunes
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-500 via-secondary to-primary-600 bg-clip-text text-transparent">
                en quelques clics
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              Depuis la Côte d'Ivoire, achetez vos cartes iTunes et recevez vos codes
              instantanément par email. Paiement sécurisé via Mobile Money.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/boutique"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105"
              >
                Acheter maintenant
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#comment-ca-marche"
                className="inline-flex items-center justify-center border-2 border-primary-500/30 text-primary-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-500/10 transition-all duration-300"
              >
                Comment ça marche ?
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 hover:scale-105">
              <div className="bg-primary-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Livraison instantanée</h3>
              <p className="text-gray-400 leading-relaxed">
                Recevez vos codes iTunes par email dans les 5 à 30 minutes après validation
                de votre paiement.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 hover:scale-105">
              <div className="bg-primary-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Paiement local sécurisé</h3>
              <p className="text-gray-400 leading-relaxed">
                Payez facilement avec Orange Money, MTN MoMo, Wave ou Moov Money.
                100% sécurisé.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 hover:scale-105">
              <div className="bg-primary-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Service fiable</h3>
              <p className="text-gray-400 leading-relaxed">
                Des milliers de clients satisfaits. Support client disponible pour vous
                accompagner.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="comment-ca-marche" className="py-20 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-gray-400 text-lg">Simple, rapide et sécurisé en 3 étapes</p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-6 bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-2xl border border-primary-500/20">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Choisissez votre carte</h3>
                <p className="text-gray-400 leading-relaxed">
                  Sélectionnez le montant de la carte iTunes qui vous convient (25$, 50$, 100$ ou plus)
                  et remplissez vos informations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-2xl border border-primary-500/20">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Payez avec Mobile Money</h3>
                <p className="text-gray-400 leading-relaxed">
                  Effectuez le paiement via Orange Money, MTN MoMo, Wave ou Moov Money et
                  saisissez votre numéro de transaction.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-2xl border border-primary-500/20">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Recevez votre code par email</h3>
                <p className="text-gray-400 leading-relaxed">
                  Une fois votre paiement validé, vous recevrez votre code iTunes directement
                  par email dans les 5 à 30 minutes.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/boutique"
              className="inline-flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105"
            >
              Commencer maintenant
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
