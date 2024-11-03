
export const logout = async () => {
    await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    
    // Supprimez le token du stockage local ou des cookies
    localStorage.removeItem('token');
    // Redirigez l'utilisateur ou affichez un message
};
