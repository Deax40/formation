export default function CGVPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Conditions Générales de Vente
          </h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Objet</h2>
              <p className="text-gray-700 leading-relaxed">
                Les présentes Conditions Générales de Vente (ci-après « CGV ») ont pour objet de définir les modalités et conditions de vente des formations proposées sur ce site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Prix</h2>
              <p className="text-gray-700 leading-relaxed">
                Les prix des formations sont indiqués en euros TTC. L'éditeur du site se réserve le droit de modifier les prix à tout moment, mais les formations seront facturées sur la base du tarif en vigueur au moment de la validation de la commande.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Commande</h2>
              <p className="text-gray-700 leading-relaxed">
                Toute commande passée sur le site vaut acceptation pleine et entière des présentes CGV. L'acheteur reçoit une confirmation de commande par e-mail récapitulant les éléments essentiels.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Paiement</h2>
              <p className="text-gray-700 leading-relaxed">
                Le paiement s'effectue en ligne via un prestataire de paiement sécurisé. Aucune donnée bancaire n'est conservée par l'éditeur du site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Accès aux formations</h2>
              <p className="text-gray-700 leading-relaxed">
                L'accès aux formations est accordé à titre personnel et non cessible, après confirmation du paiement. L'acheteur s'engage à ne pas partager ses identifiants de connexion avec des tiers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Droit de rétractation</h2>
              <p className="text-gray-700 leading-relaxed">
                Compte tenu de la nature numérique des contenus, l'acheteur reconnaît qu'il perd son droit de rétractation dès l'accès au contenu de la formation, sauf disposition légale contraire.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Propriété intellectuelle</h2>
              <p className="text-gray-700 leading-relaxed">
                L'ensemble des contenus des formations (textes, vidéos, supports, etc.) est protégé par le droit d'auteur. Toute reproduction, diffusion ou revente est strictement interdite sans autorisation écrite préalable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Données personnelles</h2>
              <p className="text-gray-700 leading-relaxed">
                Les données collectées lors de la commande sont utilisées pour le traitement de celle-ci et la gestion de la relation client. L'acheteur dispose d'un droit d'accès, de rectification et de suppression de ses données, conformément à la réglementation applicable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Responsabilité</h2>
              <p className="text-gray-700 leading-relaxed">
                L'éditeur du site ne saurait être tenu responsable des dommages indirects qui pourraient survenir du fait de l'utilisation des formations. L'acheteur reste seul responsable de la mise en œuvre des connaissances acquises.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Droit applicable et litiges</h2>
              <p className="text-gray-700 leading-relaxed">
                Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux compétents seront saisis.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600 text-sm">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
