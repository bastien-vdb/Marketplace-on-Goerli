import React from 'react';
import './me.css';

function Me(props) {
    return (
        <div className='mycv text-white'>
            <p className='ml-10 my-4'><span className='text-5xl text-yellow-400'>Je</span> m'appelle <span className='text-yellow-400'>Bastien</span> et je suis <span className='text-yellow-400'>développeur web</span>.</p>
            <p>Après avoir travaillé <span className='text-pink-600'>6 années chez Accenture</span>, une très grande entreprise dans le monde du conseil et des nouvelles technologies, j'ai décidé de créer ma propre entreprise pour aider les start-up à tester leurs idées et à se lancer sur le marché rapidement.</p>

            <p>Je suis spécialisé dans <span className='text-pink-600'>React JS</span>, une technologie puissante qui me permet de créer des interfaces utilisateur de qualité rapidement et facilement. Mon expertise s'étend également au développement de <span className='text-pink-600'>Marketplaces, de Smart contract, de DApps Web 3.0</span>, ainsi qu'à l'utilisation de l'API OpenAI et d'autres technologies d'<span className='text-pink-600'>Intelligence Artificielle</span>.</p>

            <p>L'un de mes projets récents est un MVP d'une place de marché <span className='text-pink-600'>Web3 sur la blockchain Goerli</span>. Cette plateforme permet aux utilisateurs de s'abonner, de connecter leur wallet et de générer une image avec une simple description de mots. Ils peuvent ensuite émettre cette image sous forme de Nfts sur la plateforme et même la vendre sur cette même Marketplace. Les utilisateurs peuvent enchérir ou simplement liker les différents <span className='text-pink-600'>Nfts</span>.</p>

            <p>Mon objectif est de démontrer qu'il est possible de créer un produit et de tester le marché en quelques jours seulement. Avec mon aide, vous pouvez donner vie à vos idées et obtenir les résultats que vous souhaitez.</p>
            <p>Travaillons ensemble pour atteindre vos objectifs !</p>

            <div className='list'>
                <div>
                    <p><span className='text-yellow-400'>-Intégration des fonctionnalités d'Intelligence Artificielle:</span></p>
                    <p>* Génération de texte par Intelligence artificielle</p>
                    <p>* Générateur d'art par intelligence artificielle</p>
                </div>
                <div>
                    <p><span className='text-yellow-400'>-Dapp Web 3.0 (site web):</span></p>
                    <p>* Marketplace</p>
                    <p>* Dapp (NFTs, Tokens, Site de mint)</p>
                    <p>* Creation de Smart contract (ERC721, ERC1155 ...)</p>
                    <p>* Audit de Smart contract</p>
                </div>
            </div>

            <p>Au plaisir d'en discuter avec vous !</p>
        </div>
    );
}

export default Me;