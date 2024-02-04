import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UseAuthContext } from "../hooks/UseAuthContext";


function About() {
  const { user } = UseAuthContext();

  // The component's rendering logic on about goes here.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4 text-gray-700">Welcome to the Arts Market</h1>
      <p className="text-white mb-6">
      Welcome to the Arts Market, your premier destination for discovering, admiring, and acquiring exceptional works of art created by talented artists from around the world. 
      The Arts Market is a revolutionary online platform that bridges the gap between artists and art enthusiasts, providing a vibrant marketplace for the expression of creativity and the appreciation of art.
      </p>
      
      <h2 className="text-2xl text-gray-700 font-semibold mb-2">Features:</h2>
      <ul className="list-disc list-inside text-white mb-6">
        <li>Create your own profile and showcase your artwork.</li>
        <li>Browse a diverse collection of art from various genres and styles.</li>
        <li>Buy directly from artists or place custom orders.</li>
        <li>Connect with other artists and art enthusiasts.</li>
      </ul>
      
      <h2 className="text-2xl text-gray-700 font-semibold mb-2">How it Works</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-white">Sell Your Art</h3>
        <p className="text-white">
          Showcase your talent by creating a profile and uploading images of your artwork.
          Set your prices, provide descriptions, and reach a global audience of art lovers.
        </p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-white">Buy Art</h3>
        <p className="text-white">
          Explore our curated collection, discover new artists, and purchase unique pieces
          directly from the creators. You can also request custom commissions.
        </p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-white">Create Your Profile</h3>
        <p className="text-white">
          Personalize your profile with a bio, social links, and a portfolio of your best work.
          Engage with the community by commenting on artworks and connecting with fellow artists.
        </p>
      </div>
      
      <h2 className="text-2xl text-gray-700 font-semibold mb-2">Join the Community</h2>
      <p className="text-white mb-6">
        Become part of a vibrant community of artists and art enthusiasts. Share your thoughts,
        get feedback on your work, and discover new trends in the art world.
      </p>
      
      <h2 className="text-2xl text-gray-700 font-semibold mb-2">Get Started</h2>
      <p className="text-white mb-6">
        Join our community today to start buying, selling, or creating your own beautiful artworks!
      </p>
      
      {!user ? (
        <div className="flex justify-center">
        <Link to='/login'>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Sign Up
        </button>
        </Link>
      </div>
      ): null}
    
    </div>
  </div>
  );
}

export default About;
