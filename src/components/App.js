import React from 'react';

import Header from './header/Header.js';
import Main from './main/Main.js';
import Footer from './footer/Footer.js';

import EditProfilePopup from './popups/EditProfilePopup.js';
import EditAvatarPopup from './popups/EditAvatarPopup.js';
import AddCardPopup from './popups/AddCardPopup.js';
import ImagePopup from './popups/ImagePopup.js';
import ConfirmationDeletionPopup from './popups/ConfirmationDeletionPopup.js';

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />

      <EditProfilePopup />
      <EditAvatarPopup />
      <AddCardPopup />
      <ImagePopup />
      <ConfirmationDeletionPopup />
    </>
  );
}

export default App;
